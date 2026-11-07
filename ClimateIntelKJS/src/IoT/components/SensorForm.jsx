import { useState } from "react";

import styles from "./SensorForm.module.css";

const INITIAL_FORM = {
  id: "",
  city: "",
  district: "",
  temp: "",
  humidity: "",
};

export default function SensorForm({
  onSubmit,
  isLoading = false,
}) {
  const [form, setForm] =
    useState(INITIAL_FORM);

  const [errors, setErrors] =
    useState({});

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.city.trim()) {
      nextErrors.city =
        "City is required.";
    }

    if (!form.district.trim()) {
      nextErrors.district =
        "District is required.";
    }

    if (
      form.temp === "" ||
      Number.isNaN(Number(form.temp)) ||
      Number(form.temp) < -20 ||
      Number(form.temp) > 60
    ) {
      nextErrors.temp =
        "Temperature must be between -20°C and 60°C.";
    }

    if (
      form.humidity === "" ||
      Number.isNaN(Number(form.humidity)) ||
      Number(form.humidity) < 0 ||
      Number(form.humidity) > 100
    ) {
      nextErrors.humidity =
        "Humidity must be between 0% and 100%.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...form,
      temp: Number(form.temp),
      humidity: Number(form.humidity),
    });
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>
          NETWORK MANAGEMENT
        </p>

        <h2>Add Weather Station</h2>

        <p>
          Register a new automated weather
          station in the monitoring network.
        </p>
      </div>

      <div className={styles.grid}>

        <label className={styles.field}>
          <span>Station ID</span>

          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="AWS-500"
          />
        </label>

        <label className={styles.field}>
          <span>
            City <b>*</b>
          </span>

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Mumbai"
            aria-invalid={Boolean(
              errors.city
            )}
          />

          {errors.city && (
            <small>
              {errors.city}
            </small>
          )}
        </label>

        <label className={styles.field}>
          <span>
            District <b>*</b>
          </span>

          <input
            name="district"
            value={form.district}
            onChange={handleChange}
            placeholder="Mumbai City"
            aria-invalid={Boolean(
              errors.district
            )}
          />

          {errors.district && (
            <small>
              {errors.district}
            </small>
          )}
        </label>

        <label className={styles.field}>
          <span>
            Temperature (°C) <b>*</b>
          </span>

          <input
            name="temp"
            type="number"
            step="0.1"
            value={form.temp}
            onChange={handleChange}
            placeholder="39.5"
            aria-invalid={Boolean(
              errors.temp
            )}
          />

          {errors.temp && (
            <small>
              {errors.temp}
            </small>
          )}
        </label>

        <label className={styles.field}>
          <span>
            Humidity (%) <b>*</b>
          </span>

          <input
            name="humidity"
            type="number"
            min="0"
            max="100"
            value={form.humidity}
            onChange={handleChange}
            placeholder="45"
            aria-invalid={Boolean(
              errors.humidity
            )}
          />

          {errors.humidity && (
            <small>
              {errors.humidity}
            </small>
          )}
        </label>

      </div>

      <div className={styles.actions}>

        <button
          type="button"
          className={styles.secondary}
          onClick={handleClear}
        >
          Clear
        </button>

        <button
          type="submit"
          className={styles.primary}
          disabled={isLoading}
        >
          {isLoading
            ? "Adding Sensor..."
            : "Add Sensor"}
        </button>

      </div>
    </form>
  );
}