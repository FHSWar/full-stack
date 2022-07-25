import { Optional } from 'sequelize';
import { AllowNull, Column, Is, Model, Table } from 'sequelize-typescript';

// 接口定义
interface IRole {
    id: number
    role: string
    description: string
    createdAt: Date
	updatedAt: Date
    deleteAt?: Date
}

// 表格自动生成的字段在这里Optional掉
interface IRoleCreationAttributes extends Optional<
    IRole,
    'id' | 'createdAt' | 'updatedAt' | 'deleteAt'
> { }

@Table({
	tableName: 'roles',
	timestamps: true, // 自动生成'createdAt' | 'updatedAt'
	paranoid: true // 自动生成'deleteAt'
})
class Role extends Model<
    IRole,
    IRoleCreationAttributes
> {
@AllowNull(false)
@Is(async function isNotDeleteUnique(value: string) {
	// @ts-ignore
	if (this.isNewRecord) { // 结合paranoid，间接实现部分索引
		const res = await Role.findAll({ where: { role: value } });
		if (res.length !== 0) throw new Error('同名角色只能有一个!');
	}
})
@Column
	declare role: string; // 没有declare关键字会报错

@AllowNull(false)
@Column
declare description: string;
}

// 先添加到到Sequelize实例,才能sync
sequelize.addModels([Role]);

export { Role, IRole };
