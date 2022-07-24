// knex的knex.schema.createTableIfNotExists会叫用户别用，说是不够健壮，于是自己封装个
type CreateTable = typeof knex.schema.createTable
type CreateTableParams = Parameters<CreateTable>;

const createTableIfNotExists = async (
	tableName: CreateTableParams[0],
	createTableBuilder: CreateTableParams[1]
) => {
	// await knex.schema.hasTable(tableName);返回空对象，离大谱！
	const raw = await knex.raw(
		`SELECT count(*) 
		FROM information_schema.tables
		WHERE table_name = '${tableName}'`
	);
	const isExist = raw[0][0].count > 0;

	if (!isExist) await knex.schema.createTable(tableName, createTableBuilder);
};

// https://stackoverflow.com/questions/56894123/
// how-to-prevent-knex-js-from-running-a-query-object-when-returning-it-from-an-asy
const getQueryBuilder = <T>(tableName: string) => ({ builder: knex<T>(tableName) });

export const buildModel = async <T>(
	tableName: CreateTableParams[0],
	createTableBuilder: CreateTableParams[1]
) => {
	createTableIfNotExists(tableName, createTableBuilder);
	return getQueryBuilder<T>(tableName);
};