import { useCallback, useEffect, useState } from 'react';
import {
  AppState,
  FlatList,
  Linking,
  ListRenderItem,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { getAll, type Contact as ContactType } from 'react-native-contacts';
import Loading from '../../components/loading';
import Button from '../../components/button';
import Contact from '../../components/contact';
import CreateContactModal from './components/create-contact-modal';
import DeleteContactModal from './components/delete-contact-modal';
import { getContactsPermissionStatus, requestContactsPermission } from '../../utils';
import { styles } from './styles';

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const handleCreateContact = useCallback(() => setIsCreateModalVisible(true), []);
  const handleDeleteContact = useCallback((contactId: string) => {
    setSelectedContactId(contactId);
    setIsDeleteModalVisible(true);
  }, []);

  const renderContact: ListRenderItem<ContactType> = useCallback(
    ({ item }) => <Contact {...item} handleDelete={handleDeleteContact} />,
    [handleDeleteContact],
  );

  const handleOpenSettings = useCallback(async () => {
    await Linking.openSettings();

    setIsPermissionDenied(false);
  }, []);

  const handleRequestContacts = useCallback(async () => {
    setIsLoading(true);

    const isAuthorized = await requestContactsPermission();

    if (!isAuthorized) return setIsLoading(false);

    const contacts = await getAll();

    setIsLoading(false);
    return setContacts(contacts);
  }, []);

  useEffect(() => {
    const setup = async () => {
      const status = await getContactsPermissionStatus();

      setIsPermissionDenied(status === 'denied');
      if (status === 'granted') handleRequestContacts();
    };

    isFocused && setup();
  }, [handleRequestContacts, isFocused]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      setIsFocused(state === 'active');
    });

    return () => {
      subscription.remove();
      setSelectedContactId(null);
    };
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        {!contacts.length ? (
          <>
            <Button
              text="Request contacts"
              onPress={handleRequestContacts}
              disabled={isPermissionDenied}
            />
            {isPermissionDenied && <Button text="Change settings" onPress={handleOpenSettings} />}
          </>
        ) : (
          <>
            <Text style={styles.headerTitle}>Contacts list:</Text>
            <Button
              text="Create contact"
              onPress={handleCreateContact}
              disabled={isPermissionDenied}
            />
          </>
        )}
      </View>
      <Loading isLoading={isLoading} />
      <FlatList
        data={contacts}
        key="recordID"
        contentContainerStyle={styles.body}
        renderItem={renderContact}
      />
      <CreateContactModal
        isVisible={isCreateModalVisible}
        setContacts={setContacts}
        setIsVisible={setIsCreateModalVisible}
      />
      <DeleteContactModal
        contacts={contacts}
        setContacts={setContacts}
        isVisible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
        selectedContactId={selectedContactId as string}
      />
    </SafeAreaView>
  );
};

export default Contacts;
