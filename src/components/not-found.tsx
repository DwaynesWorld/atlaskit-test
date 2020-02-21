import React from "react";
import { useLocation } from "react-router-dom";

export const NotFound = () => {
  const location = useLocation();
  return (
    <div>
      <div>This page could not be found</div>
      <div>{location.pathname}</div>
    </div>
  );
};
