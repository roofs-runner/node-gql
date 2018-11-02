const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const method = req.method;
  if (req.url === '/') {
    console.log('Hello from the root of the site');
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<form action="/create-user" method="post">' +
      '<input type="text" name="username"><button type="submit">Submit</button>' +
      '</form>');
    res.write('</html>');
    return res.end();
  }
  if (req.url === '/users') {
    console.log('Hello from the /users rout');

    res.write('<html>');
    res.write('<head><title>Users list</title></head>');
    res.write('<ul><li>Rout User!</li><li>Rout user2!</li></ul>');
    res.write('</html>');
    return res.end();
  }
  if (req.url === '/create-user' && method === 'POST') {
    console.log('Hello from the /create-user rout');
    let body = [];
    req.on('data', chunk => {
      console.log('onData event', chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      console.log('onEnd event');
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);
      res.end('ok');
    });
  }
  return res.end();
});

server.listen(3000);
