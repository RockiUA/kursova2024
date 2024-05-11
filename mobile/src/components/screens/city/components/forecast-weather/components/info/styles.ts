import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  date: {
    flex: 1,
    alignSelf: 'center',
    color: '#73738c',
    fontSize: 18,
  },
  weather: {
    flex: 2,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  weatherText: {
    color: '#73738c',
    fontSize: 18,
  },
  image: {
    width: 50,
    aspectRatio: 1,
  },
  temperature: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 18,
  },
});
