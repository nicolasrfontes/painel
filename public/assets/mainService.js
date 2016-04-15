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
            }
        }
    }])