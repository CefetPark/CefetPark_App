// eslint-disable-next-line import/no-named-as-default
import Constants from 'expo-constants';

function getApiUrl() {
  const baseUrl = Constants.expoConfig?.extra?.API_URL;
  if (!baseUrl) return '';

  return baseUrl;
}

export const Env = {
  // Karoo API
  baseUrl: getApiUrl(),
};
