import { GraphQLError, GraphQLFormattedError } from 'graphql';

export function formatError(error: GraphQLError): GraphQLFormattedError {
  const graphQLFormattedError: GraphQLFormattedError = {
    message: error.message,
    path: error.path,
    extensions: error.extensions?.originalError as Record<string, unknown>,
  };

  return graphQLFormattedError;
}
