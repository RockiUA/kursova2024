import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Matches, Min } from 'class-validator';
import { serverConfig } from '@config/server.config';
import { SortOptions } from '@/config/interfaces';

@InputType({ isAbstract: true })
export class GetParametersInput {
  @Field(() => String, {
    description: 'Order',
    nullable: true,
    defaultValue: serverConfig.multipleRowsRequest.sortOptions.order,
  })
  @IsOptional()
  @IsString()
  @Matches(new RegExp(`^(${Object.values(SortOptions).join('|')})$`, 'gm'), {
    message: 'Incorrect order parameter! Please use ASC or DESC.',
  })
  readonly order: SortOptions = serverConfig.multipleRowsRequest.sortOptions.order;

  @Field({
    description: 'Limit',
    nullable: true,
    defaultValue: serverConfig.multipleRowsRequest.limit,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  readonly limit: number = serverConfig.multipleRowsRequest.limit;

  @Field({
    description: 'Offset',
    nullable: true,
    defaultValue: serverConfig.multipleRowsRequest.offset,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  readonly offset: number = serverConfig.multipleRowsRequest.offset;
}
