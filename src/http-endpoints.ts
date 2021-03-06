const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

export default [
	{ name: 'login' },

	{ name: 'screenname/available' },

	{ name: 'account/create' },
	{ name: 'account/show',
		login: true },
	{ name: 'account/name/update',
		login: true,
		limitDuration: day,
		limitMax: 50,
		denySuspended: true },
	{ name: 'account/url/update',
		login: true,
		limitDuration: day,
		limitMax: 50,
		denySuspended: true },
	{ name: 'account/avatar/update',
		login: true,
		limitDuration: day,
		limitMax: 50,
		denySuspended: true },
	{ name: 'account/banner/update',
		login: true,
		limitDuration: day,
		limitMax: 50,
		denySuspended: true },
	{ name: 'account/comment/update',
		login: true,
		limitDuration: day,
		limitMax: 50,
		denySuspended: true },
	{ name: 'account/location/update',
		login: true,
		limitDuration: day,
		limitMax: 50,
		denySuspended: true },
	{ name: 'account/tags/update',
		login: true,
		limitDuration: day,
		limitMax: 50,
		denySuspended: true },

	{ name: 'notifications/show',
		login: true },
	{ name: 'notifications/timeline',
		login: true },
	{ name: 'notifications/delete-all',
		login: true },
	{ name: 'notifications/unread/count',
		login: true },

	{ name: 'users/show' },
	{ name: 'users/follow',
		login: true,
		limitDuration: hour,
		limitMax: 100,
		minInterval: 0.5 * second,
		denySuspended: true },
	{ name: 'users/unfollow',
		login: true,
		limitDuration: hour,
		limitMax: 100,
		minInterval: 0.5 * second,
		denySuspended: true },
	{ name: 'users/following' },
	{ name: 'users/followers' },
	{ name: 'users/recommendations',
		login: true },
	{ name: 'users/search' },
	{ name: 'users/search-by-screen-name' },

	{ name: 'posts/timeline',
		login: true,
		limitDuration: 10 * minute,
		limitMax: 100 },
	{ name: 'posts/user-timeline' },
	{ name: 'posts/mentions/show',
		login: true,
		limitDuration: 10 * minute,
		limitMax: 100 },
	{ name: 'posts/mentions/delete-all',
		login: true },
	{ name: 'posts/mentions/unread/count',
		login: true },
	{ name: 'posts/show' },
	{ name: 'posts/talk/show' },
	{ name: 'posts/replies/show' },
	{ name: 'posts/timeline/unread/count',
		login: true },
	{ name: 'posts/create',
		login: true,
		limitDuration: hour,
		limitMax: 120,
		minInterval: 3 * second,
		imitKey: 'post',
		denySuspended: true },
	{ name: 'posts/reply',
		login: true,
		limitDuration: hour,
		limitMax: 120,
		minInterval: 3 * second,
		limitKey: 'post',
		denySuspended: true },
	{ name: 'posts/repost',
		login: true,
		limitDuration: hour,
		limitMax: 120,
		minInterval: 0.5 * second,
		limitKey: 'post',
		denySuspended: true },
	{ name: 'posts/like',
		login: true,
		limitDuration: hour,
		limitMax: 120,
		denySuspended: true },
	{ name: 'posts/unlike',
		login: true,
		limitDuration: hour,
		limitMax: 120,
		denySuspended: true },
	{ name: 'posts/search' },
	{ name: 'posts/likes/show' },
	{ name: 'posts/reposts/show' },

	{ name: 'talks/history/show',
		login: true,
		limitDuration: hour,
		limitMax: 1000 },
	{ name: 'talks/messages/unread/count',
		login: true },
	{ name: 'talks/messages/say',
		login: true,
		limitDuration: hour,
		limitMax: 120,
		minInterval: second,
		denySuspended: true },
	{ name: 'talks/messages/show',
		login: true,
		limitDuration: hour,
		limitMax: 1000 },
	{ name: 'talks/messages/read',
		login: true },
	{ name: 'talks/messages/stream',
		login: true,
		limitDuration: hour,
		limitMax: 1000 },
	{ name: 'talks/messages/delete',
		login: true,
		limitDuration: hour,
		limitMax: 100,
		denySuspended: true },
	{ name: 'talks/group/create',
		login: true,
		limitDuration: day,
		limitMax: 30,
		denySuspended: true },
	{ name: 'talks/group/show',
		login: true },
	{ name: 'talks/group/members/invite',
		login: true,
		limitDuration: day,
		limitMax: 30,
		denySuspended: true },
	{ name: 'talks/group/invitations/show',
		login: true },
	{ name: 'talks/group/invitations/accept',
		login: true,
		denySuspended: true },
	{ name: 'talks/group/invitations/decline',
		login: true,
		denySuspended: true },

	{ name: 'album/files/upload',
		login: true,
		limitDuration: hour,
		limitMax: 100,
		denySuspended: true },
	{ name: 'album/files/show',
		login: true },
	{ name: 'album/files/list',
		login: true },
	{ name: 'album/files/stream',
		login: true },
	{ name: 'album/files/move',
		login: true },
	{ name: 'album/files/rename',
		login: true,
		denySuspended: true },
	{ name: 'album/files/delete',
		login: true,
		denySuspended: true },
	{ name: 'album/files/update-tag',
		login: true,
		denySuspended: true },
	{ name: 'album/files/add-tag',
		login: true,
		denySuspended: true },
	{ name: 'album/files/remove-tag',
		login: true,
		denySuspended: true },
	{ name: 'album/files/find-by-tag',
		login: true,
		denySuspended: true },
	{ name: 'album/folders/create',
		login: true,
		limitDuration: hour,
		limitMax: 50,
		denySuspended: true },
	{ name: 'album/folders/list',
		login: true },
	{ name: 'album/folders/show',
		login: true },
	{ name: 'album/folders/move',
		login: true,
		denySuspended: true },
	{ name: 'album/folders/rename',
		login: true,
		denySuspended: true },
	{ name: 'album/tags/create',
		login: true,
		limitDuration: hour,
		limitMax: 30,
		denySuspended: true },
	{ name: 'album/tags/list',
		login: true },
	{ name: 'album/tags/recolor',
		login: true },
	{ name: 'album/tags/rename',
		login: true,
		denySuspended: true },
	{ name: 'album/tags/delete',
		login: true,
		denySuspended: true },

	{ name: 'hashtags/search' },
	{ name: 'hashtags/trend/show' }
];
