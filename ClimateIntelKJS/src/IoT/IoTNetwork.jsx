import { useMemo, useState } from "react";

import useWeatherData from "./hooks/useWeatherData";

import SensorCard from "./components/SensorCard";
import SensorForm from "./components/SensorForm";
import NetworkMap from "./components/NetworkMap";
import RefreshButton from "./components/RefreshButton";
import DataStatus from "./components/DataStatus";

import styles from "./IoTNetwork.module.css";

export default function IoTNetwork() {
  const {
    sensors,
    loading,
    error,
    apiStatus,
    refreshWeather,
    addSensor,
  } = useWeatherData();

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [formError, setFormError] = useState(null);

  const stats = useMemo(() => {
    const total = sensors.length;

    const online = sensors.filter(
      (sensor) => sensor.status === "Online"
    ).length;

    const offline = sensors.filter(
      (sensor) => sensor.status === "Offline"
    ).length;

    const liveCount = sensors.filter(
      (sensor) => sensor.isLive
    ).length;

    const availability =
      total > 0
        ? ((online / total) * 100).toFixed(1)
        : "0";

    return {
      total,
      online,
      offline,
      liveCount,
      availability,
    };
  }, [sensors]);

  const handleAddSensor = async (formData) => {
    try {
      setIsSubmitting(true);
      setFormError(null);

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      const newSensor = {
        id:
          formData.id.trim() ||
          `AWS-${Math.floor(
            100 + Math.random() * 900
          )}`,

        city: formData.city.trim(),

        district:
          formData.district.trim(),

        temp: `${formData.temp}°C`,

        humidity:
          `${formData.humidity}%`,

        status: "Online",

        lastSeen: "Just now",

        signalStrength: 95,

        batteryHealth: 100,

        isLive: false,
      };

      addSensor(newSensor);

      setShowForm(false);
    } catch (err) {
      console.error(
        "Add sensor error:",
        err
      );

      setFormError(
        "Failed to add sensor. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSensorData = sensors.find(
    (sensor) =>
      sensor.id === selectedSensor
  );

  return (
    <div className={styles.container}>

      {/* HEADER */}

      <header className={styles.header}>
        <div className={styles.headerContent}>

          <p className={styles.subtitle}>
            🌍 CONNECTED INFRASTRUCTURE
          </p>

          <div className={styles.headerTop}>

            <div className={styles.headerLeft}>

              <h1 className={styles.title}>
                IoT Weather Station Network
              </h1>

              <p className={styles.description}>
                Real-time monitoring of Automated
                Weather Stations across Maharashtra.

                {stats.liveCount > 0 && (
                  <span
                    className={styles.highlight}
                  >
                    🔴 {stats.liveCount} live
                    sensor(s) from Open-Meteo API
                  </span>
                )}
              </p>

            </div>

            <div className={styles.headerRight}>

              <RefreshButton
                onRefresh={refreshWeather}
                isLoading={loading}
              />

              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => {
                  setShowForm(
                    (previous) => !previous
                  );
                  setFormError(null);
                }}
              >
                {showForm
                  ? "Cancel"
                  : "Add Sensor"}
              </button>

            </div>

          </div>

          <div className={styles.statusBar}>

            <DataStatus
              status={apiStatus}
              message={error}
            />

            <span
              className={styles.timestamp}
            >
              Updated:{" "}
              {new Date().toLocaleTimeString()}
            </span>

          </div>

        </div>
      </header>

      {/* MAIN */}

      <main className={styles.main}>

        {/* FORM */}

        {showForm && (
          <>
            {formError && (
              <div className={styles.alert}>
                <span>{formError}</span>

                <button
                  type="button"
                  onClick={() =>
                    setFormError(null)
                  }
                >
                  ×
                </button>
              </div>
            )}

            <SensorForm
              onSubmit={handleAddSensor}
              isLoading={isSubmitting}
            />
          </>
        )}

        {/* API ERROR */}

        {error &&
          apiStatus === "Failed" && (
            <div
              className={
                styles.alertWarning
              }
            >
              ⚠️ {error}
            </div>
          )}

        {/* STATISTICS */}

        <div className={styles.statsGrid}>

          <SensorCard
            title="Total Stations"
            value={stats.total}
            description="Across monitored regions"
            icon="📍"
          />

          <SensorCard
            title="Online"
            value={stats.online}
            description={`${stats.availability}% availability`}
            icon="🟢"
          />

          <SensorCard
            title="Offline"
            value={stats.offline}
            description="Requires attention"
            icon="🔴"
          />

          <SensorCard
            title="Live API Data"
            value={stats.liveCount}
            description={
              apiStatus === "Connected"
                ? "Real-time from Open-Meteo"
                : "Offline mode"
            }
            icon="📡"
          />

        </div>

        {/* NETWORK MAP */}

        <NetworkMap
          sensors={sensors}
        />

        {/* SENSOR TABLE */}

        <section
          className={
            styles.tableContainer
          }
        >

          <div
            className={
              styles.tableHeader
            }
          >

            <div>

              <h2
                className={
                  styles.tableTitle
                }
              >
                Weather Stations
              </h2>

              <p
                className={
                  styles.tableSubtitle
                }
              >
                Latest sensor readings &
                health metrics

                {apiStatus ===
                  "Connected" &&
                  " (from Open-Meteo API)"}
              </p>

            </div>

            <button
              type="button"
              className={
                styles.btnSecondary
              }
              onClick={() => {
                const data =
                  JSON.stringify(
                    sensors,
                    null,
                    2
                  );

                const blob =
                  new Blob([data], {
                    type: "application/json",
                  });

                const url =
                  URL.createObjectURL(blob);

                const link =
                  document.createElement(
                    "a"
                  );

                link.href = url;
                link.download =
                  "weather-stations.json";

                link.click();

                URL.revokeObjectURL(
                  url
                );
              }}
            >
              Download Data ↓
            </button>

          </div>

          {loading &&
          sensors.length === 0 ? (
            <div
              className={
                styles.loadingState
              }
            >
              <div
                className={
                  styles.spinner
                }
              />

              <p>
                Loading real weather
                data from Open-Meteo...
              </p>
            </div>
          ) : sensors.length === 0 ? (
            <div
              className={
                styles.emptyState
              }
            >
              No sensor data available.
            </div>
          ) : (
            <div
              className={
                styles.tableWrapper
              }
            >

              <table
                className={
                  styles.table
                }
              >

                <thead>
                  <tr>
                    {[
                      "Station ID",
                      "Location",
                      "Temp",
                      "Humidity",
                      "Status",
                      "Data Source",
                      "Last Update",
                    ].map((head) => (
                      <th key={head}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>

                  {sensors.map(
                    (sensor) => (
                      <tr
                        key={sensor.id}
                        className={
                          styles.tableRow
                        }
                        onClick={() =>
                          setSelectedSensor(
                            sensor.id
                          )
                        }
                      >

                        <td
                          className={
                            styles.idCell
                          }
                        >
                          {sensor.id}
                        </td>

                        <td>

                          <p
                            className={
                              styles.cityName
                            }
                          >
                            {sensor.city}
                          </p>

                          <p
                            className={
                              styles.district
                            }
                          >
                            {sensor.district}
                          </p>

                        </td>

                        <td>
                          {sensor.temp}
                        </td>

                        <td>
                          {sensor.humidity}
                        </td>

                        <td>

                          <span
                            className={`${styles.statusBadge} ${
                              sensor.status ===
                              "Online"
                                ? styles.statusOnline
                                : styles.statusOffline
                            }`}
                          >
                            {sensor.status}
                          </span>

                        </td>

                        <td>

                          <span
                            className={
                              styles.sourceTag
                            }
                          >
                            {sensor.isLive
                              ? "🔴 Live API"
                              : "📦 Local Sensor"}
                          </span>

                        </td>

                        <td
                          className={
                            styles.timeText
                          }
                        >
                          {sensor.lastSeen}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* DETAILS */}

        {selectedSensorData && (
          <div
            className={
              styles.detailPanel
            }
          >

            <button
              type="button"
              className={
                styles.closeBtn
              }
              onClick={() =>
                setSelectedSensor(null)
              }
            >
              ×
            </button>

            <SensorDetails
              sensor={selectedSensorData}
            />

          </div>
        )}

      </main>

    </div>
  );
}

function SensorDetails({ sensor }) {
  if (!sensor) {
    return null;
  }

  return (
    <div className={styles.details}>

      <h3
        className={
          styles.detailsTitle
        }
      >
        {sensor.id} - {sensor.city}
      </h3>

      <p
        className={
          styles.detailsSubtitle
        }
      >
        {sensor.district} •{" "}
        {sensor.isLive
          ? "🔴 Live Data"
          : "📦 Local Data"}
      </p>

      <div
        className={
          styles.detailsGrid
        }
      >

        <DetailItem
          label="Temperature"
          value={sensor.temp}
        />

        <DetailItem
          label="Humidity"
          value={sensor.humidity}
        />

        <DetailItem
          label="Signal Strength"
          value={`${Math.round(
            sensor.signalStrength
          )}%`}
        />

        <DetailItem
          label="Battery Health"
          value={`${Math.round(
            sensor.batteryHealth
          )}%`}
        />

        <DetailItem
          label="Status"
          value={sensor.status}
          valueClassName={
            sensor.status === "Online"
              ? styles.onlineText
              : styles.offlineText
          }
        />

        <DetailItem
          label="Last Update"
          value={sensor.lastSeen}
        />

      </div>

      {sensor.isLive && (
        <div
          className={
            styles.dataSource
          }
        >
          <p>
            🔴 This is real-time data
            from Open-Meteo API.
          </p>
        </div>
      )}

    </div>
  );
}

function DetailItem({
  label,
  value,
  valueClassName = "",
}) {
  return (
    <div
      className={
        styles.detailItem
      }
    >
      <span
        className={
          styles.detailLabel
        }
      >
        {label}
      </span>

      <span
        className={`${styles.detailValue} ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}