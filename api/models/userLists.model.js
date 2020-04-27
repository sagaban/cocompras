const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userLists = sequelizeClient.define(
    'userLists',
    {
      name: {
        type: DataTypes.STRING, // VARCHAR(255)
        allowNull: false,
        unique: true
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );
  userLists.associate = function(/* models */) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };
  return userLists;
};
