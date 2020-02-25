import React from "react";
import { PaneledPage } from "hcss-components";

export const About = () => {
  return (
    <PaneledPage>
      <PaneledPage.Header>
        <PaneledPage.Header.Title>About</PaneledPage.Header.Title>
      </PaneledPage.Header>

      <PaneledPage.Content></PaneledPage.Content>
    </PaneledPage>
  );
};
