import "./App.css";
import Router from "./router/Router";
import { AddUserContextProvider } from "./redux/reducer"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <AddUserContextProvider>
        <Router />
        <ToastContainer />
      </AddUserContextProvider>
    </Provider>
  );
}

export default App;
