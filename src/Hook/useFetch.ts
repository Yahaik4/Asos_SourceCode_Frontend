import { useEffect, useState, useCallback } from "react";

interface FetchHookResult<T> {
  isFetching: boolean;
  fetchedData: T;
  setFetchedData: (data: T) => void;
  error?: { message: string };
  refetch: () => void;
}


export function useFetch<T>(fetchFn: () => Promise<T>, initialValue: T): FetchHookResult<T> {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | undefined>();
  const [fetchedData, setFetchedData] = useState<T>(initialValue);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setError(undefined); 
    try {
      console.log("Fetching data...");
      const data = await fetchFn();
      console.log("Fetched data:", data);
      setFetchedData(data);
    } catch (error: any) {
      setError({ message: error?.message || "Failed to fetch data" });
    }
    setIsFetching(false);
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isFetching, fetchedData, setFetchedData, error, refetch: fetchData };
}
