# Air Hound

[![Build Status](https://travis-ci.org/540co/epa-rfi.svg?branch=develop)](https://travis-ci.org/540co/epa-rfi)
[![Test Coverage](https://codeclimate.com/github/540co/epa-rfi/badges/coverage.svg)](https://codeclimate.com/github/540co/epa-rfi/coverage)
[![Code Climate](https://codeclimate.com/github/540co/epa-rfi/badges/gpa.svg)](https://codeclimate.com/github/540co/epa-rfi)



Front end development for the EPA RFI (Air Hound).

Key Links     | URLs
------------- | -------------
Air Hound app | [https://airhound.540.co](https://airhound.540.co)
API Documentation | [https://airhound.540.co/api-docs/](https://airhound.540.co/api-docs/)
Backend repo | [https://github.com/540co/epa-rfi-backend](https://github.com/540co/epa-rfi-backend)

## Getting started

Clone repo.

#### Install dependencies

From within the cloned folder `epa-rfi` run:

Node dependencies

```
npm install
```

Bower dependencies
```
bower install
```
#### Configure application

From within the cloned folder `epa-rfi` run:

Edit `./src/app/app.config.js` and update accordingly.


#### Configure Google Analytics

From within the cloned folder `epa-rfi` run:

Edit `./src/assets/scripts/ga.js` and update accordingly.

#### Gulp tasks

- `gulp` or `gulp build` to build an optimized version of your application in /dist
- `gulp serve` to launch a browser sync server on your source files
- `gulp serve:dist` to launch a server on your optimized application
- `gulp test` to launch your unit tests with Karma
- `gulp test:auto` to launch your unit tests with Karma in watch mode
- `gulp protractor` to launch your e2e tests with Protractor
- `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files
