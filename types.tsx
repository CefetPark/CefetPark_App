import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackScreenProps<Screen extends keyof StackParamList> = NativeStackScreenProps<
  StackParamList,
  Screen
>;

export type StackParamList = {
  Root: RootStackParamList | undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ParkingDetails: undefined;
  ParkingManage: undefined;
  QrCodeHandle: undefined;
  ParkingForm: undefined;
};

export type RootStackParamList = {
  HomeNav: undefined;
  Profile: undefined;
  Configs: undefined;
  ParkingLot: undefined;
};
