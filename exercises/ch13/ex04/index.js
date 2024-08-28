import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

// fs.readdirとfs.statをfsPromises.readdirとfsPromises.statに
export function fetchFirstFileSize(path) {
    let result = fsPromises.readdir(path)
        .then((files) => { //files.length === 0 と正常処理
            if (files.length === 0) {
                throw new Error("files.length === 0");
            }
            return fsPromises.stat(join(path, files[0]))
        })
        // fsPromises.stat(join(path, files[0]))の結果をcallbackに渡す
        .catch(err => { throw (err) })
    return result;

    // fsPromises.readdir(path, (err, files) => {
    //     if (err) {
    //         callback(err);
    //         return;
    //     }
    //     if (files.length === 0) {
    //         callback(null, null);
    //         return;
    //     }

    //     fs.stat(join(path, files[0]), (err, stats) => {
    //         if (err) {
    //             callback(err);
    //             return;
    //         }
    //         callback(null, stats.size);
    //     });
    // });
}

export async function fetchSumOfFileSizes(path) {
    return fsPromises.readdir(path)
        .then((files) => {
            let total = 0;
            const rest = [...files];
            // iter()の処理？
            function iter() {
                if (rest.length === 0) {
                    return total;
                }

                const next = rest.pop();
                fsPromises.stat(join(path, next)).then((stats) => {
                    total += stats.size;
                    iter();
                })
            };

            iter();
        })
        .catch(err => { throw err })

    // fs.readdir(path, (err, files) => {
    //     if (err) {
    //         callback(err);
    //         return;
    //     }

    //     let total = 0;
    //     const rest = [...files];

    //     function iter() {
    //         if (rest.length === 0) {
    //             callback(null, total);
    //             return;
    //         }

    //         const next = rest.pop();
    //         fs.stat(join(path, next), (err, stats) => {
    //             if (err) {
    //                 callback(err);
    //                 return;
    //             }
    //             total += stats.size;
    //             iter();
    //         });
    //     }
    //     iter();
    // });
}

// export function callback(err, result) {
//     if (err) {
//         return err;
//     }
//     // console.log(result)
//     return result;
// }

let a = await fetchFirstFileSize("ch13/ex04/testdir")
console.log(a)
let b = await fetchSumOfFileSizes("ch13/ex04/testdir")
console.log(b)

