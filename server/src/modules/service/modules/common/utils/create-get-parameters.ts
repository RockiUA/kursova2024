import { GetParametersInput } from '../dto/get-parameters.input';
import { GetParametersOutput } from '../interfaces/get-parameters-output.interface';

export function createGetParameters(): GetParametersOutput {
  const { order, limit, offset } = new GetParametersInput();

  return {
    order: [['id', order]],
    limit: Number(limit),
    offset: Number(offset),
  };
}
