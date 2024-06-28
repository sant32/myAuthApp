import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "../slice/authSlice";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = sessionStorage.getItem("token");

    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser({ user: res.data, token }));
      } catch (err) {
        dispatch(clearUser());
      }
    };

    if (token) {
      checkAuth();
    }
  }, [dispatch]);

  return { user };
};

export default useAuthSession;
