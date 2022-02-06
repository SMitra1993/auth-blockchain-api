import os from 'os';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

import { User } from './models/user-model';

const sequelize = new Sequelize('auth-api-metamask-db', '', undefined, {
	dialect: 'sqlite',
	storage: path.join(os.tmpdir(), 'db.sqlite'),
	logging: false,
});

// Init all models
User.init(
	{
		nonce: {
			allowNull: false,
			type: DataTypes.INTEGER.UNSIGNED, // SQLITE will use INTEGER
			defaultValue: (): number => Math.floor(Math.random() * 10000), // Initialize with a random nonce
		},
		publicAddress: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: { isLowercase: true },
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		modelName: 'user',
		sequelize, // This bit is important
		timestamps: false,
	}
);

// Create new tables
sequelize.sync();

export { sequelize };
