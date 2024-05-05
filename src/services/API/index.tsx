import axios from "axios";

const baseUrl = "http://localhost:8030/api";

function getToken() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] =
    "Bearer" + " " + token.slice(1, -1);
  return token;
}

export const getData = async (endpoint: string, body?: any) => {
  try {
    getToken();
    const result = await axios.get(`${baseUrl}${endpoint}`, body);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const postData = async (endpoint: string, data: any) => {
  try {
    getToken();
    console.log(data);
    const result = await axios.post(`${baseUrl}${endpoint}`, data);
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
export const putData = async (endpoint: string, data: any) => {
  try {
    getToken();
    const result = await axios.put(`${baseUrl}${endpoint}`, data);
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    getToken();
    const result = await axios.delete(`${baseUrl}${endpoint}`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
