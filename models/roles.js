'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role.init({
    role_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
  });
<<<<<<< HEAD
  roles.hasMany =function(models){
    roles.belongsTo(models.employees, {foreignKey:'employee_role_id'})
  }
  return roles;
=======

  role.associate = function (models) {
    role.hasMany(models.employee, { foreignKey: 'employee_role_id' })
  }
  return role;
>>>>>>> master
};