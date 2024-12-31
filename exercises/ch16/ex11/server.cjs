const net = require("net");
const fs = require('fs')
const path = require('path');
const querystring = require('querystring');

let server = net.createServer();
server.listen(8000, () => console.log("Listening on port 8000"));

server.on('connection', socket => {
    socket.on('data', data => {
        // console.log(data)
        const request = data.toString();
        console.log(request)
        // urlを取得
        const [headers, body] = request.split('\r\n\r\n');
        const [requestLine, ...headerLines] = headers.split('\r\n');
        const [method, url] = requestLine.split(' ');

        if (method === 'GET' && url === '/') {
            fs.readFile('./greeting_form.html', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    socket.write('\r\n');
                    socket.write('Internal Server Error');
                } else {
                    socket.write('HTTP/1.1 200 OK\r\n');
                    socket.write('Content-Type: text/html\r\n');
                    socket.write('\r\n');
                    socket.write(data);
                }
                socket.end();
            });
        } else if (method === 'POST' && url === '/greeting') {
            const parsedBody = querystring.parse(body);
            const name = parsedBody.name || 'Guest';
            const greeting = parsedBody.greeting || 'Hello';

            const responseHtml = `
                <html>
                <body>
                    <h1>${greeting}, ${name}!</h1>
                </body>
                </html>
            `;

            socket.write('HTTP/1.1 200 OK\r\n');
            socket.write('Content-Type: text/html\r\n');
            socket.write('\r\n');
            socket.write(responseHtml);
            socket.end();
        } else {
            console.log('404')
            socket.write('HTTP/1.1 404 Not Found\r\n');
            socket.write('Content-Type: text/plain\r\n');
            socket.write('\r\n');
            socket.write('404 Not Found');
            socket.end();
        }
    });
});

server.on('close', () => {
    console.log("closed")
})