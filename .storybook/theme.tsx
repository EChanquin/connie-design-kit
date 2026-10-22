import { create } from "@storybook/theming/create";

// Connie brand mark: the lime C button from the Figma (16:1499), plus the wordmark.
const BRAND = `
<span style="display:flex;align-items:center;gap:10px;">
  <span style="width:30px;height:30px;border-radius:50%;background:#c4e860;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:17px;color:#050500;">C</span>
  <span style="display:flex;flex-direction:column;line-height:1.15;">
    <span style="font-weight:600;font-size:15px;color:#050500;">Connie</span>
    <span style="font-weight:400;font-size:11px;color:#666661;">Consumer Reports</span>
  </span>
</span>`;

export default create({
  base: "light",
  fontBase: '"CR-Averta", "Inter", system-ui, sans-serif',
  fontCode: '"Roboto Mono", monospace',

  brandTitle: BRAND,
  brandUrl: "https://connie-design-kit.vercel.app",
  brandTarget: "_blank",

  colorPrimary: "#00803e",
  colorSecondary: "#00803e",

  appBg: "#fafaf7",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#d8d9d4",
  appBorderRadius: 8,

  textColor: "#050500",
  textMutedColor: "#666661",
  textInverseColor: "#ffffff",

  barTextColor: "#666661",
  barSelectedColor: "#00803e",
  barHoverColor: "#00803e",
  barBg: "#ffffff",

  inputBg: "#ffffff",
  inputBorder: "#d8d9d4",
  inputTextColor: "#050500",
  inputBorderRadius: 8,
});
