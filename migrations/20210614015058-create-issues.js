'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      issue_user_client_name: {
        type: Sequelize.STRING
      },
      issue_user_client_email: {
        type: Sequelize.STRING
      },
      issue_subject: {
        type: Sequelize.STRING
      },
      issue_desc: {
        type: Sequelize.STRING
      },
      issue_priority: {
        type: Sequelize.STRING
      },
      issue_status: {
        type: Sequelize.STRING
      },
      issue_deadline: {
        type: Sequelize.DATE
      },
      issue_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('issues');
  }
};