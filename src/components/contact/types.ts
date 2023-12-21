import { Contact } from 'react-native-contacts';

export type ContactProps = Contact & {
  handleDelete: (contactId: string) => void;
};
