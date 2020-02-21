---
to: src/pages/about.tsx
---
import React from "react";
import { PaneledPage } from "hcss-components";
import { strings } from "localization";

export default () => {
  return (
    <PaneledPage>
      <PaneledPage.Header>
        <PaneledPage.Header.Title>
          {strings.about.title}
        </PaneledPage.Header.Title>
      </PaneledPage.Header>

      <PaneledPage.Content>
        <PaneledPage.Content.TableOfContents />

        <PaneledPage.Content.Section title="Getting Started">
          <p>{strings.about.docs.inPlace}</p>
          <p>{strings.about.docs.bare}</p>
          <pre>
            <%= h.useYarn() ? "yarn hcss-bare" : "npm run hcss-bare" %>
          </pre>
        </PaneledPage.Content.Section>

        <PaneledPage.Content.Section title={strings.about.includedLibs.title}>
          <p>{strings.about.includedLibs.body}</p>
          <ul>
            <li>Standard HCSS Components (hcss-components)</li>
            <li>CSS-in-JS (styled-components)</li>
            <li>String Localization (react-localization)</li>
            <li>Routing (react-router)</li>
            <li>Unit Testing (jest & react-testing-library)</li>
            <li>Typescript</li>
          </ul>
        </PaneledPage.Content.Section>

        <PaneledPage.Content.Section title={strings.about.docs.title}>
          <p>
            <a
              href="https://hcss-styleguide.azurewebsites.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              {strings.about.docs.components}
            </a>
          </p>
          <p>
            <a
              href="https://hcssdev.atlassian.net/wiki/spaces/UX/pages/37191914/Style+Guides"
              target="_blank"
              rel="noopener noreferrer"
            >
              {strings.about.docs.styleguide}
            </a>
          </p>
        </PaneledPage.Content.Section>

        <PaneledPage.Content.Section title={strings.about.localization.title}>
          <p>{strings.about.localization.about}</p>
          <p>{strings.about.localization.instructions}</p>
          <p>
            <pre>
              // old way
              <br />
              <br />
              &lt;Button&gt;New Project&lt;/Button&gt;
              <br />
              <br />
              // new way
              <br />
              <br />
              import &#123; strings &#125; from "localization";
              <br />
              <br />
              &lt;Button&gt;&#123;strings.projects.newProject&#125;&lt;/Button&gt;
            </pre>
          </p>
        </PaneledPage.Content.Section>
      </PaneledPage.Content>
    </PaneledPage>
  );
};
