'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  employee.init({
    employee_username: DataTypes.STRING,
    employee_password: DataTypes.STRING,
    employee_first_name: DataTypes.STRING,
    employee_last_name: DataTypes.STRING,
    employee_role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employee',
  });

  employee.associate = function (models) {
    employee.belongsTo(models.role, { foreignKey: 'employee_role_id' })
    employee.hasMany(models.assignment, { foreignKey: 'assignment_employee_id' })
    employee.hasMany(models.issue, { foreignKey: 'issue_solved_by' })
  }

  return employee;
};