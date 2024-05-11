export interface GetParametersOutput {
  order: [string, 'ASC' | 'DESC'][];
  limit: number;
  offset: number;
}
