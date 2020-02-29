import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  HeaderSection,
  MenuSection
} from "hcss-navigation/components/dynamic-navigation/sections";
import { Item } from "hcss-navigation/components/dynamic-navigation/items";
import styled from "styled-components";

export const ModuleNavigation = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/projects")) {
    return <ProjectTrackingModule />;
  }

  if (location.pathname.startsWith("/estimates")) {
    return <EstimatingModule />;
  }

  return null;
};

const ProjectTrackingModule = () => {
  const history = useHistory();

  return (
    <div className="project-tracking-navigation-module">
      <HeaderSection>
        {headerStyle => {
          return (
            <div style={headerStyle}>
              <HeaderContainer>
                <ModuleTitle>Project Tracking</ModuleTitle>
              </HeaderContainer>
            </div>
          );
        }}
      </HeaderSection>
      <MenuSection>
        {menuStyle => (
          <div style={menuStyle}>
            <Item
              key="project-list"
              before="th-list"
              text="Project List"
              onClick={() => history.push("/projects")}
            />
            <Item
              key="import-projects"
              before="cloud-upload"
              text="Import Projects"
              onClick={() => history.push("/projects/import")}
            />
            <Item
              key="customize-projects"
              before="cogs"
              text="Customize Projects"
              onClick={() => history.push("/projects/customize")}
            />
          </div>
        )}
      </MenuSection>
    </div>
  );
};

const EstimatingModule = () => {
  const history = useHistory();

  return (
    <div className="project-tracking-navigation-module">
      <HeaderSection>
        {headerStyle => {
          return (
            <div style={headerStyle}>
              <HeaderContainer>
                <ModuleTitle>Estimating</ModuleTitle>
              </HeaderContainer>
            </div>
          );
        }}
      </HeaderSection>
      <MenuSection>
        {menuStyle => (
          <div style={menuStyle}>
            <Item
              key="estimate-list"
              before="th-list"
              text="Estimate List"
              onClick={() => history.push("/estimates")}
            />
          </div>
        )}
      </MenuSection>
    </div>
  );
};

const HeaderContainer = styled.div`
  padding-bottom: 26px;
  padding-left: 16px;
  padding-top: 8px;
`;

const ModuleTitle = styled.span`
  font-size: 20px;
`;
