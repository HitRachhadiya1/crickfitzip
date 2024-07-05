import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/loginscreen';
import Otpscreen from '../screens/Otpscreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import Octicons from 'react-native-vector-icons/Octicons'

import BottomMenu from './BottomMenu';
import BookingScreen from '../screens/BookingScreen';
import DetailScreen from '../screens/DetailScreen';
import SuccessScreen from '../screens/successScreen';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import a from '../screens/a';
import b from '../screens/b';
import { Easing } from 'react-native';
import NameScreen from '../screens/NameScreen';

const Stack = createSharedElementStackNavigator();

// const Navigator = SharedElementNavigator(
//   {
//     Splash:Splash,
//     Login:LoginScreen,
//     OtpScreen:Otpscreen,
//     Homee:BottomMenu,
//     BookingScreen:BookingScreen,
//     DetailScreen:DetailScreen,
//     Home:Home,
//     SuccessScreen:SuccessScreen,
//   },
//   {
//     initialRouteName: 'Splash',
//     // Additional navigation options if needed
//   }
// )

const options = {
  gestureEnabled: true,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      }
    }
  }
}

const config = {
  animation: 'spring',
  config: {
    damping: 100,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 400,
    easing: Easing.linear,
  }
}

const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            })
          },
          
          {
            scale: next ?
              next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }) : 1,
          }
        ]
      }
    }
  }
}

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false,
        ...customTransition,
        //  gestureEnabled: true, transitionSpec: {
        //   open: config,
        //   close: closeConfig
        // },
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} >

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={Otpscreen} />
        <Stack.Screen name="Homee" component={BottomMenu} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen}
          options={options}
          sharedElements={(route, otherRoute, showing) => {
            const { ground } = route.params;
            return [`item.${ground.id}.image`];
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="a" component={a}

        />
        <Stack.Screen name="b" component={b}
          sharedElements={(route, otherRoute, showing) => {
            const { ground } = route.params;
            return ['imag1'];
          }}
        />
        <Stack.Screen name="NameScreen" component={NameScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}




export default Navigator
