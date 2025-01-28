import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import useLocation from "../../../../../hooks/useLocation";

interface MapProps {
  height?: string;
}

const Map = ({ height = "400px" }: MapProps) => {
  const { latitude, longitude, fetchLocation, error } = useLocation();
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    if (latitude && longitude) {
      const newPosition = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };
      setMapCenter(newPosition);
      setMarkerPosition(newPosition);
    }
  }, [latitude, longitude]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ height: height, width: "100%" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={mapCenter}
        zoom={17}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            title="Your location"
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
