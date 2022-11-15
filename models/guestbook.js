const Sequelize = require('sequelize');

module.exports = class Guestbook extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Guestbook',
            tableName: 'Guestbooks',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Guestbook.hasMany(db.Post);
        db.Guestbook.belongsToMany(db.Guestbook, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.Guestbook.belongsToMany(db.Guestbook, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
        db.Guestbook.hasMany(db.Domain);
    }
};
