import { Dispatch, SetStateAction } from 'react';
import { Contact } from 'react-native-contacts';
import { ModalProps } from '../../../../components/modal/types';

export type CreateContactModalProps = Omit<ModalProps, 'title'> & {
  setContacts: Dispatch<SetStateAction<Contact[]>>;
};
