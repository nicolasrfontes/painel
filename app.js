var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var usuario = require('./routes/usuario');
var guiche = require('./routes/guiche');
var atendimento = require('./routes/atendimento');
var upload = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.post('/fazerlogin',usuario.fazerlogin);
app.post('/salvarUsuario',usuario.salvarUsuario);
app.post('/removerUsuario',usuario.removerUsuario);
app.get('/buscarUsuarios',usuario.buscarUsuarios);

app.post('/salvarGuiche', guiche.salvarGuiche);
app.post('/removerGuiche', guiche.removerGuiche);
app.get('/buscarGuiches', guiche.buscarGuiches);

app.post('/salvarTipoAtendimento', atendimento.salvarTipoAtendimento);
app.post('/removerTipoAtendimento', atendimento.removerTipoAtendimento);
app.get('/buscarTiposAtendimento', atendimento.buscarTiposAtendimento);
app.get('/buscarInformacoes', atendimento.buscarInformacoes);
app.get('/buscarAnuncioPrincipal', atendimento.buscarAnuncioPrincipal);
app.get('/buscarSenhasAguardando', atendimento.buscarSenhasAguardando);
app.get('/buscarSenhasAtendimento', atendimento.buscarSenhasAtendimento);
app.post('/salvarAnuncioVideo',atendimento.salvarAnuncioVideo);
app.post('/salvarInformacoes',atendimento.salvarInformacoes);
app.post('/novoAtendimento',atendimento.novoAtendimento);
app.post('/realizarAtendimento',atendimento.realizarAtendimento);
app.post('/buscarNovoAtendimento',atendimento.buscarNovoAtendimento);

app.use('/uploadlogo/:logo', upload.uploadlogo);
app.use('/uploadfundo/:fundo', upload.uploadfundo);
app.use('/uploadanuncio/:anuncio', upload.uploadanuncio);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
