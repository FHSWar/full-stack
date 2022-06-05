import { database } from 'config';
import { connect } from 'mongoose';

const useMongo = async () => {
	await connect(database);
};

useMongo();