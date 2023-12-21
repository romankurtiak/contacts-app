import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { addContact } from 'react-native-contacts';
import Modal from '../../../../components/modal';
import Input from '../../../../components/input';
import Button from '../../../../components/button';
import { CreateContactModalProps } from './types';

const CreateContactModal: FC<CreateContactModalProps> = ({
  isVisible,
  setIsVisible,
  setContacts,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCreateContact = useCallback(async () => {
    if (!name || !phoneNumber) return Alert.alert('Name and phone number must not be empty');

    const contact = await addContact({
      givenName: name,
      phoneNumbers: [{ label: 'mobile', number: phoneNumber }],
    });

    setContacts(contacts => [...contacts, contact]);
    setIsVisible(false);
  }, [name, phoneNumber, setContacts, setIsVisible]);

  useEffect(() => {
    return () => {
      setName('');
      setPhoneNumber('');
    };
  }, []);

  return (
    <Modal title="Create contact" isVisible={isVisible} setIsVisible={setIsVisible}>
      <Input label="Name" placeholder="Enter Contact name" onChange={setName} />
      <Input
        label="Phone number"
        placeholder="Enter Contact phone number"
        onChange={setPhoneNumber}
      />
      <Button text="Create contact" onPress={handleCreateContact} />
    </Modal>
  );
};

export default memo(CreateContactModal);
