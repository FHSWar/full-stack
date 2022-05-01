import { database } from 'config';
import { connect } from 'mongoose';

export const useMongo = async () => {
	await connect(database);
};
