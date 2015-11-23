import {AlbumFolder} from '../../../models';
import {IUser, IAlbumFolder} from '../../../interfaces';

export default function updateColor(user: IUser, folderId: string, color: string): Promise<Object> {
	'use strict';

	if (!/^#[a-fA-F0-9]{6}$/.exec(color)) {
		return <Promise<any>>Promise.reject('invalid-format');
	}

	return new Promise<Object>((resolve, reject) => {
		AlbumFolder.findOne({
			_id: folderId,
			user: user.id
		}, (folderFindErr: any, folder: IAlbumFolder) => {
			if (folderFindErr !== null) {
				reject(folderFindErr);
			} else if (folder === null) {
				reject('folder-not-found');
			} else {
				folder.color = color;
				folder.save((saveErr: any, recolored: IAlbumFolder) => {
					if (saveErr !== null) {
						return reject(saveErr);
					}
					resolve(recolored.toObject());
				});
			}
		});
	});
}
