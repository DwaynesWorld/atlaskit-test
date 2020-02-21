---
to: src/index.tsx
---
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, themes } from "hcss-components";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={themes.preConstruction}>
      <div>Bare HCSS React Starter</div>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
