import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import useLocation from "../../../../../hooks/useLocation";
import { useScooters } from "../../../../../hooks/useScooters";
import { usePairing } from "../../../../../context/PairingContext";

interface MapProps {
  height?: string;
}

const Map = ({ height = "400px" }: MapProps) => {
  const {
    latitude,
    longitude,
    fetchLocation,
    error: locationError,
  } = useLocation();
  const { scooters, error: scootersError } = useScooters();
  const { setSelectedCode } = usePairing();
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

  if (locationError) {
    return <div>{locationError}</div>;
  }

  if (scootersError) {
    return <div>{scootersError}</div>;
  }

  const scooterIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#FF0000",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
    labelOrigin: new google.maps.Point(0, -4),
  };

  const handleMarkerClick = (vehicleCode: string) => {
    setSelectedCode(vehicleCode);
  };

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

        {scooters.map((scooter) => (
          <Marker
            key={scooter.id}
            position={{
              lat: scooter.latitude,
              lng: scooter.longitude,
            }}
            title={`Scooter ${scooter.vehicleCode}`}
            icon={scooterIcon}
            label={{
              text: scooter.vehicleCode,
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "bold",
              className: "marker-label",
            }}
            onClick={() => handleMarkerClick(scooter.vehicleCode)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
