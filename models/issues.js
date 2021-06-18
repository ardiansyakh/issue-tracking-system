'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  issue.init({
    issue_user_client_name: DataTypes.STRING,
    issue_user_client_email: DataTypes.STRING,
    issue_ticket_number: DataTypes.STRING,
    issue_subject: DataTypes.STRING,
    issue_desc: DataTypes.STRING,
    issue_priority: DataTypes.STRING,
    issue_status: DataTypes.STRING,
    issue_deadline: DataTypes.DATE,
    issue_category_id: DataTypes.INTEGER,
    issue_solved_by: DataTypes.INTEGER,
    issue_attachment_filename: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'issue',
  });

  issue.associate = function (models) {
    issue.hasMany(models.attachment, { foreignKey: 'attachment_issue_id' })
    issue.hasMany(models.assignment, { foreignKey: 'assignment_issue_id' })
    issue.belongsTo(models.category, { foreignKey: 'issue_category_id' })
    issue.belongsTo(models.employee, { foreignKey: 'issue_solved_by' })
  }


  return issue;
};