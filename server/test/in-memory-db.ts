/* 从这个改的，改为import、export，根据mongoose6调整语法
https://javascript.plainenglish.io/unit-test-your-mongoose-model-using-jest-2daf2303c4bf
*/
import { connect, connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

export const setUp = async () => {
	mongo = await MongoMemoryServer.create();
	const url = mongo.getUri();

	await connect(url);
};

export const dropDatabase = async () => {
	if (mongo) {
		await connection.dropDatabase();
		await connection.close();
		await mongo.stop();
	}
};

export const dropCollections = async () => {
	if (mongo) {
		const collections = connection.collections;

		// eslint-disable-next-line guard-for-in
		for (const key in collections) {
			const collection = collections[key];
			// eslint-disable-next-line no-await-in-loop
			await collection.deleteMany({});
		}
	}
};