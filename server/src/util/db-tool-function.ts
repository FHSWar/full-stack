import { Role } from '@/model/role';

export const findRoleDocArr = async (roles: string[]) => {
	const roleArr = roles.map((role) => ({ role }));

	// 再次强调：这里有隐式的await
	return Role.find({ $or: roleArr, isDelete: false });
};