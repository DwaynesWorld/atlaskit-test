import React from "react";
import { SideNavigationMenuItem } from "./";
import { ConcreteColors } from "hcss-components";

export const CreateItem = ({ onClick }: { onClick?: () => void }) => {
  return (
    <SideNavigationMenuItem
      icon="plus"
      buttonStyle={{
        borderRadius: "50%",
        width: 40,
        height: 40,
        boxShadow: "-1px 3px 6px rgba(0,0,0,0.5)"
      }}
      buttonColor={{
        default: "white",
        selected: "white",
        hover: "white"
      }}
      buttonBackgroundColor={{
        default: ConcreteColors.blue200,
        selected: ConcreteColors.blue200,
        hover: ConcreteColors.blue300
      }}
      onClick={onClick}
    />
  );
};
