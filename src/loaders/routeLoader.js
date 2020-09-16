import Routes from '../routes';
export default function routeLoader(app){
    Routes.forEach((route) => {
        app[route.method](route.route, (req, res, next) => {
            const result = new route.controller()[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then((result) => (result ? res.json(result) : undefined));
            } else if (result) {
                res.json(...result);
            }
    });
}

