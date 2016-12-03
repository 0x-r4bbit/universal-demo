// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.node'; // temporary until 2.1.1 things are patched in Core

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as compression from 'compression';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModule } from './node.module';

// Routes
import { routes } from './server.routes';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', createEngine({
  ngModule: MainModule
}));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'html');
app.set('json spaces', 2);

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());
app.use(compression());

app.use(morgan('dev'));

function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}
// Serve static files
app.use('/assets', cacheControl, express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false}));

function ngApp(req, res) {
  res.render('index', {
    req,
    res
  });
}

/**
 * use universal for specific routes
 */
app.get('/', ngApp);

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
