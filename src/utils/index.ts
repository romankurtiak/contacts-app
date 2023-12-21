import { PermissionsAndroid, PermissionStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkPermission, requestPermission } from 'react-native-contacts';
import { os } from '../constants';

export const getContactsPermissionStatus = async (): Promise<PermissionStatus | undefined> => {
  switch (os) {
    case 'android':
      const isAuthorized = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      const isPermissionAsked = await AsyncStorage.getItem('isPermissionAsked');

      return isAuthorized ? 'granted' : isPermissionAsked === 'true' ? 'denied' : undefined;
    case 'ios':
      const status = await checkPermission();

      return status === 'authorized' ? 'granted' : status === 'denied' ? 'denied' : undefined;
  }
};

export const requestContactsPermission = async () => {
  switch (os) {
    case 'android': {
      const status: PermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Accept to continue',
        },
      );

      await AsyncStorage.setItem('isPermissionAsked', 'true');

      return status === 'granted';
    }
    case 'ios': {
      const status = await requestPermission();

      await AsyncStorage.setItem('isPermissionAsked', 'true');

      return status === 'authorized';
    }
  }
};
