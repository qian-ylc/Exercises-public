import * as fs from "node:fs";

function mkdir(path, options) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, options, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

export function readdir(path, options) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

export function stat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        })
    })
}




