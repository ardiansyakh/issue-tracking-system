'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  assignment.init({
    assignment_issue_id: DataTypes.INTEGER,
    assignment_employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assignment',
  });

  assignment.associate = function (models) {
    assignment.belongsTo(models.issue, { foreignKey: 'assignment_issue_id' })
    assignment.belongsTo(models.employee, { foreignKey: 'assignment_employee_id' })
  }

  return assignment;
};