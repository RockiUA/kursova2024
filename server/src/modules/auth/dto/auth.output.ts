import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Authenticated')
export class AuthOutput {
  @Field(() => Boolean, { description: 'User authenticated state.' })
  readonly authenticated: boolean;
}
