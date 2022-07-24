import { buildModel } from './validator/build-model';

interface IRole {
    role: string
    description: string
    is_delete: boolean
    created_at: Date
	updated_at: Date
}

export const RoleSQL = buildModel<IRole>('roles', (table) => {
	table.increments('id');
	table.string('role').notNullable().unique();
	table.string('description').notNullable();
	table.boolean('is_delete').defaultTo(false);
	table.timestamps(true, true);
});
