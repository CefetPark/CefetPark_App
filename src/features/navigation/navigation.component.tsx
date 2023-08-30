import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '@screens/forgot-password-screen';
import homeScreen from '@screens/home-screen';
import Login from '@screens/login-screen';
import Profile from '@screens/profile-screen';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { HomeStackParamList, RootStackParamList, StackParamList, LoginTypes } from '../../../types';
import { TabBarIcon } from './tabbar-icon';
import { ParkingDetails } from '@screens/parking-details-screen';
import ParkingManage from '@screens/parking-manage-screen';
import ParkingForm from '@screens/parking-form-screen';
import useStore from '@features/app/use-store';
import removeScreen from '@screens/parking-remove-screen';
import RemoveScreen from '@screens/parking-remove-screen';

const Stack = createNativeStackNavigator<StackParamList>();
const BottomStack = createBottomTabNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const RootNavigator = observer(() => {
  return <AuthNavigator />;
});

const AuthNavigator = observer(() => {
  const { authStore } = useStore();

  return (
    <Stack.Navigator>
      {authStore.authToken != '' ? (
        <>
          <Stack.Screen name="Root" component={BottomNavigator} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerTransparent: true, headerTitle: '' }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerTransparent: true, headerTitle: '' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
});

const HomeNavigator = observer(() => {
  const { authStore } = useStore();
  return (
    <HomeStack.Navigator>
      {authStore.user?.userType == LoginTypes.Driver ? (
        <>
          <HomeStack.Screen
            name="Home"
            component={homeScreen}
            options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
          />
          <HomeStack.Screen
            name="ParkingDetails"
            component={ParkingDetails}
            options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
          />
        </>
      ) : (
        <>
          <HomeStack.Screen
            name="Home"
            component={homeScreen}
            options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
          />
          <HomeStack.Screen
            name="ParkingDetails"
            component={ParkingManage}
            options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
          />
          <HomeStack.Screen
            name="ParkingForm"
            component={ParkingForm}
            options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
          />
          <HomeStack.Screen
            name="ParkingRemove"
            component={RemoveScreen}
            options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
          />
        </>
      )}
    </HomeStack.Navigator>
  );
});

const BottomNavigator = () => {
  return (
    <BottomStack.Navigator>
      <BottomStack.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: 80,
          },
        }}
      />
      <BottomStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: 80,
          },
        }}
      />
    </BottomStack.Navigator>
  );
};
