import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Detour = () => {
  const { user } = useSelector((state) => state.auth);

  return user.profileId === 1 
  ? <Navigate to="/dashboard" />
  : <Navigate to="/dashboardByUser" />


};
