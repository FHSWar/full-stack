export const onlyOneNotDelete = {
	index: {
		unique: true,
		partialFilterExpression: { isDelete: { $eq: false } }
	}
};