import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba( 0, 0, 0, 0.015 )',
  },
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cityName: {
    color: 'rgba( 37, 51, 65, 0.95 )',
    fontSize: 18,
    marginBottom: 2.5,
  },
  time: {
    color: 'rgba( 37, 51, 65, 0.95 )',
    fontSize: 14,
  },
  temperature: {
    marginTop: 20,
  },
  icon: {
    width: 110,
    height: 110,
  },
});
