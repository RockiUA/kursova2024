import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    maxWidth: '85%',
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    zIndex: 100,
  },
  success: {
    backgroundColor: '#1e4620',
  },
  error: {
    backgroundColor: '#d32f2f',
  },
  info: {
    backgroundColor: '#014361',
  },
  warning: {
    backgroundColor: '#663c00',
  },
  icon: {
    width: 25,
    height: 25,
  },
  close: {
    position: 'absolute',
    top: -7.5,
    right: 15,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  text: {
    color: '#ffffff',
    width: '65%',
  },
});
