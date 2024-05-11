import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba( 0, 0, 0, 0.015 )',
  },
  icon: {
    alignSelf: 'flex-start',
    margin: 0,
    marginLeft: -10,
  },
  text: {
    color: '#73738c',
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
});
