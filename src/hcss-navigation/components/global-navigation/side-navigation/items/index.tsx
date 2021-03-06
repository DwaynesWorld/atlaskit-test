import React, { Fragment, ReactNode } from "react";
import styled, { css } from "styled-components";
import { GLOBAL_SIDE_NAV_WIDTH } from "hcss-navigation/common/constants";
import { ConcreteColors } from "hcss-components";
import { NamedColor } from "hcss-navigation/models/css-colors";

interface SideNavigationMenuItemProps {
  /** 
    This can either be the font awesome name of the icon,
    or an Icon component to render.
   */
  icon?: string | ReactNode;
  /** 
    Inline styles applied the item container.
   */
  itemContainerStyle?: React.CSSProperties;
  /** 
   Inline styles applied to the nav button.
   */
  buttonStyle?: React.CSSProperties;
  isSelected?: boolean;
  buttonColor?: {
    default: NamedColor;
    selected: NamedColor;
    hover: NamedColor;
  };
  buttonBackgroundColor?: {
    default: NamedColor;
    selected: NamedColor;
    hover: NamedColor;
  };
  onClick?: () => void;
}
export const SideNavigationMenuItem = ({
  icon,
  isSelected = false,
  itemContainerStyle,
  buttonStyle,
  buttonColor,
  buttonBackgroundColor,
  onClick
}: SideNavigationMenuItemProps) => {
  const renderOther = (other?: string | ReactNode) => {
    if (other === undefined) return null;

    if (typeof other === "string") {
      return <i className={`section-item-icon fa fa-${other}`} />;
    }

    return <Fragment>{other}</Fragment>;
  };

  return (
    <ItemWrapper className="side-nav-item-wrapper" style={itemContainerStyle}>
      <Button
        className="side-nav-item-button"
        isSelected={isSelected}
        buttonColor={buttonColor}
        buttonBackgroundColor={buttonBackgroundColor}
        style={buttonStyle}
        onClick={onClick}>
        {renderOther(icon)}
      </Button>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
`;

interface ButtonProps {
  isSelected: boolean;
  buttonColor?: {
    default: NamedColor;
    selected: NamedColor;
    hover: NamedColor;
  };
  buttonBackgroundColor?: {
    default: NamedColor;
    selected: NamedColor;
    hover: NamedColor;
  };
}
const Button = styled.button<ButtonProps>`
  ${p =>
    p.isSelected
      ? css`
          color: ${p.buttonColor?.selected ?? ConcreteColors.blue200};
          background-color: ${p.buttonBackgroundColor?.selected ??
            "transparent"};
        `
      : css`
          color: ${p.buttonColor?.default ?? ConcreteColors.gray400};
          background-color: ${p.buttonBackgroundColor?.default ??
            "transparent"};
        `};

  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  height: ${GLOBAL_SIDE_NAV_WIDTH}px;
  width: ${GLOBAL_SIDE_NAV_WIDTH}px;
  border-width: 0px;
  outline: none;
  padding: 0px;
  cursor: pointer;

  &:hover {
    color: ${p => p.buttonColor?.hover ?? ConcreteColors.blue200};
    /* background-color: ${p =>
      p.buttonBackgroundColor?.hover ?? ConcreteColors.gray200}; */
  }

  i.section-item-icon {
    font-size: 22px;
  }
`;
