import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCityInput } from './create-city.input';

@InputType()
export class UpdateCityInput extends PartialType(CreateCityInput) {}
