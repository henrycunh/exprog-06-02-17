var app = {id:0};

/* Funções */
    /** Adicionar Empregado **/
    app.adicionar = function() {
        var box = $(this).parent();
        var nome = $('#nameIn').val();
        var morada = $('#moradaIn').val();
        var salario  = $('#salarioIn').val();
        var dados = {
            "tipo" : "add",
            "nome" : nome,
            "morada" : morada,
            "salario": salario
        };
        
        $.ajax({
            url: "process.php",
            data: dados,
            type: "POST",
            dataType: 'json',         
            success: function(data){ 
                app.popMsg($('#addmsg'), data);
            }
        });
    }

    /** Atualizar Tabela **/
    app.listagem = function() {  
        
        $.ajax({
            url: 'process.php',
            beforeSend: function(x){
                $('#listar').html("<center>Carregando...</center>");

            },
            error: function(x,q,s){
                console.log(x + " " + q + ' ' + s);
            },
            data: {tipo : 'list'},
            dataType:'json',
            type: "POST",
            success: function(data){
                var table = "<table><tr><th>Nome</th><th>Morada</th><th>Salario</th><th>Informações </th></tr>";
                for(var emp in data){
                    var btn = "<button class='verBtn' onclick='app.ver(" + data[emp].id + ")'>Ver</button>"
                    table += "<tr><td>"+data[emp].nome+"</td><td>"+data[emp].morada+"</td><td>R$"+data[emp].salario+"</td><td>"+btn+"</td></tr>";
                }
                table += "</table>";
                table += "<button id='refreshList' onclick='app.listagem()'>Atualizar</button>";
                $('#listar').html(table);
            }
        });
        
    }
    
    /** Ver Empregado **/
    app.ver = function(id) {
        app.id = id;
        app.hideElem($("#listar"));
        app.hideElem($("#adicionar"));
        app.showElem($("#ver"));
        
        $.ajax({
            url: 'process.php',
            dataType: 'json',
            data: {tipo:'ver', id: id},
            type: 'POST',
            success: function(data){
                var emp = data.empregado;
                var table = "<table><tr><th>Informação</th><th>Valor</th></tr>";
                table += "<tr><td>Nome</td><td><input id='verNome' disabled value='" + emp.nome + "'></td></tr>";
                table += "<tr><td>Morada</td><td><input id='verMorada' disabled value='" + emp.morada + "'></td></tr>";
                table += "<tr><td>Salário</td><td><input id='verSalario' disabled value='" + emp.salario + "'></td></tr>";
                table += "</table>"
                table += "<button id='alterar' onclick='app.alterar()'>Alterar</button>";
                table += "<button onclick='app.remover()'>Remover</button>";
                table += "<div id='altermsg'></div>";
                $("#ver").html(table);
            }
        });
    }
    
    /** Alterar Empregado **/
    app.alterar = function() {
        // Clicado em 'Alterar'
        $("#verNome,#verMorada,#verSalario").prop('disabled', false);
        $('#alterar').html("Salvar");
        $('#alterar').prop('onclick', null);
        
        // Clicado em Salvar
        $('#alterar').on('click', function() {
            var nome = $('#verNome').val();
            var morada = $('#verMorada').val();
            var salario = $('#verSalario').val();
            
            $.ajax({
                url: 'process.php',
                type: 'POST',
                error: function(x,q,s){
                    console.log(x + " " + q + ' ' + s);
                },
                beforeSend: function(x){
                    $('#altermsg').addClass('primary').html('Fazendo alterações...').fadeIn(500);
                },
                data: {
                    tipo: 'alterar',
                    id: app.id,
                    nome: nome,
                    morada: morada,
                    salario: salario
                },
                dataType: 'json',
                success: function(data){
                    console.log(data);
                    app.popMsg($('#altermsg'), data);
                }
            });
            
            
//            //Voltando para Alterar
//            $('#alterar').html("Alterar");
//            $('#alterar').unbind('click');
//            $("#verNome,#verMorada,#verSalario").prop('disabled', true);
//            $('#alterar').prop('onclick', app.alterar());
        });
    }
    
    /** Exibir/Esconder Elemento **/
    app.toggleElem = function(obj) {
        var text = obj.html(); 
        obj.parent().next().slideToggle(500);
        obj.html((text == 'V') ? '/\\' : 'V');
    }
    
    /** Esconder Elemento **/
    app.hideElem = function(obj) {
        var btn = obj.prev().children('.sh');
        obj.slideUp(500);
        btn.html('V');
    }
    
    /** Exibir Elemento **/
    app.showElem = function(obj){
        var btn = obj.prev().children('.sh');
        obj.slideDown(500);
        btn.html('/\\');
    }

    app.popMsg = function(obj, data){
        obj
            .addClass(data.erro ? 'erro' : 'sucesso')
            .html(data.msg)
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
    }
    
// Atualizando tabela
app.listagem();


$(document).ready(function() {
    $('.sh').click( function() {
        app.toggleElem($(this));
    });
});



