interface IClientRoutes {
    role: string
    routesJson: string
    createTime: Date
	updateTime: Date
    isDelete: boolean
}

const ClientRoutes = model<IClientRoutes>('ClientRoutes', new Schema<IClientRoutes>({
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role'
	},
	routesJson: {
		type: String,
		required: true
	},
	createTime: {
		type: Date,
		required: true,
		default: Date.now
	},
	updateTime: {
		type: Date,
		required: true,
		default: Date.now
	},
	isDelete: {
		type: Boolean,
		required: true,
		default: false
	}
}));

export { IClientRoutes, ClientRoutes };