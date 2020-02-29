import { css, keyframes } from "styled-components";
import { TransitionStatus } from "react-transition-group/Transition";
import {
  transitionDuration,
  transitionTimingFunction
} from "hcss-navigation/common/constants";

interface AnimationStyles {
  state: TransitionStatus;
  traversalDirection?: "up" | "down";
}

export const getAnimationStyles = ({
  state,
  traversalDirection
}: AnimationStyles) => {
  if (!["entering", "exiting"].includes(state)) return {};
  if (!traversalDirection) return {};

  if (state === "entering") {
    const animationName =
      traversalDirection === "down" ? enterAnimationDown : enterAnimationUp;

    return css`
      animation-duration: ${transitionDuration};
      animation-fill-mode: forwards;
      animation-timing-function: ${transitionTimingFunction};
      position: absolute;
      width: 100%;
      z-index: 1;
      animation-name: ${animationName};
    `;
  }

  // Exiting
  const animationName =
    traversalDirection === "down" ? exitAnimationDown : exitAnimationUp;

  return css`
    animation-duration: ${transitionDuration};
    animation-fill-mode: forwards;
    animation-timing-function: ${transitionTimingFunction};
    animation-name: ${animationName};
  `;
};

const enterAnimationDown = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0%); }
`;

const enterAnimationUp = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0%); }
`;

const exitAnimationDown = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const exitAnimationUp = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;
