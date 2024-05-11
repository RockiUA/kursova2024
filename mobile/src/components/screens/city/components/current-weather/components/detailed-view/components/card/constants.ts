import { city } from '@public/locales/en.json';
import { Card } from './enums';
import { CardVariants } from './interfaces';

export const cardVariants: CardVariants = {
  [Card.FEELS_LIKE]: {
    icon: 'thermometer',
    text: city.detailed.cards.feelsLike.title,
    suffix: city.detailed.cards.feelsLike.suffix,
  },
  [Card.WIND]: {
    icon: 'weather-windy',
    text: city.detailed.cards.wind.title,
    suffix: city.detailed.cards.wind.suffix,
  },
  [Card.HUMIDITY]: {
    icon: 'water',
    text: city.detailed.cards.humidity.title,
    suffix: city.detailed.cards.humidity.suffix,
  },
  [Card.PRESSURE]: {
    icon: 'arrow-down-thin',
    text: city.detailed.cards.pressure.title,
    suffix: city.detailed.cards.pressure.suffix,
  },
};
