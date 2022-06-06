import { database } from 'config';
import { connect } from 'mongoose';

let connection:(typeof import('mongoose'));

const useMongo = async () => {
	connection = await connect(database);
};

export const disconnect = async () => {
	connection.disconnect();
};

useMongo();