import { env } from 'process';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { database, DEV, TEST } from '@/config';

let mongo: MongoMemoryServer;

export const useMongo = async () => {
	mongoose.set('runValidators', true); // update时也进行规则校验

	let uri = database;

	switch (env.NODE_ENV) {
		case DEV:
			await mongoose.connect(database);
			break;
		case TEST:
			mongo = await MongoMemoryServer.create();
			uri = mongo.getUri();

			await mongoose.connect(uri);
			break;
		default:
			// do nothing
	}
};

export const closeMongo = async () => {
	switch (env.NODE_ENV) {
		case DEV:
			mongoose.connection.close();
			break;
		case TEST:
			// 不加if会报错
			if (mongo) mongo.stop();

			await mongoose.connection.close();
			break;
		default:
			// do nothing
	}
};

if (env.NODE_ENV !== TEST) useMongo();