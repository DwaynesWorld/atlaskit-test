import styled from "styled-components";

interface IProps {
  disableInteraction?: boolean;
}

export const ContainerMask = styled.div<IProps>`
  --interaction: ${p => (p.disableInteraction ? "none" : "auto")};

  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
  pointer-events: var(--interaction);
  user-select: var(--interaction);
`;
