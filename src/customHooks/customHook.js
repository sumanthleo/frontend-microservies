import { useState, useEffect } from "react";
import axios from "axios";

const useLongPollingHook = (url, delay = 9990) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [count, setCount] = useState();

  const fetchApi = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setCount(response.status);
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  useEffect(() => {
    let timeoutId;
    const startPolling = () => {
      fetchApi();
    };
    startPolling();
    console.log(count, "custom hooks");
    if (count === 200) {
      timeoutId = setInterval(startPolling, delay);
    }

    return () => clearInterval(timeoutId);
    // eslint-disable-next-line
  }, []);
  return { data, error };
};

export default useLongPollingHook;
