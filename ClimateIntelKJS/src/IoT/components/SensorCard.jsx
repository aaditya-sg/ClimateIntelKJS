import styles from "./SensorCard.module.css";

export default function SensorCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <article className={styles.card}>
      <div
        className={styles.icon}
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className={styles.content}>
        <p className={styles.title}>
          {title}
        </p>

        <p className={styles.value}>
          {value}
        </p>

        <p className={styles.description}>
          {description}
        </p>
      </div>
    </article>
  );
}