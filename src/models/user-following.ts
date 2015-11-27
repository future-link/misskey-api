import { Schema, Connection, Document, Model } from 'mongoose';
import * as mongooseAutoIncrement from 'mongoose-auto-increment';

export default function userFollowing(db: Connection): Model<Document> {
	'use strict';

	mongooseAutoIncrement.initialize(db);

	const schema: Schema = new Schema({
		createdAt: { type: Date, required: true, default: Date.now },
		cursor: { type: Number },
		followee: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		follower: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
	});

	// Auto increment
	schema.plugin(mongooseAutoIncrement.plugin, {
		model: 'UserFollowing',
		field: 'cursor'
	});

	return db.model('UserFollowing', schema, 'UserFollowings');
}
