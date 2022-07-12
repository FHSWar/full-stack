import { Types } from 'mongoose';
import { Role } from '@/model/role';

export const rolesNoEmpty = async (arr: Types.ObjectId[]) => {
	const roleDocArr = await Role.find({ $or: arr.map((_id) => ({ _id })) });

	return roleDocArr.filter(({ isDelete }) => !isDelete).length > 0;
};