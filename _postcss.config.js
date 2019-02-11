module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }),
    cssnano({ discardComments: { removeAll: true } }),
  }
}
