import { env } from 'process';
import { connect, connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { database, DEV, TEST } from '@/config';

let mongo: MongoMemoryServer;

export const useMongo = async () => {
	let uri = database;

	switch (env.NODE_ENV) {
		case DEV:
			await connect(database);
			break;
		case TEST:
			mongo = await MongoMemoryServer.create();
			uri = mongo.getUri();

			await connect(uri);
			break;
		default:
			// do nothing
	}
};

export const closeMongo = async () => {
	switch (env.NODE_ENV) {
		case DEV:
			connection.close();
			break;
		case TEST:
			// 不加if会报错
			if (mongo) mongo.stop();

			await connection.close();
			break;
		default:
			// do nothing
	}
};

if (env.NODE_ENV !== TEST) useMongo();