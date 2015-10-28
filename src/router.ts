import * as express from 'express';

interface IRoute {
	method: string;
	endpoint: string;
}

const routing: Array<IRoute> = [
	{method: 'get', endpoint: 'login'},
	{method: 'get', endpoint: 'screenname-available'},
	{method: 'get', endpoint: 'timeline'},
	{method: 'post', endpoint: 'account/create'},
	{method: 'get', endpoint: 'users/show'},
	{method: 'post', endpoint: 'statuses/create'}
];

export default function(app: express.Express): void {
	'use strict';
	console.log('Init router');

	app.get('/', (req: express.Request, res: express.Response) => {
		res.status(200).send('Rain tree sketch');
	});

	routing.forEach((route: IRoute) => {
		(<any>app)[route.method]('/' + route.endpoint, require(`${__dirname}/restHandlers/${route.endpoint}`));
	});
}