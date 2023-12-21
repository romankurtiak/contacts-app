import { FC } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { InputProps } from './types';

const Input: FC<InputProps> = ({ onChange, label, ...inputProps }) => {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholderTextColor="#00000080"
        {...inputProps}
      />
    </View>
  );
};

export default Input;
