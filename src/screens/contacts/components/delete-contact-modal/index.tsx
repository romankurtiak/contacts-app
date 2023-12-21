import { FC, memo, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { deleteContact } from 'react-native-contacts';
import Modal from '../../../../components/modal';
import Button from '../../../../components/button';
import { DeleteContactModalProps } from './types';
import { styles } from './styles';

const DeleteContactModal: FC<DeleteContactModalProps> = ({
  isVisible,
  contacts,
  selectedContactId,
  setContacts,
  setIsVisible,
}) => {
  const selectedContact = useMemo(
    () => contacts.find(({ recordID }) => recordID === selectedContactId),
    [contacts, selectedContactId],
  );

  const handleDelete = useCallback(async () => {
    await deleteContact(selectedContact!);

    setIsVisible(false);
    setContacts(contacts => contacts.filter(({ recordID }) => recordID !== selectedContactId));
  }, [setContacts, selectedContactId, selectedContact, setIsVisible]);
  const handleCancel = useCallback(() => setIsVisible(false), [setIsVisible]);

  return (
    <Modal title="Create contact" isVisible={isVisible} setIsVisible={setIsVisible}>
      {selectedContact ? (
        <>
          <Text style={styles.title}>
            Are you sure you want to delete{'\n'}
            <Text style={[styles.title, styles.contactDetail]}>{selectedContact.givenName}</Text> (
            <Text style={styles.contactDetail}>{selectedContact.phoneNumbers[0].number}</Text>)
            {'\n'}
            from your contacts?
          </Text>
          <View style={styles.actions}>
            <Button text="Cancel" onPress={handleCancel} />
            <Button text="Delete contact" onPress={handleDelete} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Selected contact not found</Text>
          <Button text="Cancel" onPress={handleCancel} />
        </>
      )}
    </Modal>
  );
};

export default memo(DeleteContactModal);
