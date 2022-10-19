module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './',
        alias: {
          '@components': './components',
          '@config': './config',
          '@context': './context',
          '@lib': './lib',
        },
      },
    ],
  ],
}
