import styles from "./DataStatus.module.css";

export default function DataStatus({
  status,
  message,
}) {
  const state =
    status === "Connected"
      ? "connected"
      : status === "Failed"
        ? "failed"
        : "loading";

  const label =
    status === "Connected"
      ? "Connected"
      : status === "Failed"
        ? "Failed"
        : "Connecting";

  return (
    <div
      className={`${styles.status} ${styles[state]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.dot} />

      <span>
        <strong>{label}</strong>

        {message && (
          <span className={styles.message}>
            {" "}
            — {message}
          </span>
        )}
      </span>
    </div>
  );
}