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
                        if (retorno.objeto.tipo=='Administrador'){
                            location.href = 'menu_adm.html';
                        }else if(retorno.objeto.tipo=='Atendente'){
                            location.href = 'atendimento.html';
                        }else if(retorno.objeto.tipo=='Painel'){
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
        function ordenarTipoAtendimento(a,b) {
            if (a.nome < b.nome)
                return -1;
            else if (a.nome > b.nome)
                return 1;
            else
                return 0;
        }
        $scope.buscarTiposAtendimento = function(){
            atendimentoService.buscarTiposAtendimento()
                .success(function(retorno){
                    $scope.atendimentos = retorno.sort(ordenarTipoAtendimento);
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
        $scope.imprimirSenha = function(tipo){
            ///// salvar senha (buscar a ultima e subir 1 numero)
            ///// comando para impressão
            alert(tipo);
        }
        $scope.mudarTipoAnuncio = function(anuncio){
            if (anuncio=='Imagem'){
                document.getElementById('imagem').style.display = 'block';
                document.getElementById('video').style.display = 'none';
            }
            if (anuncio=='Vídeo'){
                document.getElementById('imagem').style.display = 'none';
                document.getElementById('video').style.display = 'block';
            }
            if (anuncio=='Selecione o Anuncio'){
                document.getElementById('imagem').style.display = 'none';
                document.getElementById('video').style.display = 'none';
            }
        }
        $scope.tipoanuncio = ['Imagem','Vídeo','Selecione o Anuncio'];
        $scope.selectedItem = 0;
        $scope.salvarAnuncioVideo = function(){
            var url = {
                url: $scope.urlVideo
            }
            atendimentoService.salvarAnuncioVideo(url)
                .success(function(retorno){
                    alert('Anuncio Carregado com Sucesso!');
                    location.reload();
                })
        }
        $scope.salvarInformacoes = function(){
            var objeto = {
                linha1: $scope.linha1,
                linha2: $scope.linha2,
                linha3: $scope.linha3
            }
            atendimentoService.salvarInformacoes(objeto)
                .success(function(retorno){
                    alert('Informações salvas com sucesso!');
                    location.reload();
                })
        }
        $scope.buscarInformacoes = function(){
            atendimentoService.buscarInformacoes()
                .success(function(retorno){
                    $scope.linha1 = retorno[0].linha1;
                    $scope.linha2 = retorno[0].linha2;
                    $scope.linha3 = retorno[0].linha3;
                })
        }
        $scope.buscarAnuncioPrincipal = function(){
            atendimentoService.buscarAnuncioPrincipal()
                .success(function(retorno){
                    if (retorno.tipo=='imagem'){
                        document.getElementById('imagem').style.display = 'block';
                        document.getElementById('video').style.display = 'none';
                    }else{
                        $scope.urlVideo = retorno.url;
                        document.getElementById('imagem').style.display = 'none';
                        document.getElementById('video').style.display = 'block';
                    }
                })
        }
    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        element[0].files[0].name = 'nicolas.jpg';
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .controller('uploadController',['$scope','$http','uploadService', function($scope,$http,uploadService){
        $scope.uploadLogo = function(){
            var file = $scope.logo;
            file.name = 'logo.png';
            uploadService.uploadLogo(file)
                .success(function(retorno){
                    alert('Logo Carregado com Sucesso!');
                    location.reload();
                })
        }
        $scope.uploadFundo = function(){
            var file = $scope.fundo;
            file.name = 'fundo.png';
            uploadService.uploadFundo(file)
                .success(function(retorno){
                    alert('Fundo Carregado com Sucesso!');
                    location.reload();
                })
        }
        $scope.uploadAnuncioPrincipal = function(){
            var file = $scope.fundo;
            file.name = 'anuncio.png';
            uploadService.uploadAnuncioPrincipal(file)
                .success(function(retorno){
                    alert('Anuncio Carregado com Sucesso!');
                    location.reload();
                })
        }
    }])