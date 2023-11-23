/** @type {import('next').NextConfig} */
const nextConfig = {}

// const withNextIntl = require('next-intl/plugin')(
//   // This is the default (also the `src` folder is supported out of the box)
//   './i18n.ts'
// );

const withNextIntl = require('next-intl/plugin')();

 
module.exports = withNextIntl(nextConfig)
