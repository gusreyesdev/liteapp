import React, { useEffect } from "react";

import { Navbar } from "../../ui/Navbar";
import { useNavigate } from "react-router-dom";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
} from "../../../store/api";

import "./Dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { data: companies, isLoading, isError } = useGetCompaniesQuery();

  const [deleteCompany] = useDeleteCompanyMutation();

  const updateHandle = async (nit, event) => {
    event.preventDefault();
    navigate("/updateCompany", { state: { nit } });
  };

  const deleteHandle = async (nit, event) => {
    event.preventDefault();
    deleteCompany(nit);
  };

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

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn btn-secondary me-md-2 btn-sm"
                  onClick={(e) => updateHandle(company.nit, e)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => deleteHandle(company.nit, e)}
                >
                  Eliminar
                </button>
              </div>
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
