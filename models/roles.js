'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  roles.init({
    role_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  roles.hasMany =function(models){
    roles.belongsTo(models.employees, {foreignKey:'employee_role_id'})
  }
  return roles;
};