module.exports = function (api) {
   api.cache(true);
   const plugins = [];

   plugins.push('@babel/plugin-proposal-export-namespace-from','react-native-worklets/plugin',)
   return {
      presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
      plugins,
   };
};
