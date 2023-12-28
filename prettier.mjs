/** @type {import("./types").Config} */
export default {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@online-deployment/(.*)$",
    "",
    "^~/",
    "^[../]",
    "^[./]",
  ],
};
