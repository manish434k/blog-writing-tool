import { createTheme } from '@mui/material/styles';
import { colors, fonts, fontWeights } from './theme';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.primaryGreen,
      contrastText: '#fff',
    },
    secondary: {
      main: colors.secondaryBlue,
    },
    error: {
      main: colors.accentRed,
    },
    background: {
      default: colors.secondaryLightGray,
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: fonts.primary,
    fontWeightRegular: fontWeights.regular,
    fontWeightMedium: fontWeights.medium,
    fontWeightBold: fontWeights.bold,
    h1: { fontFamily: fonts.primary, fontWeight: fontWeights.bold },
    h2: { fontFamily: fonts.primary, fontWeight: fontWeights.bold },
    h3: { fontFamily: fonts.primary, fontWeight: fontWeights.bold },
    h4: { fontFamily: fonts.primary, fontWeight: fontWeights.bold },
    h5: { fontFamily: fonts.primary, fontWeight: fontWeights.bold },
    h6: { fontFamily: fonts.primary, fontWeight: fontWeights.bold },
    subtitle1: { fontFamily: fonts.secondary },
    subtitle2: { fontFamily: fonts.secondary },
  },
  shape: {
    borderRadius: 8,
  },
});

export default muiTheme;
