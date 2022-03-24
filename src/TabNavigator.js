import { BottomNavigation, Text } from 'react-native-paper';
import ViewDashboard from '../src/container/Dashboard';
import ListClients from '../src/container/ListClients';
import { color } from './assets/AppStyles';
import gFn from './libs/functions';
import * as React from 'react';




const MyComponent = (props) => {


    const Dashboard = () => <ViewDashboard />;

    const NewSale = () => <ListClients route={ {params: { action: "RegisterSale", infoUser: props.route.params}} }/> ;

    const Settings = () => <Text>Recents</Text>;
 
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Dashboard', icon: 'view-dashboard' },
        { key: 'newSale', title: 'Nova Venda', icon: 'cash' },
        { key: 'settings', title: 'Configurações', icon: 'account-settings' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: Dashboard,
        newSale: NewSale,
        settings: Settings,
    });

    return (
        <BottomNavigation
            barStyle={{
                backgroundColor: color.primary
            }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default MyComponent;