import { useState, useEffect } from "react";
import axios from "axios";

const useLongPollingHook = (url, delay = 9990) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError(error);
      setLoading(false); // Set loading to false in case of an error
      console.log(error);
    }
  };

  useEffect(() => {
    let timeoutId;
    const startPolling = () => {
      setLoading(true); // Set loading to true before making the API request
      fetchApi();
    };
    startPolling();
    //if responese.status is equal to 200 then only call this setInterval

    timeoutId = setInterval(startPolling, delay);

    return () => clearInterval(timeoutId);
    // eslint-disable-next-line
  }, []);

  return { data, error, loading }; // Return loading state
};

export default useLongPollingHook;
