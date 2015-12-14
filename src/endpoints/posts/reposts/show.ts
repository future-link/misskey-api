import { Match } from 'powerful';
import { Repost } from '../../../models';
import { IUser, IRepost } from '../../../interfaces';
import serializeTimeline from '../../../core/serialize-timeline';
import populateAll from '../../../core/post-populate-all';

/**
 * 投稿のRepostを取得します
 * @param user API利用ユーザー
 * @param postId 対象の投稿のID
 * @param limit 取得するRepostの最大数
 * @param sinceCursor 取得するRepostを、設定されたカーソルよりも大きなカーソルを持つもののみに制限します
 * @param maxCursor 取得するRepostを、設定されたカーソルよりも小さなカーソルを持つもののみに制限します
 */
export default function(
	user: IUser,
	postId: string,
	limit: number = 10,
	sinceCursor: number = null,
	maxCursor: number = null
): Promise<Object[]> {
	'use strict';

	return new Promise<Object[]>((resolve, reject) => {

		const query = Object.assign({
			post: postId
		}, new Match<void, any>(null)
			.when(() => sinceCursor !== null, () => {
				return { cursor: { $gt: sinceCursor } };
			})
			.when(() => maxCursor !== null, () => {
				return { cursor: { $lt: maxCursor } };
			})
			.getValue({})
		);

		Repost
		.find(query)
		.sort('-createdAt')
		.limit(limit)
		.exec((err: any, reposts: IRepost[]) => {
			if (err !== null) {
				return reject(err);
			} else if (reposts.length === 0) {
				return resolve([]);
			}

			// すべてpopulateする
			Promise.all(reposts.map(repost => populateAll(repost)))
			.then(populatedReposts => {
				// 整形
				serializeTimeline(populatedReposts, user).then(serializedReposts => {
					resolve(serializedReposts);
				}, (serializeErr: any) => {
					reject(serializeErr);
				});
			}, (populatedErr: any) => {
				reject(populatedErr);
			});
		});
	});
}
