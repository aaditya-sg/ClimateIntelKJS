const CITIES = {
  pune: {
    lat: 18.5204,
    lon: 73.8567,
    city: "Pune",
    district: "Pune",
    stationId: "AWS-117",
  },

  nagpur: {
    lat: 21.1458,
    lon: 79.0882,
    city: "Nagpur",
    district: "Nagpur",
    stationId: "AWS-042",
  },

  aurangabad: {
    lat: 19.8762,
    lon: 75.3433,
    city: "Aurangabad",
    district: "Chhatrapati Sambhajinagar",
    stationId: "AWS-203",
  },

  akola: {
    lat: 20.7084,
    lon: 77.3001,
    city: "Akola",
    district: "Akola",
    stationId: "AWS-331",
  },

  nashik: {
    lat: 19.9975,
    lon: 73.7898,
    city: "Nashik",
    district: "Nashik",
    stationId: "AWS-419",
  },
};

export const fetchCityWeather = async (
  cityKey
) => {
  const city = CITIES[cityKey];

  if (!city) {
    throw new Error(
      `City "${cityKey}" not found.`
    );
  }

  const url = new URL(
    "https://api.open-meteo.com/v1/forecast"
  );

  url.searchParams.set(
    "latitude",
    city.lat
  );

  url.searchParams.set(
    "longitude",
    city.lon
  );

  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,is_day"
  );

  url.searchParams.set(
    "timezone",
    "Asia/Kolkata"
  );

  const response = await fetch(
    url.toString()
  );

  if (!response.ok) {
    throw new Error(
      `Open-Meteo HTTP ${response.status}`
    );
  }

  const data = await response.json();

  if (!data.current) {
    throw new Error(
      "Open-Meteo returned no current weather data."
    );
  }

  return {
    id: city.stationId,
    city: city.city,
    district: city.district,

    temp: `${data.current.temperature_2m}°C`,

    humidity:
      `${data.current.relative_humidity_2m}%`,

    status: "Online",

    lastSeen: "Just now",

    signalStrength:
      Math.round(92 + Math.random() * 8),

    batteryHealth:
      Math.round(85 + Math.random() * 15),

    timestamp: new Date(
      data.current.time
    ),

    isLive: true,
  };
};

export const fetchMultipleCitiesWeather =
  async (
    cityKeys = Object.keys(CITIES)
  ) => {
    const results =
      await Promise.allSettled(
        cityKeys.map((key) =>
          fetchCityWeather(key)
        )
      );

    return results
      .filter(
        (result) =>
          result.status ===
          "fulfilled"
      )
      .map(
        (result) => result.value
      );
  };

export const getMockSensorData = () => [
  {
    id: "AWS-042",
    city: "Nagpur",
    district: "Nagpur",
    temp: "44.8°C",
    humidity: "31%",
    status: "Offline",
    lastSeen: "8 min ago",
    signalStrength: 45,
    batteryHealth: 62,
    isLive: false,
  },

  {
    id: "AWS-117",
    city: "Pune",
    district: "Pune",
    temp: "39.2°C",
    humidity: "48%",
    status: "Online",
    lastSeen: "12 sec ago",
    signalStrength: 92,
    batteryHealth: 89,
    isLive: false,
  },

  {
    id: "AWS-203",
    city: "Aurangabad",
    district:
      "Chhatrapati Sambhajinagar",
    temp: "43.1°C",
    humidity: "35%",
    status: "Online",
    lastSeen: "9 sec ago",
    signalStrength: 88,
    batteryHealth: 78,
    isLive: false,
  },

  {
    id: "AWS-331",
    city: "Akola",
    district: "Akola",
    temp: "45.7°C",
    humidity: "29%",
    status: "Online",
    lastSeen: "5 sec ago",
    signalStrength: 85,
    batteryHealth: 85,
    isLive: false,
  },

  {
    id: "AWS-419",
    city: "Nashik",
    district: "Nashik",
    temp: "37.9°C",
    humidity: "52%",
    status: "Online",
    lastSeen: "18 sec ago",
    signalStrength: 78,
    batteryHealth: 71,
    isLive: false,
  },
];

export const getSmartSensorData =
  async (cityKey = "pune") => {
    try {
      const liveData =
        await fetchCityWeather(
          cityKey
        );

      return [liveData];
    } catch {
      return getMockSensorData().filter(
        (sensor) =>
          sensor.city.toLowerCase() ===
          cityKey.toLowerCase()
      );
    }
  };

export default {
  fetchCityWeather,
  fetchMultipleCitiesWeather,
  getMockSensorData,
  getSmartSensorData,
};