import React, { useState, Fragment, ReactNode, useCallback } from "react";
import styled from "styled-components";
import { TransitionGroup, Transition } from "react-transition-group";
import { useIsMounted } from "hcss-navigation/common/use-is-mounted";
import { usePrevious } from "hcss-navigation/common/use-previous";
import { getAnimationStyles } from "./get-animation-styles";
import {
  transitionDurationMs,
  SCROLL_HINT_HEIGHT,
  SCROLL_BAR_SIZE,
  SCROLL_HINT_SPACING
} from "hcss-navigation/common/constants";

export interface SectionProps {
  id?: string;
  parentId?: string;
  shouldGrow?: boolean;
  alwaysShowScrollHint?: boolean;
  children: (styles: React.CSSProperties) => ReactNode;
}
export const Section = ({
  id,
  parentId,
  shouldGrow = false,
  alwaysShowScrollHint = false,
  children
}: SectionProps) => {
  const isMounted = useIsMounted();
  const [traversalDirection, setTraversalDirection] = useState<"up" | "down">();
  const prevId = usePrevious(id);
  const prevParentId = usePrevious(parentId);

  // TODO: Check this impl
  useCallback(() => {
    if (parentId && parentId === prevId) {
      setTraversalDirection("down");
    }
    if (prevParentId && prevParentId === id) {
      setTraversalDirection("up");
    }
  }, [id, parentId, prevId, prevParentId]);

  const TransitionGroupComponent = shouldGrow
    ? ScrollableTransitionGroup
    : StaticTransitionGroup;

  return (
    <TransitionGroup appear component={TransitionGroupComponent}>
      <Transition key={id} timeout={isMounted ? transitionDurationMs : 0}>
        {state => {
          const animationStyles = getAnimationStyles({
            state,
            traversalDirection
          });
          return (
            <Fragment>
              {shouldGrow ? (
                <ScrollableSectionWrapper style={animationStyles}>
                  <ScrollableSectionInner
                    alwaysShowScrollHint={alwaysShowScrollHint}>
                    {children({
                      boxSizing: "border-box",
                      paddingLeft: 16,
                      paddingRight: 16
                    })}
                  </ScrollableSectionInner>
                </ScrollableSectionWrapper>
              ) : (
                <StaticSectionWrapper
                  className="static-section-wrapper"
                  style={animationStyles}>
                  {children({
                    boxSizing: "border-box",
                    paddingLeft: 16,
                    paddingRight: 16
                  })}
                </StaticSectionWrapper>
              )}
            </Fragment>
          );
        }}
      </Transition>
    </TransitionGroup>
  );
};

const ScrollableSectionWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;

  &::before {
    content: "";
    display: block;
    flex: 0;
    position: absolute;
    top: 0;
    right: ${SCROLL_HINT_SPACING + SCROLL_BAR_SIZE}px;
    left: ${SCROLL_HINT_HEIGHT}px;
    height: ${SCROLL_HINT_HEIGHT}px;
    z-index: 1;
    border-radius: 1px;
  }

  &::after {
    content: "";
    display: block;
    flex: 0;
    position: absolute;
    left: ${SCROLL_HINT_HEIGHT}px;
    right: ${SCROLL_HINT_SPACING + SCROLL_BAR_SIZE}px;
    bottom: 0;
    height: ${SCROLL_HINT_HEIGHT}px;
    z-index: 1;
    border-radius: 1px;
  }
`;

const ScrollableSectionInner = styled.div<{ alwaysShowScrollHint: boolean }>`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  height: 100%;
  justify-content: flex-start;
  overflow-y: auto;
  position: relative;

  &::before {
    content: "";
    display: ${p => (p.alwaysShowScrollHint ? "none" : "block")};
    flex-shrink: 0;
    position: relative;
    height: ${SCROLL_HINT_HEIGHT}px;
    margin-left: ${SCROLL_HINT_HEIGHT}px;
    border-radius: 1px;
    z-index: 2;
  }

  &::after {
    content: "";
    display: block;
    flex-shrink: 0;
    position: relative;
    height: ${SCROLL_HINT_HEIGHT}px;
    margin-left: ${SCROLL_HINT_HEIGHT}px;
    margin-top: auto;
    border-radius: 1px;
    z-index: 2;
  }
`;

const StaticSectionWrapper = styled.div``;

const StaticTransitionGroup = styled.div.attrs(_ => ({
  className: "static-transition-group"
}))`
  position: relative;
`;

const ScrollableTransitionGroup = styled.div.attrs(_ => ({
  className: "scrollable-transition-group"
}))`
  position: relative;
  flex: 1 1 100%;
  overflow-y: hidden;
`;
