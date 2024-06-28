import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import App from "./App";
import "./index.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
  </>  
)
