<?php 
    header("Content-type: text/json");
    require 'conn.php';
    $result = array();

    if(!empty($_POST)){
        // Adicionar Empregado
        if($_POST['tipo'] == 'add'){
            $nome = $_POST['nome'];
            $morada = $_POST['morada'];
            $salario = $_POST['salario'];
            
            if(mysqli_query($conn, "SELECT nome FROM empregado WHERE nome='$nome'")->num_rows == 0){
                mysqli_query($conn, "INSERT INTO empregado(nome,morada,salario) VALUES('$nome', '$morada', $salario)");
                $result['erro'] = false;
                $result['msg'] = "Empregado $nome cadastrado/a com sucesso!";
            }
            else{
                $result['erro'] = true;
                $result['msg'] = "Já existe um empregado com esse nome.";
            }
            
            echo json_encode($result);
        }
        // Listar Empregados
        else if($_POST['tipo'] == 'list'){
            $queryRes = mysqli_query($conn,"SELECT * FROM empregado");
            if($queryRes->num_rows > 0){
                while($row = $queryRes->fetch_assoc()){
                    $result[$row['id']] = $row;
                }
                
                echo json_encode($result);
            }
        }
        // Ver Empregado
        else if($_POST['tipo'] == 'ver'){
            $id = $_POST['id'];
            $queryRes = mysqli_query($conn, "SELECT * FROM empregado WHERE id = $id");
            
            $result['empregado'] = $queryRes->fetch_assoc();
            
            echo json_encode($result);
        }
        //Alterar Empregado
        else if($_POST['tipo'] == 'alterar'){
            $id = $_POST['id'];
            $nome = $_POST['nome'];
            $morada = $_POST['morada'];
            $salario = $_POST['salario'];
            
            mysqli_query($conn,"UPDATE empregado SET nome='$nome', morada='$morada', salario=$salario WHERE id=$id");
            
            $result['msg'] = "Empregado $nome alterado com sucesso.";
            $result['erro'] = false;
            
            echo json_encode($result);
        }
    }


?>