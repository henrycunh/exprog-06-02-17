<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Exercício de Programação</title>
    <link rel="stylesheet" href="style.css">
    <script src="jquery.js"></script>
    <script src="main.js"></script>
</head>
<body>
    <h1>Adicionar Empregado <button class='sh'>V</button></h1>
    <div id="adicionar" class='box'>
        <input type="text" placeholder="Nome" id='nameIn'>
        <input type="text" placeholder="Morada" id='moradaIn'>
        <input type="number" placeholder="Salário" id='salarioIn'>
        <button id='addBtn' onclick='app.adicionar()'>Adicionar</button>
        <div id="addmsg"></div>
        
    </div>
    
    <hr>
    
    <h1>Ver Empregado <button class='sh'>V</button></h1>
    <div id="ver" class='box'>
        Nenhum empregado a ser visualizado.
    </div>
    
    <hr>
    
    <h1>Listar Empregado <button class='sh'>V</button></h1>
    <div id="listar" class='box'>
        <center>Carregando...</center>
    </div>
    
    
</body>
</html>