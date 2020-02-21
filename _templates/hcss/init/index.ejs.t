---
to: src/index.tsx
---
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { ThemeProvider, themes } from "hcss-components";
import { BrowserRouter } from "react-router-dom";

const AppWithProviders = () => (
  <BrowserRouter>
    <ThemeProvider theme={themes.preConstruction}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(<AppWithProviders />, document.getElementById("root"));
