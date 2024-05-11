import { InputType } from '@nestjs/graphql';
import { CreateUserInput } from '@user/dto';

@InputType()
export class SignUpInput extends CreateUserInput {}
