import styles from "./NetworkMap.module.css";

const POSITIONS = [
  { left: "18%", top: "25%" },
  { left: "68%", top: "20%" },
  { left: "50%", top: "48%" },
  { left: "27%", top: "72%" },
  { left: "78%", top: "68%" },
];

export default function NetworkMap({
  sensors = [],
}) {
  return (
    <section className={styles.map}>

      <div className={styles.header}>

        <div>
          <h2>Network Map</h2>

          <p>
            Current monitored weather stations
          </p>
        </div>

        <span className={styles.count}>
          {sensors.length} stations
        </span>

      </div>

      <div className={styles.canvas}>

        <div className={styles.grid} />

        <div className={styles.connectionLineOne} />
        <div className={styles.connectionLineTwo} />
        <div className={styles.connectionLineThree} />

        <div className={styles.center}>
          <span
            className={styles.centerDot}
          />

          <strong>
            Maharashtra IoT Network
          </strong>

          <small>
            Open-Meteo monitoring layer
          </small>
        </div>

        {sensors.map(
          (sensor, index) => {
            const position =
              POSITIONS[
                index %
                  POSITIONS.length
              ];

            return (
              <div
                key={sensor.id}
                className={styles.node}
                style={position}
                title={`${sensor.city} — ${sensor.temp}`}
              >
                <span
                  className={
                    sensor.status ===
                    "Online"
                      ? styles.online
                      : styles.offline
                  }
                />

                <strong>
                  {sensor.city}
                </strong>

                <small>
                  {sensor.temp}
                </small>
              </div>
            );
          }
        )}

      </div>

    </section>
  );
}