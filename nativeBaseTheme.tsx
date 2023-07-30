import { extendTheme } from 'native-base';

interface ColorMode {
  colorMode: string;
}

export const customTheme = extendTheme({
  colors: {
    primary: '#013161',
    secondary: '#fff',
    danger: '#df4758',
    warning: '#ffc107',
    success: '#00ff00',
    textDark: '#fff',
    textLigth: '#9c9c9ccc',
  },
});
