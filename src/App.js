import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import { store } from "./redux/store";
import CustomRoute from "./routes";
import "./styles/global.css";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <CustomRoute />
          </Layout>
        </Provider>
      </BrowserRouter>
    </>
  );
};


export default App;
