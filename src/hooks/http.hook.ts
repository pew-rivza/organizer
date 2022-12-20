import {useCallback, useState} from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const request = useCallback(async (url: string, method: string = "GET", body: BodyInit | null | undefined = null, headers: HeadersInit | undefined = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Что-то пошло не так");
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError((error as { message: string }).message);
      throw error;
    }
  }, []);

  const cleanError = () => setError(null);

  return { loading, request, error, cleanError }
}
