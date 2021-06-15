'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attachment_file_name: {
        type: Sequelize.STRING
      },
      attachment_file_type: {
        type: Sequelize.STRING
      },
      attachment_issue_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'issues',
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
    await queryInterface.dropTable('attachments');
  }
};