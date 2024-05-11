import { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Maybe, Weather } from '@generated';
import { styles } from './styles';
import { Info } from '../info';

interface InfosProps {
  loading: boolean;
  forecast?: ReadonlyArray<Maybe<Omit<Weather, 'humidity' | 'pressure'>>>;
}

export const Infos: FC<InfosProps> = ({ loading, forecast }) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} color="#096BDE" />
      ) : (
        forecast?.map((item, index) => item && <Info key={item.date} info={item} index={index} />)
      )}
    </View>
  );
};
