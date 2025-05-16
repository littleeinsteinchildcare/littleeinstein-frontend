import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

import { Location } from '@/services/eventService';

interface LocationDisplayProps {
  location: Location;
  height?: string;
}

const LocationDisplay = ({ location, height = '200px' }: LocationDisplayProps) => {
  const { t } = useTranslation();
  const [mapCenter, setMapCenter] = useState(location);

  // Check if API key is available
  const apiKeyAvailable = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  // Load the Google Maps API only if key is available
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    googleMapsLoaderOptions: {
      // Skip loading if no API key
      preventLoad: !apiKeyAvailable
    }
  });

  // Update center if location changes
  useEffect(() => {
    setMapCenter(location);
  }, [location]);

  // No API key or load error - show simple display instead of map
  if (!apiKeyAvailable || loadError) {
    return (
      <div className="space-y-2">
        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="font-medium">{location.address}</p>
        </div>

        {/* Still provide link to Google Maps */}
        <div className="text-sm">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            {t('maps.getDirections')}
          </a>
        </div>
      </div>
    );
  }

  // Show loading indicator while map loads
  if (!isLoaded && apiKeyAvailable) {
    return <div className="h-full bg-gray-100 flex items-center justify-center">{t('maps.loading')}</div>;
  }

  // Generate directions URL to the location
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
  };

  return (
    <div className="space-y-2">
      <div 
        className="rounded-lg overflow-hidden border border-gray-300" 
        style={{ height }}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={15}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            zoomControl: true,
          }}
        >
          <Marker position={location} />
        </GoogleMap>
      </div>
      {location.address && (
        <div className="text-sm">
          <div className="font-medium text-gray-700">{location.address}</div>
          <a 
            href={getDirectionsUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            {t('maps.getDirections')}
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;