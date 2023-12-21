import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 360,
  },
  rightSection: { gap: 3 },
  deleteSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 7,
    backgroundColor: '#C7C7C7',
  },
  deleteButtonTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5E5E5E',
  },
});
