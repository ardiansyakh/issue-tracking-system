'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issue_attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  issue_attachment.init({
    ia_issue_id: DataTypes.STRING,
    ia_attachment_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'issue_attachment',
  });
  return issue_attachment;
};