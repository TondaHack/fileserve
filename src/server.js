import express from 'express';
import ip from 'ip';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import config from '../config/config.json';
import upload from './lib/upload';
import auth from './lib/auth';
import { checkDirectorySync } from './helpers/helpers';

export default (args) => {
    const app = express();
    const port = process.env.PORT || config.port;
    const srcDir = path.resolve(__dirname);
    const root = path.dirname(srcDir);
    const defaultFilePath = `${root}/${config.defaultFileFolder}`;
    const { filepath = defaultFilePath } = args;
    const uploadMiddleware = upload(filepath).single('image');

    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
    app.use(auth);
    app.use(express.static(`${root}/${config.publicFolder}`));
    app.use('/upload', express.static(filepath));
    app.set('view engine', 'ejs');

    app.get('/', (req, res) => {
        checkDirectorySync(filepath);
        res.render('index', {
            files: fs.readdirSync(filepath),
        });
    });

    app.post('/upload', (req, res) => {
        uploadMiddleware(req, res, (err) => {
            if (err || !req.file) {
                res.redirect('/?message=error');
                return;
            }
            console.info('Uploaded', req.file.originalname);
            res.redirect('/?message=success');
        });
    });

    app.listen(port, () => {
        const ipaddress = ip.address();
        console.info(`Server is running on ${ipaddress}:${port}`);
    });
};
