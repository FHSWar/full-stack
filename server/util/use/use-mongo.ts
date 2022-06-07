import { connect } from 'mongoose';
import { env } from 'process';
import { database } from 'config';

let connection:(typeof import('mongoose'));

const useMongo = async () => {
	if (env.NODE_ENV === 'test') return;
	connection = await connect(database);
};

export const disconnect = async () => {
	if (env.NODE_ENV === 'test') return;
	connection.disconnect();
};

useMongo();