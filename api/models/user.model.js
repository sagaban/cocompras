const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define(
    'user',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING, // VARCHAR(255)
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: [/^[a-zA-Z0-9!@#$%^&*_-]{8,255}$/m],
            msg:
              'Password must be 8 to 255 characters long and only supports characters, digits and "!@#$%^&*_-"'
          }
        }
      }
    },
    {
      instanceMethods: {
        validPassword(password) {
          return bcrypt.compareSync(password, this.password);
        }
      }
    }
    // {
    //   hooks: {
    //     beforeCount(options) {
    //       options.raw = true;
    //     }
    //   }
    // }
  );

  user.beforeCreate(function(user /*, options */) {
    return cryptPassword(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
      });
  });

  function cryptPassword(password) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        bcrypt.hash(password, salt, function(err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  }

  // todo.associate = function(models) {
  // eslint-disable-line no-unused-vars
  // Define associations here
  // See http://docs.sequelizejs.com/en/latest/docs/associations/
  // };
  return user;
};
