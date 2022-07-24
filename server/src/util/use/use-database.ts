import Redis from 'ioredis';
import knexConnector from 'knex';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { database, isDev, isTest } from '@/config';
import { camelize } from '@/util';

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

export const useMySql = () => {
	const knex = knexConnector({
		client: 'mysql2',
		connection: {
			host: '127.0.0.1',
			port: 3306,
			user: 'root',
			database: 'training_hall'
		},
		// 数据库规范是snake_case，js规范是camelCase，两边都要遵守，这里转一下
		postProcessResponse: (result) => camelize(result)
	});
	// knex.schema.hasTable('roles',)
	global.knex = knex;
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
