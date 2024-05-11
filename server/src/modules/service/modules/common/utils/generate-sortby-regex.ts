/**
 * Creates regex for validating sortBy values, based on provided
 *   allowedValues.
 * @param allowedValues - array of allowed values.
 * @returns regex for validating sortBy parameter.
 */
export function generateSortByRegex(allowedValues: string[]): RegExp {
  return new RegExp(`^(${allowedValues.join('|')})$`, 'gm');
}
