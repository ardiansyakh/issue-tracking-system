'use strict';
const fs = require('fs')
let employees = JSON.parse(fs.readFileSync('./databases/employees.json', {encoding:'utf-8'}))

employees = employees.map(employee =>{
  return{
    ...employee,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('employees', employees, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"employees_id_seq"' , (SELECT MAX(id) FROM "employees"))`)
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
    await queryInterface.bulkDelete('employees')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
