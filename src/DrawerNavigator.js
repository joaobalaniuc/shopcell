import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import { color } from './assets/AppStyles';


import AddProductsInventoryManagement from './container/InventoryManagement/addProducts';
import RegisterSubGroupsProduct from './container/RegisterSubGroupsProduct';
import RegisterFamilyProduct from './container/RegisterFamilyProduct';
import RegisterGroupsProduct from './container/RegisterGroupsProduct';
import RegisterGridProduct from './container/RegisterGridProduct';
import ConfirmFinishedSale from './container/ConfirmFinishedSale';
import InventoryManagement from './container/InventoryManagement';
import RegisterCreditCard from './container/RegisterCreditCard';
import DetailsTransations from './container/DetailsTransations'; 
import ListFamilyProduct from './container/ListFamilyProduct';
import RegisterWorkOrder from './container/RegisterWorkOrder';
import RegisterCashFlow from './container/RegisterCashFlow';
import RegisterProvider from './container/RegisterProvider';
import RegisterProduct from './container/RegisterProduct';
import DetailsProduct from './container/DetailsProduct';
import ListCreditCard from './container/ListCreditCard';
import RegisterClient from './container/RegisterClient';
import RegisterStore from './container/RegisterStore';
import ListProviders from './container/ListProviders';
import RegisterSale from './container/RegisterSale';
import ListCredit from './container/ListCreditCard';
import ListCashFlow from './container/ListCashFlow';
import ListProducts from './container/ListProducts';
import RegisterUser from './container/RegisterUser';
import ConfirmSale from './container/ConfirmSale';
import ListClients from './container/ListClients';
import ListGroups from './container/ListGroups';
import ListUsers from './container/ListUsers';
import Dashboard from './container/Dashboard';
import ListStore from './container/ListStore';
import ListGrids from './container/ListGrids';
import ListSale from './container/ListSale';
import Services from './container/Services';
import Product from './container/Product'; 
import React from 'react';



const defaultHeader = {
    elevation: 0,
    backgroundColor: color.primary,
}

const Drawer = createDrawerNavigator();

function DrawerNavigator(props) { 

    //Const receive date login
    const infoUser = props.route.params;

    return (

        <Drawer.Navigator
            drawerContent={props => <DrawerContent infoUser={infoUser} {...props} />}
        >
            <Drawer.Screen name="Dashboard" initialParams={infoUser} component={Dashboard} options={ 
                {
                    title: '',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                } 
            } />

            <Drawer.Screen name="Product" initialParams={infoUser} component={Product} options={
                {
                    title: 'Produto',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListProducts" component={ListProducts} initialParams={infoUser} options={
                {
                    title: 'Lista de Produtos',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterProduct" initialParams={{ condition: 1, infoUser: infoUser }} component={RegisterProduct} options={
                {
                    title: 'Cadastro de Produtos',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterProvider" component={RegisterProvider} options={
                {
                    title: 'Cadastro de Fornecedor',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterClient" initialParams={infoUser} component={RegisterClient} options={
                {
                    title: 'Cadastro de Clientes',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterFamilyProduct" component={RegisterFamilyProduct} options={
                {
                    title: 'Cadastro de Famílias',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterGroupsProduct" component={RegisterGroupsProduct} options={
                {
                    title: 'Registro de Grupos',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterSubGroupsProduct" component={RegisterSubGroupsProduct} options={
                {
                    title: 'Registro de Grupos',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListFamilyProduct" initialParams={infoUser} component={ListFamilyProduct} options={
                {
                    title: 'Lista de Familias',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListGroups" initialParams={infoUser} component={ListGroups} options={
                {
                    title: 'Lista de Grupos',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListGrids" initialParams={infoUser} component={ListGrids} options={
                {
                    title: 'Lista de Grades',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterGridProduct" component={RegisterGridProduct} options={
                {
                    title: 'Registro de Grades',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListProviders" component={ListProviders} initialParams={infoUser} options={
                {
                    title: 'Lista de Fornecedores',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListClients" component={ListClients} initialParams={{ action: "EditClient", infoUser }} options={
                {
                    title: 'Lista de Clientes',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="Services" component={Services} options={
                {
                    title: 'Serviços',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterWorkOrder" component={RegisterWorkOrder} options={
                {
                    title: 'Registrar Nova Ordem',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterSale" component={RegisterSale} options={
                {
                    title: 'Registrar Nova Venda',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />


            <Drawer.Screen name="ConfirmSale" component={ConfirmSale} options={
                {
                    title: 'Confirmar dados da venda',
                    headerShown: false, 
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListSale" component={ListSale} initialParams={infoUser} options={
                {
                    title: 'Gestão de Vendas',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ConfirmFinishedSale" component={ConfirmFinishedSale} options={
                {
                    title: '',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterCreditCard" initialParams={infoUser} component={RegisterCreditCard} options={
                {
                    title: 'Novo cartão',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="ListStore" component={ListStore} initialParams={infoUser} options={
                {
                    title: 'Lojas',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen name="RegisterStore" initialParams={infoUser} component={RegisterStore} options={
                {
                    title: 'Nova Loja',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white
                }
            } />

            <Drawer.Screen initialParams={infoUser} name="ListCreditCard" component={ListCreditCard} options={
                {
                    title: 'Lista de Cartões',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen initialParams={infoUser} name="ListCredit" component={ListCredit} options={
                {
                    title: 'Lista de Crediários',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen name="ListCashFlow" component={ListCashFlow} initialParams={infoUser} options={
                {
                    title: 'Lista de Fluxo de Caixa',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen name="RegisterCashFlow" component={RegisterCashFlow} options={
                {
                    title: 'Iniciar fluxo de caixa',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen name="InventoryManagement" component={InventoryManagement} initialParams={infoUser} options={
                {
                    title: 'Gestão de Estoque',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />
            
            <Drawer.Screen name="AddProductsInventoryManagement" component={AddProductsInventoryManagement} initialParams={infoUser} options={
                {
                    title: 'Adicionar Produto',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen name="DetailsProduct" component={DetailsProduct} options={
                {
                    title: 'Detalhes Produto',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen name="DetailsTransations" component={DetailsTransations} options={
                {
                    title: 'Detalhes da Transação',
                    headerShown: false,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen name="ListUsers" component={ListUsers} initialParams={infoUser} options={
                {
                    title: 'Lista de Usuários',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

            <Drawer.Screen name="RegisterUser" component={RegisterUser} options={
                {
                    title: 'Registrar Usuário',
                    headerShown: true,
                    headerStyle: defaultHeader,
                    headerTintColor: color.white,
                }
            } />

        </Drawer.Navigator>
    );
}

export default DrawerNavigator;