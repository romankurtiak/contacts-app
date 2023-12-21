import { FC, useCallback, useMemo } from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { ContactProps } from './types';
import { styles } from './styles';

const Contact: FC<ContactProps> = ({
  recordID,
  thumbnailPath,
  hasThumbnail,
  givenName,
  phoneNumbers,
  handleDelete,
}) => {
  const avatarSource: ImageSourcePropType = useMemo(() => {
    return {
      uri: hasThumbnail
        ? thumbnailPath
        : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
    };
  }, [hasThumbnail, thumbnailPath]);
  const handleDeleteContact = useCallback(() => handleDelete(recordID), [recordID, handleDelete]);

  return (
    <View style={styles.wrapper}>
      <View>
        <Image source={avatarSource} style={styles.avatar} />
      </View>
      <View style={styles.rightSection}>
        <Text>{givenName}</Text>
        <Text>{phoneNumbers[0].number}</Text>
      </View>
      <View style={styles.deleteSection}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteContact}>
          <Text style={styles.deleteButtonTitle}>delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contact;
