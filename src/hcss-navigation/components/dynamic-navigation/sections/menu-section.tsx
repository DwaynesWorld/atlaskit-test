import React, { CSSProperties, Fragment } from "react";
import { Section, SectionProps } from "./base";

export const MenuSection = ({ children, ...props }: SectionProps) => {
  return (
    <Section {...props}>
      {baseStyles => {
        const menuStyles: CSSProperties = { paddingBottom: 12 };
        const mergedStyles = { ...baseStyles, ...menuStyles };
        return <Fragment>{children(mergedStyles)}</Fragment>;
      }}
    </Section>
  );
};
