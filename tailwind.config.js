module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './layout/**/*.tsx',
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
