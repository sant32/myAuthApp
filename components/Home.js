import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../slice/authSlice";
import useAuthSession from "../hooks/useAuthSession";
import { ToastContainer, toast } from "react-toastify";
import styles from "../style/home.module.css";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useAuthSession();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/api/auth/login", values);
        const token = res.data.token;

        // Store token in sessionStorage
        sessionStorage.setItem("token", token);

        // Dispatch user info to the store
        dispatch(setUser({ user: { username: values.username }, token }));

        toast.success("Login successful!");
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Invalid credentials");
      }
    },
  });

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className={styles.input}
        />
        {formik.errors.username && formik.touched.username && (
          <p className={styles.error}>{formik.errors.username}</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className={styles.input}
        />
        {formik.errors.password && formik.touched.password && (
          <p className={styles.error}>{formik.errors.password}</p>
        )}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      {user && (
        <>
          <p className={styles.welcome}>
            Welcome, {user.username} your authorized
          </p>
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
