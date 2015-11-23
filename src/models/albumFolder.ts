import * as mongoose from 'mongoose';
// import mongooseAutoIncrement from 'mongoose-auto-increment';
const mongooseAutoIncrement: any = require('mongoose-auto-increment');
// import config from '../config';

/* tslint:disable:variable-name */
const Schema = mongoose.Schema;

export default function albumFilder(db: mongoose.Connection): mongoose.Model<mongoose.Document> {
	'use strict';

	mongooseAutoIncrement.initialize(db);

	const schema: mongoose.Schema = new Schema({
		createdAt: { type: Date, required: true, default: Date.now },
		color: { type: String, required: true },
		cursor: { type: Number },
		name: { type: String, required: false, default: '' },
		parent: { type: Schema.Types.ObjectId, required: false, default: null, ref: 'AlbumFolder' },
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
		model: 'AlbumFolder',
		field: 'cursor'
	});

	return db.model('AlbumFolder', schema, 'AlbumFolders');
}
