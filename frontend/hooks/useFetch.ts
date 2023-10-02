import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (route: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`https://44be-177-96-4-44.ngrok.io/${route}`);

      setData(response.data);
    } catch (error: any) {
      console.error("API Error: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
};
