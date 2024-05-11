import { ApolloError } from '@apollo/client';
import { message } from '@lib/apollo/apollo-constants';

/**
 *  Function for passing error into `message` global state.
 *  This will cause error message render.
 *
 * @param error - error to show.
 */
export const showErrorMessage = (error: ApolloError): void => {
  message(error.message);
};
