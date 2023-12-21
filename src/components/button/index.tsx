import { FC, useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({ onPress, disabled, text }) => {
  const style = useMemo(() => {
    return {
      ...styles.button,
      ...(disabled && { backgroundColor: '#ADADAD', borderColor: '#8E8E8E' }),
    };
  }, [disabled]);

  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
