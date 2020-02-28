import styled from "styled-components";
import { ConcreteColors } from "hcss-components";
import { DropdownToggle } from "./dropdown-toggle";

export const DropdownButton = styled(DropdownToggle)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background: none;
  padding: 0 16px;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${ConcreteColors.gray700};
  z-index: 3;
  transition: 0.2s;

  /* to prevent overriding from the default styling for anchor elements */
  &:focus:not(:hover):not(.dropdown-active) {
    color: ${ConcreteColors.gray700};
  }

  &:after {
    transition: 0.2s;
  }

  /* triangular pointer, shown only while Dropdown is active and DropdownMenu is visible */
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    top: 100%;
    left: 0;
    background: none;
    border-top: 0px solid transparent;

    border-left-style: solid;
    border-left-color: transparent;
    border-left-width: calc(${props => props.togglewidth}px / 2);

    border-right-style: solid;
    border-right-color: transparent;
    border-right-width: calc(${props => props.togglewidth}px / 2);
    transition: 0.2s, border-right-width, border-left-width 0s; /* prevents glitching when toggle region's width changes for whatever reason */
  }

  &:hover {
    color: ${ConcreteColors.blue200};
    background: ${ConcreteColors.blue100};

    &:after {
      border-top-color: ${ConcreteColors.blue100};
    }
  }

  &.dropdown-active {
    color: white;
    background: ${ConcreteColors.blue200};

    &:after {
      border-top-color: ${ConcreteColors.blue200};
    }
  }

  &:hover,
  &.dropdown-active {
    text-decoration: none !important;
  }

  &.dropdown-active {
    &:after {
      border-top-width: 12px;
      /* if we go with the green background color instead, and hover background is same as active background, use the timing function below */
      /* transition: border-top-width 0.2s cubic-bezier(0.5, 0.0, 0.5, 0.5); */
    }
  }
`;
