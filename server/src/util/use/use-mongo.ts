import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { database, isDev, isTest } from '@/config';

let mongo: MongoMemoryServer;

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

if (!isTest) useMongo();