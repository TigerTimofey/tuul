import { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import useLocation from "../../../../../hooks/useLocation";

interface MapProps {
  height?: string;
}

const Map = ({ height = "400px" }: MapProps) => {
  const { latitude, longitude, fetchLocation, error } = useLocation();
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    if (latitude && longitude) {
      setMapCenter({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
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
        zoom={14}
        onLoad={(map) => {
          if (window.google && mapCenter.lat !== 0) {
            const { AdvancedMarkerElement } = window.google.maps.marker;
            new AdvancedMarkerElement({
              position: mapCenter,
              map: map,
              title: "Your location",
            });
          }
        }}
      />
    </div>
  );
};

export default Map;
