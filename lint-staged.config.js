module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'tsc --noEmit --pretty',
  '*.json': ['prettier --write'],
  '**/*.{css,scss}': [
    'stylelint "**/*.{css,scss}" --fix',
    'prettier --write',
    'stylelint "**/*.{css,scss}"',
  ],
};
