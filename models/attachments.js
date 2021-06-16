'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attachment.init({
    attachment_file_name: DataTypes.STRING,
    attachment_file_type: DataTypes.STRING,
    attachment_issue_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'attachment',
  });

  attachment.associate = function (models) {
    attachment.belongsTo(models.issue, { foreignKey: 'attachment_issue_id' })
  }
  return attachment;
};