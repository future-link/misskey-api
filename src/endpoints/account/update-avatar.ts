import {AlbumFile} from '../../models';
import {IUser, IAlbumFile} from '../../interfaces';

export default function updateIcon(user: IUser, fileId: string): Promise<Object> {
	'use strict';

	return new Promise<Object>((resolve, reject) => {
		AlbumFile.findById(fileId, (findErr: any, file: IAlbumFile) => {
			if (findErr !== null) {
				reject(findErr);
			} else if (file === null) {
				reject('file-not-found');
			} else if (file.user.toString() !== user.id) {
				reject('file-not-found');
			} else {
				user.avatar = file.id;
				user.avatarPath = file.serverPath;
				user.save((saveErr: any, saved: IUser) => {
					if (saveErr !== null) {
						reject(saveErr);
					} else {
						resolve(saved.toObject());
					}
				});
			}
		});
	});
}