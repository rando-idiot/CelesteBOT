// Instantiates a connection to the local database and defines models, all using Sequelize

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = sequelize.define('User', {
    userId: {type: Sequelize.STRING, primaryKey: true, unique: true},
    displayName: {type: Sequelize.STRING, allowNull: false},
    badeline: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    ex: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    granny: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    madeline: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    madeline_mirror: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    madeline_phone: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    mom: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    mom_phone: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    oshiro: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    theo: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
    theo_mirror: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
});

const Guilds = sequelize.define('Guild', {
    guildId: {type: Sequelize.STRING, primaryKey: true, unique: true},
    name: {type: Sequelize.STRING, allowNull: false},
    webhook: {type: Sequelize.BOOLEAN, defaultValue: 0, allowNull: false},
    webhookId: {type: Sequelize.STRING, defaultValue: null},
});

module.exports = {
    Users: Users,
    Guilds: Guilds,
};