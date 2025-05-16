import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import { Location } from '@/services/eventService';

// Default center (Hillsboro, OR)
const defaultCenter = {
  lat: 45.522894,
  lng: -122.989827
};

interface LocationPickerProps {
  onSelectLocation: (location: Location) => void;
  initialLocation?: Location;
}

const LocationPicker = ({ onSelectLocation, initialLocation }: LocationPickerProps) => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation || null);
  const [mapCenter, setMapCenter] = useState(initialLocation || defaultCenter);
  
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  // Get address from coordinates (reverse geocoding)
  const getAddressFromCoordinates = useCallback(async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return '';
    } catch (error) {
      console.error('Error getting address:', error);
      return '';
    }
  }, []);

  // Handle map click
  const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // Get address from coordinates
    const address = await getAddressFromCoordinates(lat, lng);

    // Create location object with required address (empty string if not found)
    const location: Location = {
      lat,
      lng,
      address: address || ''  // Ensure address is never undefined
    };

    setSelectedLocation(location);
    onSelectLocation(location);
  }, [getAddressFromCoordinates, onSelectLocation]);

  // Update center if initialLocation changes
  useEffect(() => {
    if (initialLocation) {
      setMapCenter(initialLocation);
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  if (!isLoaded) {
    return <div className="h-64 bg-gray-100 flex items-center justify-center">{t('maps.loading')}</div>;
  }

  return (
    <div className="space-y-2">
      <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={13}
          onClick={handleMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {selectedLocation && (
            <Marker
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            />
          )}
        </GoogleMap>
      </div>
      {selectedLocation?.address && (
        <div className="text-sm text-gray-600">
          <p className="font-medium">{t('maps.selectedLocation')}:</p>
          <p>{selectedLocation.address}</p>
        </div>
      )}
      <p className="text-xs text-gray-500">{t('maps.clickInstruction')}</p>
    </div>
  );
};

export default LocationPicker;