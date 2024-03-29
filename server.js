const express = require('express');
const next = require('next');
const routes = require('./routes');

var favicon = require('serve-favicon');
var path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();
    server.use(favicon(path.join(__dirname, '/static/images/', 'empala-icon.svg')));
    server.use(handler);
    // server.get('*', (req, res) => {
    //   return handle(req, res)
    // });


    server.listen(3000, (err) => {
      if (err) throw err;
      console.log(`> EMPALA: ready on ${process.env.NODE_ENV === 'production'
        ? 'http://ec2-18-217-9-54.us-east-2.compute.amazonaws.com/'
        : 'localhost:3000'}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
