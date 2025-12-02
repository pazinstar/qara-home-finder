import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  pricePerNight: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  coordinates?: { lat: number; lng: number };
}

interface AirBnBMapProps {
  properties: Property[];
  onPropertyClick?: (id: string) => void;
}

// Mock coordinates for demo - in production these would come from property data
const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  "thika road": { lat: -1.2100, lng: 36.9100 },
  "waiyaki way": { lat: -1.2634, lng: 36.7500 },
  "juja": { lat: -1.1000, lng: 37.0100 },
  "kikuyu": { lat: -1.2500, lng: 36.6700 },
  "kinoo": { lat: -1.2400, lng: 36.7200 },
  "ruaka": { lat: -1.2100, lng: 36.7800 },
};

const getCoordinatesForLocation = (location: string): { lat: number; lng: number } => {
  const locationLower = location.toLowerCase();
  for (const [key, coords] of Object.entries(locationCoordinates)) {
    if (locationLower.includes(key)) {
      // Add small random offset to prevent markers from stacking
      return {
        lat: coords.lat + (Math.random() - 0.5) * 0.02,
        lng: coords.lng + (Math.random() - 0.5) * 0.02,
      };
    }
  }
  // Default to Nairobi center
  return { lat: -1.2921, lng: 36.8219 };
};

const AirBnBMap: React.FC<AirBnBMapProps> = ({ properties, onPropertyClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string>(
    localStorage.getItem('mapbox_token') || ''
  );
  const [isMapReady, setIsMapReady] = useState(false);
  const [tokenInput, setTokenInput] = useState(mapboxToken);

  const saveToken = () => {
    localStorage.setItem('mapbox_token', tokenInput);
    setMapboxToken(tokenInput);
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [36.8219, -1.2921], // Nairobi center
        zoom: 10,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setIsMapReady(true);
      });

      return () => {
        markersRef.current.forEach(marker => marker.remove());
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each property
    properties.forEach(property => {
      const coords = getCoordinatesForLocation(property.location);

      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.innerHTML = `
        <div style="
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s;
        ">
          KES ${property.pricePerNight.toLocaleString()}
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
        el.style.zIndex = '10';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.zIndex = '1';
      });

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
        <div style="max-width: 200px;">
          <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
          <h3 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0;">${property.title}</h3>
          <p style="color: #666; font-size: 12px; margin: 0 0 4px 0;">${property.location}</p>
          <p style="font-weight: 600; color: hsl(var(--primary)); margin: 0;">${property.price}</p>
          <p style="font-size: 11px; color: #888; margin-top: 4px;">${property.bedrooms} bed • ${property.bathrooms} bath</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        if (onPropertyClick) {
          onPropertyClick(property.id);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to markers if there are any
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(property => {
        const coords = getCoordinatesForLocation(property.location);
        bounds.extend([coords.lng, coords.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 13 });
    }
  }, [properties, isMapReady, onPropertyClick]);

  if (!mapboxToken) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <CardContent className="text-center space-y-4 max-w-md">
          <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-semibold">Enable Map View</h3>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to view properties on the map. 
            Get your token from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
          </div>
          <Button onClick={saveToken} disabled={!tokenInput}>
            Enable Map
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      {properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <p className="text-muted-foreground">No properties match your filters</p>
        </div>
      )}
    </div>
  );
};

export default AirBnBMap;
