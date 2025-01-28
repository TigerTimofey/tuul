import React from "react";

const useLocation = () => {
  const [latitude, setLatitude] = React.useState<string>("");
  const [longitude, setLongitude] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        () => setError("Unable to retrieve location."),
        options
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return { latitude, longitude, fetchLocation, error };
};

export default useLocation;
