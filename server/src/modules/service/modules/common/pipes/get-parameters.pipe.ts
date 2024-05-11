import { Injectable, PipeTransform } from '@nestjs/common';
import { GetParametersInput } from '../dto/get-parameters.input';
import { GetParametersOutput } from '../interfaces/get-parameters-output.interface';

@Injectable()
export class GetParametersPipe implements PipeTransform<GetParametersInput & { sortBy: string }, GetParametersOutput> {
  public transform(value: GetParametersInput & { sortBy: string }): GetParametersOutput {
    const { order, offset, limit } = new GetParametersInput();

    return {
      order: [[`${value?.sortBy ?? 'id'}`, value?.order ?? order]],
      limit: Number(value?.limit ?? limit),
      offset: Number(value?.offset ?? offset),
    };
  }
}
