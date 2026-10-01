import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// Native flat configs (no FlatCompat) — the compat bridge was needed only
// for the pre-16 `extends: ['next/core-web-vitals', ...]` string form, and
// broke under ESLint 9.39 with a circular-JSON error inside
// @eslint/eslintrc's config validator when formatting eslint-plugin-react's
// newer flat `configs` object.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Plain Node entrypoint run directly by `node`, outside Next's
    // bundler/TS pipeline — CommonJS require() is the correct, simplest
    // choice here, not a stray import style to flag.
    files: ['scripts/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
