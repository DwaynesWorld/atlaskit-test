import styled from "styled-components";

interface IProps {
  topOffset?: number;
}
export const LayoutContainer = styled.div<IProps>`
  display: flex;
  flex-direction: row;
  --top-offset: ${props => (props.topOffset ? props.topOffset : 0)}px
  height: calc(100vh - var(--topOffset));
  margin-top: var(--top-offset);
`;
