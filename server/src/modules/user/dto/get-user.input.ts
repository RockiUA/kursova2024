import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, Min } from 'class-validator';

@InputType()
export class GetUserInput {
  @Field(() => ID, { description: 'User ID', nullable: true })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  readonly id?: number;

  @Field({ description: 'User Email', nullable: true })
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
