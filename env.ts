// eslint-disable-next-line import/no-named-as-default
import Constants from 'expo-constants';

function getApiUrl() {
  const baseUrl = Constants.expoConfig?.extra?.API_URL;
  if (!baseUrl) return 'http://18.222.105.195:8080/';

  return baseUrl;
}

export const Env = {
  // Karoo API
  baseUrl: getApiUrl(),
};
