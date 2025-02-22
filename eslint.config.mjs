import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Fixing ESLint issue by explicitly defining a parser
const eslintConfig = [
  {
    parser: "@babel/eslint-parser",
    extends: ["next/core-web-vitals"],
  },
];

export default eslintConfig;
