import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  touchable: {
    padding: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 25,
    maxHeight: 25,
  },
  text: {
    fontSize: 18,
  },
  disabled: {
    borderRadius: 0,
  },
  icon: {
    width: 29,
    height: 29,
    backgroundColor: '#D7F5DD',
    padding: 2.5,
  },
});
