const withTM = require('next-transpile-modules')(['@repo/ui']);

module.exports = withTM({
  reactStrictMode: true,
  experimental:{
    appDir:true
  }
});
