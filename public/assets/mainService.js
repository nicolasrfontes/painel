angular.module('mainService', [])
    .factory('usuarioService',['$http',function($http){
        return{
            fazerlogin: function(usuario){
                return $http.post('/fazerlogin', usuario);
            },
            salvarUsuario: function(usuario){
                return $http.post('/salvarUsuario', usuario);
            },
            buscarUsuarios: function(){
                return $http.get('/buscarUsuarios');
            },
            removerUsuario: function(usuario){
                return $http.post('/removerUsuario', usuario);
            }
        }
    }])
    .factory('guicheService',['$http', function($http){
        return{
            salvarGuiche: function(guiche){
                return $http.post('/salvarGuiche', guiche);
            },
            buscarGuiches: function(){
                return $http.get('/buscarGuiches');
            },
            removerGuiche: function(guiche){
                return $http.post('/removerGuiche', guiche);
            }
        }
    }])
    .factory('atendimentoService',['$http', function($http){
        return{
            salvarTipoAtendimento: function(tipo){
                return $http.post('/salvarTipoAtendimento',tipo);
            },
            buscarTiposAtendimento: function(){
                return $http.get('/buscarTiposAtendimento');
            },
            removerTipoAtendimento: function(tipo){
                return $http.post('/removerTipoAtendimento',tipo);
            },
            salvarAnuncioVideo: function(url){
                return $http.post('/salvarAnuncioVideo',url);
            },
            salvarInformacoes: function(info){
                return $http.post('/salvarInformacoes', info);
            },
            buscarInformacoes: function(){
                return $http.get('/buscarInformacoes');
            },
            buscarAnuncioPrincipal: function(){
                return $http.get('/buscarAnuncioPrincipal');
            },
            novoAtendimento: function(atendimento){
                return $http.post('/novoAtendimento',atendimento);
            },
            buscarSenhasAguardando: function(){
                return $http.get('/buscarSenhasAguardando');
            },
            realizarAtendimento: function(senha){
                return $http.post('/realizarAtendimento',senha);
            },
            buscarSenhasAtendimento: function(){
                return $http.get('/buscarSenhasAtendimento');
            },
            buscarNovoAtendimento: function(senhas){
                return $http.post('/buscarNovoAtendimento',senhas);
            }
        }
    }])
    .factory('uploadService',['$http', function($http){
        return {
            uploadLogo: function(file){
                var fd = new FormData();
                var nome = 'logo';
                fd.append('file', file);
                return $http.post('/uploadlogo/'+nome,fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}});
            },
            uploadFundo: function(file){
                var fd = new FormData();
                var nome = 'fundo';
                fd.append('file', file);
                return $http.post('/uploadfundo/'+nome,fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}});
            },
            uploadAnuncioPrincipal: function(file){
                var fd = new FormData();
                var nome = 'anuncio';
                fd.append('file', file);
                return $http.post('/uploadanuncio/'+nome,fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}});
            }
        }

    }])