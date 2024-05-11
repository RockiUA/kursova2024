import { Card } from './enums';

interface CardVariantsProps {
  icon: string;
  text: string;
  suffix: string;
}

export interface CardVariants extends Record<Card, CardVariantsProps> {}
