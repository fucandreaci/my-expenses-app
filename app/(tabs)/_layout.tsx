import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name='index'
                         options={{
                             headerShown: false,
                             title: 'Home',
                             tabBarIcon: (props) => (
                                 <Ionicons name={props.focused ? 'home' : 'home-outline'}
                                           color={props.color}
                                           size={props.size}/>
                             )
                         }}/>
            <Tabs.Screen name='configure'
                         options={{
                             headerShown: false,
                             title: 'Settings',
                             tabBarIcon: (props) => (
                                 <Ionicons name={props.focused ? 'cog' : 'cog-outline'}
                                           color={props.color}
                                           size={props.size}/>
                             )
                         }}/>
        </Tabs>
    )
}

export default TabsLayout;
