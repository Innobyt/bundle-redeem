'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/redemption-dev'
  },
  // MongoDB connection options
  mongo1: {
    uri: 'mongodb://localhost/gamerepo-dev'
  },  
  // MongoDB connection options
  mongo2: {
    uri: 'mongodb://localhost/gamebundle-dev'
  },
  // MongoDB connection options
  mongo3: {
    uri: 'mongodb://localhost/gameredemption-dev'
  },
  seedDB: true
};
