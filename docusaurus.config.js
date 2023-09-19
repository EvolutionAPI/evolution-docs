// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/vsLight");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

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

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
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
          { to: "/blog", label: "Blog", position: "left" },
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://github.com/EvolutionAPI/doc-evolution-api",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      docs: {
        sidebar: {
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
        // links: [
        //   {
        //     title: "Community",
        //     html: {},
        //     items: [
        //       {
        //         label: "Discord",
        //         href: "https://evolution-api.com/opensource-whatsapp-api/",
        //       },
        //       {
        //         label: "WhatsApp Group",
        //         href: "https://evolution-api.com/opensource-whatsapp-api/",
        //       },
        //     ],
        //   },
        //   {
        //     title: "More",
        //     items: [
        //       {
        //         label: "Blog",
        //         to: "/blog",
        //       },
        //       {
        //         label: "GitHub",
        //         href: "https://github.com/EvolutionAPI/evolution-api",
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} Evolution API. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["nginx", "yaml"],
      },
    }),
};

module.exports = config;
