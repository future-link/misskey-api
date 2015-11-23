import {AlbumFile, AlbumFolder} from '../../../models';
import {IUser, IAlbumFile, IAlbumFolder} from '../../../interfaces';
import fileDel from '../files/delete';

export default function deleteFolder(user: IUser, folderId: string = null): Promise<void> {
	'use strict';

	return new Promise<void>((resolve, reject) => {
		AlbumFolder.findOne({
			_id: folderId,
			user: user.id
		}, (folderFindErr: any, folder: IAlbumFolder) => {
			if (folderFindErr !== null) {
				reject(folderFindErr);
			} else if (folder === null) {
				reject('folder-not-found');
			} else {
				AlbumFile.find({
					user: user.id, folder: folderId
				}, (filesFindErr: any, files: IAlbumFile[]) => {
					if (filesFindErr !== null) {
						return reject(filesFindErr);
					}
					Promise.all(files.map((file: IAlbumFile) => {
						return fileDel(user, file.id);
					})).then(() => {
						folder.remove((removeErr: any) => {
							if (removeErr !== null) {
								return reject(removeErr);
							}
							resolve();
						});
					}, (fileDelErr: any) => {
						reject(fileDelErr);
					});
				});
			}
		});
	});
}
