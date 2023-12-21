import { Dispatch, SetStateAction } from 'react';
import { Contact } from 'react-native-contacts';
import { ModalProps } from '../../../../components/modal/types';

export type DeleteContactModalProps = Omit<ModalProps, 'title' | 'children'> & {
  selectedContactId: string;
  contacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
};
