import { List, Match } from 'powerful';
const isEmpty = List.isEmpty;
import {UserFollowing} from '../../models';
import {IUser, IUserFollowing} from '../../interfaces';

/**
 * 対象ユーザーのフォロワーの一覧を取得します。
 * @param user 対象ユーザー
 * @param limit 取得するユーザーの最大数
 * @param sinceCursor 取得するユーザーを、設定されたカーソルよりも大きなカーソルを持つもののみに制限します
 * @param maxCursor 取得するユーザーを、設定されたカーソルよりも小さなカーソルを持つもののみに制限します
 */
export default function(user: IUser, limit: number = 30, sinceCursor: number = null, maxCursor: number = null)
		: Promise<Object[]> {
	'use strict';
	return new Promise<Object[]>((resolve, reject) => {
		const query = Object.assign({
			followee: user.id
		}, new Match<void, any>(null)
			.when(() => sinceCursor !== null, () => {
				return { cursor: { $gt: sinceCursor } };
			})
			.when(() => maxCursor !== null, () => {
				return { cursor: { $lt: maxCursor } };
			})
			.getValue({})
		);
		UserFollowing
			.find(query)
			.sort('-createdAt')
			.limit(limit)
			.populate('follower')
			.exec((err: any, userFollowings: IUserFollowing[]) => {
				if (err === null) {
					const followers: any[] = !isEmpty(userFollowings)
						? userFollowings.map((userFollowing) => (<IUser>userFollowing.follower).toObject())
						: [];
					resolve(followers);
				} else {
					reject(err);
				}
			});
	});
};
