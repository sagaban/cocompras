// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const groceries = sequelizeClient.define(
    'groceries',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
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

  groceries.associate = function(models) {
    groceries.belongsToMany(models.userLists, {
      through: models.groceryLists
    });
  };

  return groceries;
};
