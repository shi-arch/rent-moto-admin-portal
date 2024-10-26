import axios from "axios";

const handleLocationSearch = async (location) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SEND_GOOGLE_LOCATION_LIST}${location}`
    );
    const results = response.data.predictions;
    return results;
  } catch (error) {
    return error.message;
  }
};

const handleLocationInfo = async (placeId) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`
    );
    const results = response.data;
    return results;
  } catch (error) {
    return error.message;
  }
};

export { handleLocationSearch, handleLocationInfo };
