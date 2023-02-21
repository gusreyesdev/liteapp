import React from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="navbar-collapse">
        <div className="navbar-nav"></div>

        <span className="centeredIcon">
          <i className="fa-solid fa-user text-white iconUser"></i>
          <span className="text-white nameUser">{user.name}</span>
        </span>

        {user.profileId === 1 ? (
          <>
            <NavLink
              className={({ isActive }) =>
                "nav-item nav-link text-nowrap text-white " +
                (isActive ? "active" : "")
              }
              to="/createCompany"
            >
              Crear Empresa
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                "nav-item nav-link text-nowrap text-white mx-2" +
                (isActive ? "active" : "")
              }
              to="/updateCompany"
            >
              Editar Empresa
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                "nav-item nav-link text-nowrap text-white" +
                (isActive ? "active" : "")
              }
              to="/deleteCompany"
            >
              Eliminar Empresa
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                "nav-item nav-link text-nowrap text-white mx-5" +
                (isActive ? "active" : "")
              }
              to="/createInventory"
            >
              Crear Inventario
            </NavLink>


          </>
        ) : null}

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <ul className="navbar-nav ml-auto">
            <button className="nav-item nav-link btn" onClick={startLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket text-white"></i>
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
