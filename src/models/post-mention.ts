import { Schema, Connection, Document, Model } from 'mongoose';
import * as mongooseAutoIncrement from 'mongoose-auto-increment';

export default function postMention(db: Connection): Model<Document> {
	'use strict';

	mongooseAutoIncrement.initialize(db);

	const schema: Schema = new Schema({
		createdAt: { type: Date, required: true, default: Date.now },
		cursor: { type: Number },
		isRead: { type: Boolean, required: false, default: false },
		post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
		user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
	});

	if (!(<any>schema).options.toObject) {
		(<any>schema).options.toObject = {};
	}
	(<any>schema).options.toObject.transform = (doc: any, ret: any) => {
		ret.id = doc.id;
		delete ret._id;
		delete ret.__v;
	};

	// Auto increment
	schema.plugin(mongooseAutoIncrement.plugin, {
		model: 'PostMention',
		field: 'cursor'
	});

	return db.model('PostMention', schema, 'PostMentions');
}
