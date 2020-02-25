import React from "react";
import { DropdownContext } from "./dropdown-context";

export const useDropdownMenuManager = (WrappedComponent: any) => (
  props: any
) => {
  return (
    <DropdownContext.Consumer>
      {value => <WrappedComponent onClick={value} {...props} />}
    </DropdownContext.Consumer>
  );
};
