import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin, setLogout } from "../../features/auth/authSlice";
export const UserLogout = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    // const get = async () => {
    axiosInstance.get("http://localhost:8000/users/logout").then((res) => {
      if (res.status === 200) {
        dispatch(setLogout());
        navigate("/");
      }
    });
  }, []);
};
