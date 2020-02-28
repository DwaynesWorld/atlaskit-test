import React from "react";
import { PaneledPage } from "hcss-components";

export const Messages = () => {
  return (
    <PaneledPage>
      <PaneledPage.Header>
        <PaneledPage.Header.Title>Messages</PaneledPage.Header.Title>
      </PaneledPage.Header>

      <PaneledPage.Content></PaneledPage.Content>
    </PaneledPage>
  );
};
