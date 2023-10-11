import useStore from '@features/app/use-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '@screens/forgot-password-screen';
import homeScreen from '@screens/home-screen';
import Login from '@screens/login-screen';
import { ParkingDetails } from '@screens/parking-details-screen';
import ParkingForm from '@screens/parking-form-screen';
import ParkingManage from '@screens/parking-manage-screen';
import RemoveScreen from '@screens/parking-remove-screen';
import Profile from '@screens/profile-screen';
import QrCodeScreen from '@screens/qr-code-screen';
import QueueScreen from '@screens/queue-screen';
import { HomeStackParamList, LoginTypes, RootStackParamList, StackParamList } from '@types';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { TabBarIcon } from './tabbar-icon';

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

const DriverNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={homeScreen}
        options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
      />
      <HomeStack.Screen
        name="ParkingDetails"
        component={ParkingDetails}
        options={{ headerTransparent: true, headerTitle: '', headerBackVisible: true, headerBackTitle: 'voltar' }}
      />
    </HomeStack.Navigator>
  );
};

const SecurityNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={homeScreen}
        options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
      />
      <HomeStack.Screen
        name="ParkingDetails"
        component={ParkingManage}
        options={{ headerTransparent: true, headerTitle: '', headerBackVisible: true }}
      />
      <HomeStack.Screen
        name="ParkingForm"
        component={ParkingForm}
        options={{ headerTransparent: true, headerTitle: '', headerBackVisible: false }}
      />
      <HomeStack.Screen
        name="ParkingRemove"
        component={RemoveScreen}
        options={{ headerTransparent: true, headerTitle: '' }}
      />
    </HomeStack.Navigator>
  );
};

const BottomDriverNavigator = () => {
  return (
    <BottomStack.Navigator>
      <BottomStack.Screen
        name="HomeNav"
        component={DriverNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: '9%',
          },
        }}
      />
      <BottomStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="account" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: '9%',
          },
        }}
      />

      <BottomStack.Screen
        name="QrCode"
        component={QrCodeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="qrcode" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: '9%',
          },
        }}
      />

      {/* <BottomStack.Screen
        name="Queue"
        component={QueueScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="human-queue" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: 80,
          },
        }}
      /> */}
    </BottomStack.Navigator>
  );
};

const BottomSecurityNavigator = () => {
  return (
    <BottomStack.Navigator>
      <BottomStack.Screen
        name="HomeNav"
        component={SecurityNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: '9%',
          },
        }}
      />
      <BottomStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="account" color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius: 40,
            borderTopEndRadius: 40,
            height: '9%',
          },
        }}
      />
    </BottomStack.Navigator>
  );
};

const BottomNavigator = observer(() => {
  const { authStore } = useStore();
  return authStore.user?.userType == LoginTypes.Driver ? (
    <BottomDriverNavigator />
  ) : (
    <BottomSecurityNavigator />
  );
});
