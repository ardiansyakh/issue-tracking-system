'use strict';
const fs = require('fs')
let categories = JSON.parse(fs.readFileSync('./databases/categories.json', {encoding:'utf-8'}))

categories = categories.map(categorie=>{
  return{
    ...categorie,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', categories,{})
    await queryInterface.sequelize.query(`
    SELECT setval('categories_id_seq' , (SELECT MAX(id) FROM "categories"))`)
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
    queryInterface.bulkDelete('categories')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
