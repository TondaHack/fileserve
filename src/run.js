import minimist from 'minimist';
import server from './server';

const args = minimist(process.argv.slice(2));

server(args);
