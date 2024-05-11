import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field({ description: 'Role name' })
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Field({ description: 'Role description' })
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
