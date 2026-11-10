import localFont from "next/font/local";

export const fontProject = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    // only if i need italic:
    //
    // {
    //   path: '../assets/fonts/Satoshi-VariableItalic.woff2',
    //   weight: '300 900',
    //   style: 'italic',
    // },
  ],
  variable: "--font-project",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
