

export default
    [
        {
            icon: "view-dashboard",
            label: "Dashboard",
            visible: false,
            items: [
                { name: "Página Inicial", action: "Dashboard" },
            ]
        },
        {
            icon: "cart",
            label: "Vendas",
            visible: false,
            items: [
                { name: "Nova Venda", action: "ListClients", func: "RegisterSale" },
                { name: "Fluxo de Caixa", action: "ListCashFlow" },
                { name: "Gestão de Vendas", action: "ListSale" },
            ]
        }, 
        { 
            icon: "basket",
            label: "Produtos",
            visible: false,
            items: [
                { name: "Gestão de Estoque", action: "InventoryManagement" },
                { name: "Lista de Produtos", action: "ListProducts" },
                { name: "Famílias", action: "ListFamilyProduct" },
                { name: "Grupos", action: "ListGroups" },
                { name: "Grades", action: "ListGrids" }, 

            ]
        },
        {
            icon: "store",
            label: "Fornecedores",
            visible: false,
            items: [
                { name: "Lista de Fornecedores", action: "ListProviders" },

            ]
        },
        {
            icon: "account-group",
            label: "Clientes",
            visible: false,
            items: [
                { name: "Lista de Clientes", action: "ListClients", func: "EditClient" },
            ]
        },
        {
            icon: "face-agent",
            label: "Serviços",
            visible: false,
            items: [
                { name: "Novo Serviço", action: "RegisterWorkOrder" },

            ]
        },
        {
            icon: "credit-card-outline",
            label: "Métodos de Pagamento",
            visible: false,
            items: [
                { name: "Cartão de Crédito", action: "ListCreditCard" },
                { name: "Crediários", action: "ListCredit" },

            ]
        },
        {
            icon: "store-outline",
            label: "Lojas",
            visible: false,
            items: [
                { name: "Lista de Lojas", action: "ListStore" },

            ]
        },
        {
            icon: "store-outline",
            label: "Usuários",
            visible: false,
            items: [
                { name: "Lista de Usuários", action: "ListUsers" },

            ]
        },
    ];
 