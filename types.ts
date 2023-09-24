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
  ParkingForm: undefined;
  ParkingRemove: undefined;
};

export type RootStackParamList = {
  HomeNav: undefined;
  Profile: undefined;
  ParkingLot: undefined;
  Queue: undefined;
  QrCode: undefined;
};

export enum LoginTypes {
  Security = 'Segurança',
  Driver = 'Condutor',
}
