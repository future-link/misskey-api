import {AlbumFolder} from '../../../models';
import {IUser, IAlbumFolder} from '../../../interfaces';

export default function move(user: IUser, folderId: string, destinationFolderId: string): Promise<Object> {
	'use strict';

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
				if (destinationFolderId !== null) {
					AlbumFolder.findOne({
						_id: destinationFolderId,
						user: user.id
					}, (destinationFolderIdFindErr: any, destinationFolder: IAlbumFolder) => {
						if (destinationFolderIdFindErr !== null) {
							reject(destinationFolderIdFindErr);
						} else if (folder === null) {
							reject('destination-folder-not-found');
						} else {
							folder.parent = destinationFolder.id;
							folder.save((saveErr: any, moved: IAlbumFolder) => {
								if (saveErr !== null) {
									return reject(saveErr);
								}
								resolve(moved.toObject());
							});
						}
					});
				} else {
					folder.parent = null;
					folder.save((saveErr: any, moved: IAlbumFolder) => {
						if (saveErr !== null) {
							return reject(saveErr);
						}
						resolve(moved.toObject());
					});
				}
			}
		});
	});
}
