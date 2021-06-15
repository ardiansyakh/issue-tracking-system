'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log_assignment_employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  log_assignment_employee.init({
    lae_issue_id: DataTypes.INTEGER,
    lae_employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'log_assignment_employee',
  });
  return log_assignment_employee;
};