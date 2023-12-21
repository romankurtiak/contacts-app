import { FC, memo, useCallback } from 'react';
import { Modal as RNModal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ModalProps } from './types';
import { styles } from './styles';

const Modal: FC<ModalProps> = ({ isVisible, title, children, setIsVisible }) => {
  const handleRequestClose = useCallback(() => {
    setIsVisible?.(false);
  }, [setIsVisible]);

  return (
    <RNModal
      visible={isVisible}
      onRequestClose={handleRequestClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity style={styles.headerCloseButton} onPress={handleRequestClose}>
            <Text style={styles.headerCloseButtonTitle}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>{children}</View>
      </SafeAreaView>
    </RNModal>
  );
};

export default memo(Modal);
