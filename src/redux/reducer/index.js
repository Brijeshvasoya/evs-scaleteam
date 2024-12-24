import React, { createContext, useContext, useReducer } from "react";

const initialUserState = {
  userData: JSON.parse(localStorage.getItem("users")) || [],
  activeUser: JSON.parse(localStorage.getItem("active_user")) || [],
};

export const AddUserContext = createContext();

export const AddUserReducer = (state = initialUserState, action) => {
  let newState;

  switch (action.type) {
    case "ADD_USER":
      newState = [...state.userData, action.payload.data];
      localStorage.setItem("users", JSON.stringify(newState));
      return { ...state, userData: newState };
    case "EDIT_USER":
      newState = state.userData.map((item) =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
      localStorage.setItem("users", JSON.stringify(newState));
      return { ...state, userData: newState };
    case "DELETE_USER":
      newState = state.userData.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("users", JSON.stringify(newState));
      return { ...state, userData: newState };
    case "LOGIN_USER":
      newState = action.payload.data;
      console.log(newState,"newState");
      
      localStorage.setItem("active_user", JSON.stringify(newState));
      return { ...state, activeUser: newState };
    case "LOGOUT_USER":
      newState = action.payload.data;
      localStorage.setItem("active_user", JSON.stringify(newState));
      return { ...state, activeUser: newState };
    default:
      return state;
  }
};

export const AddUserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AddUserReducer, initialUserState);

  return (
    <AddUserContext.Provider value={{ state, dispatch }}>
      {children}
    </AddUserContext.Provider>
  );
};

export const useAddUser = () => useContext(AddUserContext);
