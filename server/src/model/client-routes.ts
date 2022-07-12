import { model, Schema, Types } from 'mongoose';
import { onlyOneNotDelete } from '@/util';

interface IClientRoutes {
    role: Types.ObjectId
    routesJson: string
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
}

const ClientRoutes = model<IClientRoutes>('client_routes', new Schema<IClientRoutes>(
	{
		role: {
			type: Schema.Types.ObjectId,
			ref: 'roles',
			required: true,
			...onlyOneNotDelete
		},
		routesJson: {
			type: String,
			required: true
		},
		isDelete: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
));

export { IClientRoutes, ClientRoutes };