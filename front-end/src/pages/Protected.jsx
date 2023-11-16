import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import RootLayout from "./dashboard/Root";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }
  }, [user]);

  // if (!user) {
  //   return <Navigate to="/landing" />;
  // }

  return children;
};

export default Protected;
