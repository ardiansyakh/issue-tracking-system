'use strict';
const fs = require('fs')
let roles = JSON.parse(fs.readFileSync('./databases/roles.json', {encoding: 'utf-8'}))
roles = roles.map(role=>{
  return{
    ...role,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', roles, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"roles_id_seq"' , (SELECT MAX(id) FROM "roles"))`)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
