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

  role.associate = function (models) {
    role.hasMany(models.employee, { foreignKey: 'employee_role_id' })
  }
  return role;
};