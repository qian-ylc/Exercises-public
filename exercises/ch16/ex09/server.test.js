import request from 'supertest';
// appをインポート？
import { app } from './server.js';

// serverを起動する必要？
// パス設定？
describe('GET /test/mirror', function () {
    it('/test/mirrorのContent-Typeなどを返す', function (done) {
        request(app)
            .get('/test/mirror')
            .expect('Content-Type', 'text/plain; charset=UTF-8')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // レスポンスボディの内容を確認
                expect(res.text).toContain('GET /test/mirror HTTP/');
                done();
            });
    });
});

// describe('ローカルディレクトリからファイルを提供', function () {
//     it('txtファイル', function (done) {
//         request(app)
//             .get('/tmp/test.txt')
//             .expect(200)
//             .expect('Content-Type', 'text/plain')
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });

//     it('cssファイル', function (done) {
//         request(app)
//             .get('/tmp/test.css')
//             .expect(200)
//             .expect('Content-Type', 'text/css')
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });

//     it('htmlファイル', function (done) {
//         request(app)
//             .get('/tmp/test.txt')
//             .expect(200)
//             .expect('Content-Type', 'text/html')
//             .end(function (err, res) {
//                 if (err) return done(err);;
//                 done();
//             });
//     });

//     it('jsファイル', function (done) {
//         request(app)
//             .get('/tmp/test.js')
//             .expect(200)
//             .expect('Content-Type', 'text/javascript')
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });

//     it('pngファイル', function (done) {
//         request(app)
//             .get('/tmp/test.png')
//             .expect(200)
//             .expect('Content-Type', 'image/png')
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });

//     it('default', function (done) {
//         request(app)
//             .get('/tmp/test')
//             .expect(200)
//             .expect('Content-Type', 'application/octet-stream')
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });

//     it('存在しないパス', function (done) {
//         request(app)
//             .get('/nonexistentfile.txt')
//             .expect(404, done);
//     });
// });