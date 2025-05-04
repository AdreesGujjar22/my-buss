'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Enable uuid-ossp so uuid_generate_v4() exists
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'DROP EXTENSION IF EXISTS "uuid-ossp";'
    );
  }
};
