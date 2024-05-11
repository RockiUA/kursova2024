import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba( 0, 0, 0, 0.015 )',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  content: {
    flex: 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherDescription: {
    color: '#73738c',
  },
  temperature: {
    fontWeight: '700',
  },
});
