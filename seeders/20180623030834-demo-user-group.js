'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserGroup', [{
      ssoGrpId: 'JS',
      ssoGrpName: 'Job Seekers Group'
    }, {
      ssoGrpId: 'EM',
      ssoGrpName: 'Employees Group'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
