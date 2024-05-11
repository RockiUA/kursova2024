import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';
import { CreateRoleInput } from './create-role.input';

@InputType()
export class GetRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => ID, { description: 'Role ID', nullable: true })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  readonly id?: number;
}
