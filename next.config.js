module.exports = {
  webpack: config => {
    const conf = config;
    // Fixes npm packages that depend on `fs` module
    conf.node = {
      fs: 'empty',
    };

    return conf;
  },
};
