const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
// require('typeface-work-sans');
module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb(),
    react({
      html: {
        title: 'COVTest',
        // links: [
        //   {
        //     href: 'https://fonts.googleapis.com/css?family=Lato',
        //     rel: 'stylesheet',
        //   },
        // ],
      },
    }),
    jest(),
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
