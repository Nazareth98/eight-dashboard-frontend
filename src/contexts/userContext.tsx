import { createContext, useState } from "react";

import { deleteData, getData, postData, putData } from "../services/API";
import UserType from "../types/userType";

interface UserContext {
  userData?: UserType[];
  updateData: () => void;
  createUser: (body: UserType) => Promise<any> | void;
  deleteUser: (id: number) => any;
  updateUser: (body: UserType) => Promise<any> | void;
}

const initialState: UserContext = {
  userData: undefined,
  updateData: () => {},
  createUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
};

const userContext = createContext<UserContext>(initialState);

const UserContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<UserType[]>();

  const getUsers = async () => {
    try {
      const endpoint = "/user";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      const data = await getUsers();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (body: UserType) => {
    try {
      const endpoint = `/user/${body.id}`;
      console.log(body);
      const response = await putData(endpoint, body);
      setUserData(response.result);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (body: UserType) => {
    try {
      const endpoint = "/user/create";
      const result = await postData(endpoint, body);
      if (result.response) {
        console.log(result.response.data);
        return result.response.data;
      } else {
        console.log(result);
        await updateData();
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteUser(id: number) {
    try {
      const endpoint = `/user/${id}`;
      const result = await deleteData(endpoint);
      await updateData();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <userContext.Provider
      value={{ updateData, userData, createUser, deleteUser, updateUser }}
    >
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserContextProvider };
