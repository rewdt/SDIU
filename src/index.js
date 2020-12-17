import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider } from "@material-ui/core";
import muiTheme from "./utils/theme/muiTheme";
import configureStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const { persistor, store } = configureStore();

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider
          template={AlertTemplate}
          {...options}
          containerStyle={{ zIndex: 1000000 }}
        >
          <MuiThemeProvider theme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </AlertProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
