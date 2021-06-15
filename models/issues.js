'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  issues.init({
    issues_user_client_name: DataTypes.STRING,
    issues_user_client_email: DataTypes.STRING,
    issues_subject: DataTypes.STRING,
    issues_desc: DataTypes.STRING,
    issues_priority: DataTypes.STRING,
    issues_status: DataTypes.STRING,
    issues_deadline: DataTypes.DATE,
    issues_category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'issues',
  });
  return issues;
};