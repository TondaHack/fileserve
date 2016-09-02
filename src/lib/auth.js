import basicAuth from 'basic-auth';
import minimist from 'minimist';
import config from '../../config/config.json';

const args = minimist(process.argv.slice(2));
const { username = config.defaultUsername, password = config.defaultPassword } = args;

const unauthorized = (res) => {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
};

export default (req, res, next) => {
    const user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    return user.name === username && user.pass === password ? next() : unauthorized(res);
};
