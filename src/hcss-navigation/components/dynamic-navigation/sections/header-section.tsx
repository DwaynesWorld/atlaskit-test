import React, { CSSProperties, Fragment } from "react";
import { Section, SectionProps } from "./base";

export const HeaderSection = ({ children, ...props }: SectionProps) => {
  return (
    <Section {...props}>
      {baseStyles => {
        const headerStyles: CSSProperties = { paddingTop: 20 };
        const mergedStyles = { ...baseStyles, ...headerStyles };
        return <Fragment>{children(mergedStyles)}</Fragment>;
      }}
    </Section>
  );
};
