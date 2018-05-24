const express = require('express');
const next = require('next');
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();
    server.use(handler)
    // server.get('/registration/:tabName/:tabIndex', (req, res) => {
    //   const actualPage = '/registration';
    //   const queryParams = {
    //     tabName: req.params.tabName,
    //     tabIndex: req.params.tabIndex,
    //   };
    //   app.render(req, res, actualPage, queryParams);
    // });

    server.get('*', (req, res) => {
      return handle(req, res)
    })

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
