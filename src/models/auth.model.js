'use strict'

module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  })

  Auth.prototype.toJSON = function() {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return Auth
}
