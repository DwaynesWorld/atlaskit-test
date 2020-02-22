import React, { ReactChild, useState, useEffect } from "react";
import Transition from "react-transition-group/Transition";
import { RESIZE_TRANSITION_DURATION } from "../../common/constants";
import { getTransition, getStyle, getChanges } from "./helpers";
import {
  CollapseListener,
  ExpandListener
} from "../../models/collapse-listener";

interface IProps {
  in: boolean;
  from: Array<number | string>;
  to: Array<number | string>;
  userIsDragging: boolean;
  properties: Array<string>;
  onExpandStart?: ExpandListener;
  onExpandEnd?: ExpandListener;
  onCollapseStart?: CollapseListener;
  onCollapseEnd?: CollapseListener;
  children: ({
    transitionStyle: Object,
    transitionState: TransitionState
  }) => ReactChild;
}

export const ResizeTransition = ({
  in: inProp,
  from,
  to,
  userIsDragging,
  properties,
  onExpandStart,
  onExpandEnd,
  onCollapseStart,
  onCollapseEnd,
  children
}: IProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <Transition
      onEntering={onExpandStart}
      onEntered={onExpandEnd}
      onExiting={onCollapseStart}
      onExited={onCollapseEnd}
      in={inProp}
      timeout={isMounted ? RESIZE_TRANSITION_DURATION : 0}>
      {transitionState => {
        const transition =
          !userIsDragging && isMounted ? getTransition(properties) : {};

        const dynamicProperties = {
          exiting: getStyle({ keys: properties, values: from }),
          exited: getStyle({ keys: properties, values: from }),
          entering: getStyle({ keys: properties, values: to }),
          entered: getStyle({ keys: properties, values: to })
        };

        const willChange = getChanges(properties);

        const transitionStyle = {
          ...willChange,
          ...transition,
          ...dynamicProperties[transitionState]
        };

        return children({
          transitionStyle, // consumers must apply `transitionStyle`
          transitionState // lets consumers react to the current state
        });
      }}
    </Transition>
  );
};
