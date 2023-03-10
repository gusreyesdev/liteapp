import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

export const configApis = axios.create({
  baseURL: VITE_API_URL,
});