import styles from "./RefreshButton.module.css";

export default function RefreshButton({
  onRefresh,
  isLoading = false,
}) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onRefresh}
      disabled={isLoading}
    >
      <span
        className={
          isLoading
            ? styles.spinner
            : styles.icon
        }
        aria-hidden="true"
      >
        {isLoading ? "" : "↻"}
      </span>

      {isLoading
        ? "Refreshing..."
        : "Refresh Data"}
    </button>
  );
}