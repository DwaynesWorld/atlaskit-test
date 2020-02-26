import styled from "styled-components";
import { ConcreteColors } from "hcss-components";

export const Divider = styled.div.attrs(_ => ({
  className: "dropdown-menu-divider"
}))`
  height: 1px;
  margin: 8px 0;
  overflow: hidden;
  background-color: ${ConcreteColors.gray300};
  font-size: 0;
`;
