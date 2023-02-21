import React, { useEffect } from "react";
import { useCompanyStore } from "../../../hooks";
import { Navbar } from "../../ui/Navbar";
import { Link } from "react-router-dom";

export const Dashboard = () => {

  const { companies, items ,startLoadingCompanies } = useCompanyStore();


  useEffect(() => {
    startLoadingCompanies();
  }, [companies]);

  return (
    <>
      <Navbar />

      <ul className="list-group">
        {companies.map((company) => (
          <li className="list-group-item mb-1" key={company.nit}>
            <span>{company.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
