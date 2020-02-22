import { RESIZE_TRANSITION_DURATION } from "../../common/constants";
import { TransitionState } from "../../models/transition-state";

export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const getTransition = (keys: string[]) => {
  return {
    transition: keys
      .map(
        k =>
          `${camelToKebab(
            k
          )} ${RESIZE_TRANSITION_DURATION}ms cubic-bezier(0.2, 0, 0, 1)`
      )
      .join(",")
  };
};

export const getStyle = ({ keys, values }: any) => {
  const style = {};

  keys.forEach((k, i) => {
    style[k] = values[i];
  });

  return style;
};

export const getChanges = (keys: string[]) => {
  const props = keys.map(k => camelToKebab(k));
  return { willChange: props.join(",") };
};

export const isTransitioning = (state: TransitionState) => {
  return ["entering", "exiting"].includes(state);
};
