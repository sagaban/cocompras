const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const groceryLists = sequelizeClient.define(
    'groceryLists',
    {
      amount: {
        type: DataTypes.INTEGER, // VARCHAR(255)
        allowNull: false,
        defaultValue: 0
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
  groceryLists.associate = function(/* models */) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };
  return groceryLists;
};
