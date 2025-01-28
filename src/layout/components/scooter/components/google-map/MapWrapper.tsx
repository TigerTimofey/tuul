import { LoadScript } from "@react-google-maps/api";
import { Paper } from "@mui/material";
import Map from "./Map";
import { useScooters } from "../../../../../hooks/useScooters";

const libraries: ["marker"] = ["marker"];

const MapWrapper = () => {
  const { error } = useScooters();

  if (error) {
    return <div>Error loading scooters: {error}</div>;
  }

  return (
    <Paper elevation={3} sx={{ height: "500px" }}>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_FIREBASE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <Map height="100%" />
      </LoadScript>
    </Paper>
  );
};

export default MapWrapper;
