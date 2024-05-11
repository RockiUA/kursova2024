import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ description: 'User Email' })
  @IsEmail()
  readonly email: string;

  @Field({ description: 'User Password' })
  @Length(8, 64)
  readonly password: string;
}
