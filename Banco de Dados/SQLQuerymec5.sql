use ControlBase

INSERT INTO Clientes (IdClientes, Nome, Senha, Endereco, Telefone, Email)
VALUES (1, 'João Silva','12345', 'Rua A, 123', '(11)123456789', 'joao.silva@example.com');
INSERT INTO Clientes (IdClientes, Nome, Senha, Endereco, Telefone, Email)
VALUES (2, 'Maria Souza','56789', 'Avenida B, 456', '(11)987654321', 'maria.souza@example.com');
INSERT INTO Clientes (IdClientes, Nome, Senha, Endereco, Telefone, Email)
VALUES (3, 'Pedro Santos','98765', 'Rua C, 789', '(11)555555555', 'pedro.santos@example.com');
INSERT INTO Clientes (IdClientes, Nome, Senha, Endereco, Telefone, Email)
VALUES (4, 'Ana Oliveira','54321', 'Avenida D, 987', '(11)444444444', 'ana.oliveira@example.com');
INSERT INTO Clientes (IdClientes, Nome, Senha, Endereco, Telefone, Email)
VALUES (5, 'Lucas Pereira','1001001', 'Rua E, 654', '(11)333333333', 'lucas.pereira@example.com');

select*from Clientes

create View vw_Clientes 
as
 select IdClientes, Nome, Endereço, Telefone, Email
FROM Clientes;

