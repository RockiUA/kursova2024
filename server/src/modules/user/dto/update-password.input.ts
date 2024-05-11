import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field({ description: 'Current user password' })
  @IsString()
  @Length(8, 64)
  readonly oldPassword: string;

  @Field({ description: 'New user password' })
  @IsString()
  @Length(8, 64)
  readonly newPassword: string;
}
