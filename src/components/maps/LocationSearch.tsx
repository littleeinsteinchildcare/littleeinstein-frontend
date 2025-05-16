import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

import { Location } from '@/services/eventService';

interface LocationSearchProps {
  onSelectLocation: (location: Location) => void;
  initialValue?: string;
  placeholder?: string;
}

const LocationSearch = ({ onSelectLocation, initialValue = '', placeholder }: LocationSearchProps) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(initialValue);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if API key is available
  const apiKeyAvailable = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  // Only load the API if key is available
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
    googleMapsLoaderOptions: {
      // Skip loading if no API key
      preventLoad: !apiKeyAvailable
    }
  });

  // Log errors for debugging
  useEffect(() => {
    if (loadError) {
      console.error('Error loading Google Maps API in LocationSearch:', loadError);
    }
    console.log('Google Maps API loaded in LocationSearch:', isLoaded);
    console.log('API Key available:', !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  }, [loadError, isLoaded]);

  // Initialize autocomplete when the Google Maps API is loaded
  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const options = {
        types: ['address'],
      };
      
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, options);
      
      // Add listener for place selection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        
        if (place?.geometry?.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address || '',
          };
          
          onSelectLocation(location);
          setSearchValue(place.formatted_address || '');
        }
      });
    }
    
    return () => {
      // Cleanup
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, onSelectLocation]);

  // If API key is not available or there's a load error, provide a fallback input
  if (!apiKeyAvailable || loadError) {
    return (
      <div className="w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            // Create a simple location object without coordinates
            if (e.target.value) {
              onSelectLocation({
                lat: 0,
                lng: 0,
                address: e.target.value
              });
            }
          }}
          placeholder={placeholder || t('maps.manualLocationEntry')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {loadError && (
          <div className="text-xs text-red-500 mt-1">{t('maps.apiError')}</div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder || t('maps.searchPlaceholder')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        disabled={!isLoaded}
      />
      {!isLoaded && apiKeyAvailable && (
        <div className="text-xs text-gray-500 mt-1">{t('maps.loading')}</div>
      )}
    </div>
  );
};

export default LocationSearch;