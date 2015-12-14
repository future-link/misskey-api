import {AlbumFile} from '../../../models';
import {IUser, IAlbumFile} from '../../../interfaces';

/**
 * ユーザーのBannerを更新します
 * @param user: API利用ユーザー
 * @param fileId: Bannerに使用するファイルのID
 */
export default function(user: IUser, fileId: string): Promise<Object> {
	'use strict';

	return new Promise<Object>((resolve, reject) => {
		AlbumFile.findById(fileId, (findErr: any, file: IAlbumFile) => {
			if (findErr !== null) {
				return reject(findErr);
			} else if (file === null) {
				return reject('file-not-found');
			} else if (file.user.toString() !== user.id.toString()) {
				return reject('file-not-found');
			} else if (file.isDeleted) {
				return reject('file-not-found');
			}
			user.banner = file.id;
			user.bannerPath = file.serverPath;
			user.save((saveErr: any, saved: IUser) => {
				if (saveErr !== null) {
					reject(saveErr);
				} else {
					resolve(saved.toObject());
				}
			});
		});
	});
}
