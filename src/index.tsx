import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div
      style={{
        fontFamily: "Helvetica",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "300px",
        width: "100vw"
      }}
    >
      <p>Close the dev server and run</p>
      <pre>yarn hcss-init</pre>
      <p>or</p>
      <pre>npm run hcss-init</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
