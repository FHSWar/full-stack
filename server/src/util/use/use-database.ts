import Redis from 'ioredis';
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize-typescript';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { database, isDev, isTest } from '@/config';

let mongo: MongoMemoryServer;

export const closeMongo = async () => {
	switch (true) {
		case isDev:
			mongoose.connection.close();
			break;
		case isTest:
			// 不加if会报错
			if (mongo) mongo.stop();

			await mongoose.connection.close();
			break;
		default:
		// do nothing
	}
};

export const useMysql = () => {
	// sequelize-typescript的创建连接方式，和sequelize稍有区别
	const sequelize = new Sequelize({
		database: 'training_hall',
		dialect: 'mysql',
		username: 'root',
		password: '',
		timezone: '+08:00'
	});

	sequelize.sync(); // 使所有model生效，不sync不能CRUD
	global.sequelize = sequelize;
};

export const useMongo = async () => {
	mongoose.set('runValidators', true); // update时也进行规则校验

	let uri = database;

	switch (true) {
		case isDev:
			await mongoose.connect(database);
			break;
		case isTest:
			mongo = await MongoMemoryServer.create();
			uri = mongo.getUri();

			await mongoose.connect(uri);
			break;
		default:
		// do nothing
	}
};

export const useRedis = () => {
	global.redis = new Redis();
};
