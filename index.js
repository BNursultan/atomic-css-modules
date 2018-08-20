const fs = require('fs');
const webpack = require('webpack');

const Express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = Express();

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    heartbeat: 1000,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.set('port', process.env.PORT || 3000);
app.use(morgan('tiny'));

app.use(Express.static(path.join(__dirname, './public')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.listen(app.get('port'), () => {
  console.log('Dev server listening on port ' + app.get('port'));
});
