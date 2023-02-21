import { useDispatch, useSelector } from "react-redux";
import { configApis } from "../apis";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/reducers";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await configApis.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      dispatch(
        onLogin({ name: data.name, id: data.id, profileId: data.ProfileId })
      );
    } catch (error) {
      const errorResponse = error.response.data;

      dispatch(onLogout(errorResponse.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name, ProfileId }) => {
    dispatch(onChecking());
    try {
      const { data } = await configApis.post("/auth/newUser", {
        email,
        password,
        name,
        ProfileId,
      });
      localStorage.setItem("token", data.token);

      dispatch(
        onLogin({ name: data.name, id: data.id, profileId: data.ProfileId })
      );
    } catch (error) {

      const errorResponse = error.response.data;

      dispatch(onLogout(errorResponse.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {

    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {

      const { data } = await configApis.get("auth/reviveToken",{
        headers:{
          'x-token': token
        }
      });

      localStorage.setItem("token", data.token);

      dispatch(
        onLogin({ name: data.name, id: data.id, profileId: data.ProfileId })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch( onLogout() );
}

  return {
    errorMessage,
    status,
    user,

    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
