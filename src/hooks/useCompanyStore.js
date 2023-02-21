import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { configApis } from "../apis";
import {
  onLoadCompanies,
  onStartLoading,
  onFinishLoading,
} from "../store/reducers";

export const useCompanyStore = () => {
  const dispatch = useDispatch();
  const { companies, isLoading } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);

  const startLoadingCompanies = async () => {
    try {
      const { data } = await configApis.get(
        "/companies/getCompaniesByUser/" + user.id
      );

      dispatch(onLoadCompanies(data.company, data.items));
    } catch (error) {
      console.log("Error cargando companies");
      console.log(error);
    }
  };

  const startCreateCompany = async ({ nit, name, address, phone }) => {
    dispatch(onStartLoading());
    try {
      const { data } = await configApis.post("/companies/createCompany", {
        nit,
        name,
        address,
        phone,
        UserId: user.id,
      });

      dispatch(onFinishLoading());
    } catch (error) {
      const errorResponse = error.response.data;

      console.log(errorResponse);
      Swal.fire("Error save", errorResponse.msg, "error");
    }
  };

  const starUpdateCompany = async ({ selectCompany, name, address, phone }) => {
    dispatch(onStartLoading());

    try {
      await configApis.put(
        "/companies/updateCompany/" + selectCompany.company,
        {
          name,
          address,
          phone,
          UserId: user.id,
        }
      );

      dispatch(onFinishLoading());
    } catch (error) {
      const errorResponse = error.response.data;

      console.log(error);
      Swal.fire("Error to update", errorResponse.msg, "error");
    }
  };

  const startDeleteCompany = async ({ selectCompany }) => {
    dispatch(onStartLoading());

    try {
      await configApis.delete(
        "/companies/deleteCompany/" + selectCompany.company
      );

      dispatch(onFinishLoading());
    } catch (error) {
      const errorResponse = error.response.data;

      console.log(error);
      Swal.fire("Error to delete", errorResponse.msg, "error");
    }
  };


  const startCreateInventory = async ({  name, selectCompany  }) => {
    dispatch(onStartLoading());
    try {
      const { data } = await configApis.post("/inventory/createItem", {
        name,
        CompanyNit:selectCompany.company
      });

      dispatch(onFinishLoading());
    } catch (error) {
      const errorResponse = error.response.data;

      console.log(errorResponse);
      Swal.fire("Error to crate inventory", errorResponse.msg, "error");
    }
  };

  return {
    companies,
    isLoading,

    startLoadingCompanies,
    startCreateCompany,
    starUpdateCompany,
    startDeleteCompany,
    startCreateInventory
    
  };
};
