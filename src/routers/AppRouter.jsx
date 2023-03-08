import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Login, Register, Detour, Dashboard, DashboardByUser, CreateCompany, CreateInventory, UpdateCompany } from "../components/screens";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return (
      <div className="containerLoading">
        <div
          className="spinner-border text-info loadingCustom"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/login/*" element={<Login />} />
          <Route path="/*" element={<Navigate to="/login" />} />

          <Route path="register" element={<Register />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Detour />} />
          <Route path="/*" element={<Navigate to="/" />} />

          <Route path="dashboard" element={<Dashboard/>} />

          <Route path="dashboardByUser" element={<DashboardByUser/>} />

          <Route path="createCompany" element={<CreateCompany/>} />

          <Route path="updateCompany" element={<UpdateCompany/>} />

          <Route path="createInventory" element={<CreateInventory/>} />

        </>
      )}
    </Routes>
  );
};
