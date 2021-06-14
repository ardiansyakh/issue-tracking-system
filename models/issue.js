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
    issue_subject: DataTypes.STRING,
    issue_desc: DataTypes.STRING,
    issue_attachment: DataTypes.STRING,
    issue_priority: DataTypes.STRING,
    issue_status: DataTypes.STRING,
    issue_deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'issue',
  });
  return issue;
};