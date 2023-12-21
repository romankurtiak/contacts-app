import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    margin: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  headerCloseButton: {
    position: 'absolute',
    right: 0,
  },
  headerCloseButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00000080',
  },
  body: {
    gap: 10,
  },
});
