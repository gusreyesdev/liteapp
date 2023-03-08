import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Navbar } from "../../ui/Navbar";

import { useGetCompaniesByUserQuery } from "../../../store/api";

import "./Dashboard.css";

export const DashboardByUser = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: companies,
    isLoading,
    isError,
  } = useGetCompaniesByUserQuery(user.id);

  const showScreen = () => {
    if (isLoading === true) {
      return (
        <div className="containerLoading">
          <div
            className="spinner-border text-info loadingCustom"
            role="status"
          ></div>
        </div>
      );
    } else if (isError) {
      return (
        <div className="container mt-5 centered">
          <h2> No tiene empresas asignadas </h2>
        </div>
      );
    } else {
      return (
        <ul className="list-group">
          {companies.company.map((company) => (
            <li className="list-group-item mb-1" key={company.nit}>
              <span>{company.name}</span>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      <Navbar />

      {showScreen()}
    </>
  );
};
