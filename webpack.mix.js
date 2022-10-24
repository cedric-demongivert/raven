const mix = require('laravel-mix')
//const webpack = require('webpack')
const pckg = require('./package.json')

const externals = []

for (const name in pckg.dependencies) {
  externals.push(new RegExp(`^${name}(\\/.+)?$`))
}

mix.ts('./sources/index', './distribution')
   .copy('LICENSE.md', 'distribution')
   .copy('package.json', 'distribution')
   .copy('README.md', 'distribution')
   .setPublicPath('distribution')
   .disableNotifications()
   .webpackConfig({
     'externals': externals,
     'externalsPresets': {
       'node': true
     },
     'optimization': {
    		'minimize': false
     },
     'output': {
       'library': pckg.name,
       'libraryTarget': 'umd',
       'globalObject': 'this' // webpack bug
     },
     'node': {
       '__dirname': true
     },
     /*'plugins': [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
      ]*/
   })