import styled from "styled-components";
import { NAVIGATION_LAYER_ZINDEX } from "../../common/constants";

interface IProps {
  topOffset?: number;
}

export const NavigationContainer = styled.div<IProps>`
  --top-offset: ${props => (props.topOffset ? props.topOffset : 0)}px

  top: var(--topOffset);
  bottom: 0px;
  left: 0px;
  position: fixed;
  z-index: ${NAVIGATION_LAYER_ZINDEX};
`;
