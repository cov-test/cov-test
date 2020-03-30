import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f2c7a',
    },
  },
  typography: {
    body1: {
      fontSize: 12,
      fontFamily: 'Lato',
      lineHeight: 1.33,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
    },
  },
});

export default theme;
