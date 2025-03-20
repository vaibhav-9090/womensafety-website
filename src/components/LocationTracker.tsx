import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Location } from '../types';

interface LocationTrackerProps {
  onLocationUpdate: (location: Location) => void;
}

export function LocationTracker({ onLocationUpdate }: LocationTrackerProps) {
  const [error, setError] = useState<string>('');
  const [location, setLocation] = useState<Location | null>(null);
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    // Check for existing permissions
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionState(result.state);
        result.onchange = () => setPermissionState(result.state);
      });
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        };
        setLocation(newLocation);
        onLocationUpdate(newLocation);
        setError('');
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access was denied. Please enable location services to use this feature.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable. Please try again later.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out. Please check your connection and try again.');
            break;
          default:
            setError('An unknown error occurred while tracking location.');
        }
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [onLocationUpdate]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-700">{error}</p>
          {permissionState === 'denied' && (
            <p className="mt-2 text-sm text-red-600">
              To enable location tracking, please reset location permissions for this site in your browser settings.
            </p>
          )}
        </div>
      );
    }

    if (location) {
      return (
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Latitude:</span> {location.latitude.toFixed(6)}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Longitude:</span> {location.longitude.toFixed(6)}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Last Updated:</span>{' '}
            {new Date(location.timestamp).toLocaleTimeString()}
          </p>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse text-gray-600">Acquiring location...</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Location Tracker</h2>
      </div>
      {renderContent()}
    </div>
  );
}