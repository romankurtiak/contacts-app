import { FC } from 'react';
import { ActivityIndicator, View, useWindowDimensions } from 'react-native';
import { styles } from './styles';
import { LoadingProps } from './types';

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  const { height, width } = useWindowDimensions();

  if (!isLoading) return null;

  return (
    <View style={[styles.wrapper, { height, width }]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
