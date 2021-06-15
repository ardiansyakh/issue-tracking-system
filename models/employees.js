'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  employees.init({
    employee_username: DataTypes.STRING,
    employee_password: DataTypes.STRING,
    employee_first_name: DataTypes.STRING,
    employee_last_name: DataTypes.STRING,
    employee_role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employees',
  });
  employees.associate =function(models){
    employees.belongsTo(models.roles, {foreignKey:'employee_role_id'})
  }
  return employees;
};