import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 25,
  },
  close: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 20,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'baseline',
    marginTop: 5,
  },
});
