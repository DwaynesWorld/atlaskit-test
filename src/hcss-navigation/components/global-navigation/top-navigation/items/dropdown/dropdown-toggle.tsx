import styled from "styled-components";

export const DropdownToggle = styled("a").attrs((props: any) => ({
  href: "#",
  togglewidth: props.togglewidth
}))`
  display: block;
  position: relative;
  border: none;
  height: 100%;
  text-align: left;

  &:hover,
  &:focus,
  &.dropdown-active {
    outline: none;
  }
`;
