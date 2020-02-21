---
to: src/localization/english.ts
---
export const en = {
  siteLayout: {
    profileMenu: {
      logout: "logout"
    },
    navMenu: {
      info: "Info",
      about: "About"
    },
    product: {
      light: "HCSS",
      bold: "React Starter"
    }
  },
  about: {
    title: "About",
    docs: {
      title: "Documentation",
      gettingStarted: "Getting Started",
      inPlace:
        "Delete this page from 'src/pages', and start adding your own components.",
      bare: "Or, if you would rather start from scratch, run:",
      links: "Links",
      components: "Components Bundle",
      styleguide: "Style Guide"
    },
    includedLibs: {
      title: "What's included?",
      body:
        "This template is a modified version of the Create React App typescript template. It includes some boilerplate components and the following:"
    },
    localization: {
      title: "Localization",
      about: "React-localization has been setup for multi-language support.",
      instructions:
        "Instead of adding strings directly to the DOM, add them to src/localization/english.ts and then import them from 'localization'."
    },
    fileStructure: {
      title: "File Structure"
    }
  }
};
