import { IApplication, IUser } from '../../../interfaces';
import del from '../../../endpoints/album/folders/delete';

export default function(
	app: IApplication,
	user: IUser,
	req: any,
	res: any
): void {
	'use strict';

	del(
		user,
		req.payload['folder-id']
	).then(() => {
		res({
			status: 'success'
		});
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
