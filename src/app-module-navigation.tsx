import React from "react";
import { useLocation } from "react-router-dom";
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
              onClick={() => console.log("something clicked")}
            />
            <Item
              key="import-projects"
              before="cloud-upload"
              onClick={() => console.log("something clicked")}
              text="Import Projects"
            />
            <Item
              key="customize-projects"
              before="cogs"
              onClick={() => console.log("something clicked")}
              text="Customize Projects"
            />
          </div>
        )}
      </MenuSection>
    </div>
  );
};

const EstimatingModule = () => {
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
              onClick={() => console.log("something clicked")}
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
