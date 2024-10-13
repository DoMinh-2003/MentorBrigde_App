const {
  withNativeWind: withNativeWind
} = require("nativewind/metro");

const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withNativeWind(defaultConfig, { input: './global.css' });
