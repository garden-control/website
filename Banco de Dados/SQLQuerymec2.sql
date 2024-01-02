use ControlBase

INSERT INTO Produtos (IdProdutos, NomeProduto, QtdeEstoque, PrecoVenda)
VALUES (1, 'Camiseta','100', 29.99),
	   (2, 'Calça Jeans','50', 79.99),
	   (3, 'cropped','40', 35.99),
	   (4, 'body','30', 27.99),
	   (5, 'macacão curto','30', 50.99);

	select*from Produtos

	create View vw_Produtos
as 
select  IdProdutos,NomeProduto,QtdeEstoque,PrecoVenda
from Produtos;
select *from vw_Produtos



	CREATE TRIGGER AtualizarTotalPedidos
    AFTER INSERT ON Pedidos
    FOR EACH ROW
    BEGIN
    UPDATE Clientes
    SET TotalPedidos = TotalPedidos + NEW.ValorPedido
    WHERE IdCliente = NEW.IdCliente;
END;