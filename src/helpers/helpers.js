import fs from 'fs';

export const checkDirectorySync = (directory) => {
    try {
        fs.statSync(directory);
    } catch (e) {
        fs.mkdirSync(directory);
    }
};

export default {
    checkDirectorySync,
};
