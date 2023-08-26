import 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Settings from './components/Settings'; // Make sure to import Settings
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Search"
        component={MovieList}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Details" component={MovieDetails} options={{ title: 'Go Back' }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold' },
          headerTintColor: 'white',
        }}
      >
        <Drawer.Screen
          name="Search For Movies"
          component={MyTabs}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white', fontWeight: 'bold' },
          }}
        />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: 'black',
        tabBarInactiveBackgroundColor: 'grey',
      }}
    >
      <Tab.Screen
        name="Home Screen"
        component={MainStack}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="movie-open" size={40} color="white" />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarIcon: () => <Ionicons name="md-settings" size={40} color="white" />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

