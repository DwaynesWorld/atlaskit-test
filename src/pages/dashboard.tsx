import React from "react";
import { PaneledPage } from "hcss-components";

export const Dashboard = () => {
  return (
    <PaneledPage>
      <PaneledPage.Header>
        <PaneledPage.Header.Title>Dashboard</PaneledPage.Header.Title>
      </PaneledPage.Header>

      <PaneledPage.Content></PaneledPage.Content>
    </PaneledPage>
  );
};
