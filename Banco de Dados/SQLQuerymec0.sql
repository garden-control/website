use ControlBase

INSERT INTO ItensComprados (IdItensComprados, IdCompras, IdProdutos, QtdeComprada, PrecoUniCompra)
VALUES (1, 1, 1, '2 unidades', 10.99),
       (2, 1, 2, '1 unidade', 5.50),
       (3, 2, 3, '3 unidades', 8.75),
       (4, 2, 4, '2 unidades', 12.50),
       (5, 3, 5, '5 unidades', 20.00);

	select*from ItensComprados