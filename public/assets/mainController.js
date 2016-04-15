angular.module('mainController', [])
    .controller('usuarioController',['$scope','usuarioService',function($scope,usuarioService){
        $scope.login = {
            login:'',
            senha:''
        };
        $scope.usuario = {
            id:'',
            nome:'',
            login:'',
            senha:'',
            tipo:''
        }
        $scope.fazerlogin = function(){
            usuarioService.fazerlogin($scope.login)
                .success(function(retorno){
                    if (retorno.status==1){
                        $scope.resposta = retorno.resposta;
                    }else{
                        localStorage.setItem('usuarioLogado',JSON.stringify(retorno.objeto));
                        if (retorno.objeto.tipo==1){
                            location.href = 'menu_adm.html';
                        }else if(retorno.objeto.tipo==2){
                            location.href = 'atendimento.html';
                        }else if(retorno.objeto.tipo==3){
                            location.href = 'painel.html';
                        }else{
                            location.href = 'senhas.html';
                        }
                    }
                })
                .error(function(){location.href = '404.html'})
        };
        $scope.validarUsuario = function(){
            var usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
            if ((usuario==null)||(usuario==undefined)){
                location.href = 'index.html';
            }else{
                $scope.nomeUsuario = usuario.nome;
            }
        };
        $scope.deslogarUsuario = function(){
            localStorage.removeItem('usuarioLogado');
            location.href = 'index.html';
        };
        $scope.salvarUsuario = function(){
            usuarioService.salvarUsuario($scope.usuario)
                .success(function(retorno){
                    if (retorno.status==1){
                        $scope.resposta = retorno.resposta;
                    }else{
                        location.reload();
                    }
                })
                .error(function(){location.href = '404.html'})
        };
        $scope.buscarUsuarios = function(){
            usuarioService.buscarUsuarios()
                .success(function(retorno){
                    $scope.usuarios = retorno;
                })
        };
        $scope.editarUsuario = function(usuario){
            $scope.usuario = usuario;
        };
        $scope.excluirUsuario = function(usuario){
            usuarioService.removerUsuario(usuario)
                .success(function(retorno){
                    if (retorno.status==1){
                        alert(retorno.resposta);
                    }else{
                        location.reload();
                    }
                })
        }
    }])
    .controller('guicheController',['$scope','$http','guicheService',function($scope,$http,guicheService){
        $scope.guiche = {
            id:'',
            nome:'',
            descricao:''
        };
        $scope.salvarGuiche = function(){
            guicheService.salvarGuiche($scope.guiche)
                .success(function(retorno){
                    if (retorno.status==1){
                        $scope.resposta = retorno.resposta;
                    }else{
                        location.reload();
                    }
                })
        };
        $scope.buscarGuiches = function(){
            guicheService.buscarGuiches()
                .success(function(retorno){
                    $scope.guiches = retorno;
                })
        };
        $scope.removerGuiche = function(guiche){
            guicheService.removerGuiche(guiche)
                .success(function(retorno){
                    if (retorno.status==1){
                        alert(retorno.resposta);
                    }else{
                        location.reload();
                    }
                })
        };
        $scope.editarGuiche = function(guiche){
            $scope.guiche = guiche;
        }
    }])
    .controller('atendimentoController',['$scope','$http','atendimentoService',function($scope,$http,atendimentoService){
        $scope.tipoAtendimento = {
            id:'',
            nome:'',
            descricao:'',
            letra:''
        }
        $scope.salvarTipoAtendimento = function(){
            atendimentoService.salvarTipoAtendimento($scope.tipoAtendimento)
                .success(function(retorno){
                    if (retorno.status==1){
                        $scope.resposta = retorno.resposta;
                    }else{
                        location.reload();
                    }
                })
        }
        $scope.buscarTiposAtendimento = function(){
            atendimentoService.buscarTiposAtendimento()
                .success(function(retorno){
                    $scope.atendimentos = retorno;
                })
        }
        $scope.removerTipoAtendimento = function(tipo){
            atendimentoService.removerTipoAtendimento(tipo)
                .success(function(retorno){
                    if (retorno.status==1){
                        alert(retorno.resposta);
                    }else{
                        location.reload();
                    }
                })
        }
        $scope.editarTipoAtendimento = function(tipo){
            $scope.tipoAtendimento = tipo;
        }
    }])