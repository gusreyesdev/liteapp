import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { CreateCompany, CreateInventory, Dashboard, DeleteCompany, Login, Register, UpdateCompany } from "../components/screens";
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/*" element={<Navigate to="/" />} />

          <Route path="createCompany" element={<CreateCompany/>} />

          <Route path="updateCompany" element={<UpdateCompany/>} />

          <Route path="deleteCompany" element={<DeleteCompany/>} />

          <Route path="createInventory" element={<CreateInventory/>} />

        </>
      )}
    </Routes>
  );
};
