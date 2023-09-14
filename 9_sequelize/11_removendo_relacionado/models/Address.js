const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = require("./User"); // requisitando a tabela user

// cria a tabela adress
const Address = db.define("Address", {
  street: {
    type: DataTypes.STRING,
    required: true,
  },
  number: {
    type: DataTypes.STRING,
    required: true,
  },
  city: {
    type: DataTypes.STRING,
    required: true,
  },
});

// criacao da relacao
User.hasMany(Address); // um usuario tem mais de um endereco
Address.belongsTo(User); // um endereco pertence a um usuario

module.exports = Address;
