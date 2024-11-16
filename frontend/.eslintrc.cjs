module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
	  "eslint:recommended",
	  "plugin:react/recommended",
	  "plugin:react/jsx-runtime",
	  "plugin:react-hooks/recommended",
	  "plugin:prettier/recommended", // Integrates Prettier
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh", "prettier"],
	rules: {
	  "react/prop-types": "off",
	  "react/jsx-no-target-blank": "off",
	  "react-hooks/exhaustive-deps": "warn", // Ensure hook dependencies are correct
	  "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
	  "prettier/prettier": "error", // Treat Prettier errors as ESLint errors
	},
  };
  