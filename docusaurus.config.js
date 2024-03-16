// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Evolution API Documentation",
  tagline: "Documentation for Evolution API",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://doc.evolution-api.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "EvolutionAPI", // Usually your GitHub org/user name.
  projectName: "doc-evolution-api", // Usually your repo name.

  // onBrokenLinks: "throw",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    localeConfigs: {
    en: {
      label: 'English',
      direction: 'ltr',
      htmlLang: 'en-US',
      calendar: 'gregory',
      path: 'en',
    },
    pt: { // Changed this from 'fa' to 'pt'
      label: 'Português', // Updated the label to Portuguese
      direction: 'ltr', // Portuguese is a LTR language
      htmlLang: 'pt-BR', // Assuming Brazilian Portuguese, change if necessary
      calendar: 'gregory', // Portuguese uses the Gregorian calendar
      path: 'pt',
    },
  },  
},

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          numberPrefixParser: false, // This make DocsLists component render correct order
          // sidebarCollapsed: false,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        // title: "Evolution API Documentationsss",
        logo: {
          alt: "Evolution API Logo ",
          srcDark: "img/brand/svg/logo-horizontal-inverted.svg",
          src: "img/brand/svg/logo-horizontal-default.svg",
          style: {
            height: 45,
            marginTop: -5,
          },
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            type: "search",
            position: "right",
          },
          {
            href: "#",
            label: "Community",
            position: "left",
            "aria-label": "Community menu with sub-items",
            items: [
              {
                href: "https://evolution-api.com/whatsapp",
                label: "WhatsApp Group",
                "aria-label": "WhatsApp Group",
              },
              {
                href: "https://evolution-api.com/discord",
                label: "Discord Server",
                "aria-label": "Discord Server",
              },
            ],
          },
          {
            href: "https://github.com/EvolutionAPI/evolution-docs",
            // label: "GitHub",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false,
          hideable: true,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 2,
      },
      footer: {
        style: "dark",
        logo: {
          alt: "Evolution API Logo",
          src: "img/brand/svg/logo-vertical-inverted.svg",
          href: "https://github.com/EvolutionAPI",
          width: 150,
          height: "auto",
        },
        copyright: `Copyright © ${new Date().getFullYear()} Evolution API. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.dracula,
        lightTheme: prismThemes.dracula,
        additionalLanguages: ["nginx", "yaml"],
      },
    }),
};

module.exports = config;
