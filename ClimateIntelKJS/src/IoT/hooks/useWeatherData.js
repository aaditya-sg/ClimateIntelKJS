import { useState, useEffect, useCallback } from "react";
import {
  fetchCityWeather,
  fetchMultipleCitiesWeather,
  getMockSensorData,
} from "../services/weatherAPI";

const POLLING_INTERVAL = 5 * 60 * 1000;

export const useWeatherData = () => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState("Loading");

  const loadWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const liveData = await fetchMultipleCitiesWeather();

      if (!liveData || liveData.length === 0) {
        throw new Error("No weather data returned from Open-Meteo.");
      }

      setSensors(liveData);
      setApiStatus("Connected");
    } catch (err) {
      console.error("Weather API error:", err);

      const mockData = getMockSensorData();

      setSensors(mockData);
      setApiStatus("Failed");
      setError("Using offline data because Open-Meteo is unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshWeather = useCallback(async () => {
    await loadWeatherData();
  }, [loadWeatherData]);

  const fetchWeatherForCity = useCallback(async (cityKey) => {
    try {
      const weatherData = await fetchCityWeather(cityKey);

      setSensors((previous) =>
        previous.map((sensor) =>
          sensor.id === weatherData.id
            ? weatherData
            : sensor
        )
      );

      return weatherData;
    } catch (err) {
      console.error(
        `Failed to fetch weather for ${cityKey}:`,
        err
      );

      setError(
        `Failed to update ${cityKey}: ${err.message}`
      );

      throw err;
    }
  }, []);

  const addSensor = useCallback((sensor) => {
    setSensors((previous) => [
      sensor,
      ...previous,
    ]);
  }, []);

  useEffect(() => {
    loadWeatherData();

    const intervalId = window.setInterval(
      () => {
        loadWeatherData();
      },
      POLLING_INTERVAL
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadWeatherData]);

  return {
    sensors,
    loading,
    error,
    apiStatus,
    refreshWeather,
    fetchWeatherForCity,
    loadWeatherData,
    addSensor,
  };
};

export default useWeatherData;