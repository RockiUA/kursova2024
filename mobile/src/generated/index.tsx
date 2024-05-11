import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Authenticated = {
  readonly __typename?: 'Authenticated';
  /** User authenticated state. */
  readonly authenticated: Scalars['Boolean']['output'];
};

export type City = {
  readonly __typename?: 'City';
  /** Country name. */
  readonly country: Scalars['String']['output'];
  /** City ID */
  readonly id: Scalars['ID']['output'];
  /** City latitude */
  readonly latitude: Scalars['Float']['output'];
  /** City longitude */
  readonly longitude: Scalars['Float']['output'];
  /** City name */
  readonly name: Scalars['String']['output'];
};

export type CityCoordinates = {
  readonly __typename?: 'CityCoordinates';
  /** City latitude */
  readonly latitude: Scalars['Float']['output'];
  /** City longitude */
  readonly longitude: Scalars['Float']['output'];
};

export type CityForecast = {
  readonly __typename?: 'CityForecast';
  /** Coordinates of city. */
  readonly cityCoordinates: CityCoordinates;
  /** Name of city. */
  readonly cityName: Scalars['String']['output'];
  /** City ID. */
  readonly id: Scalars['ID']['output'];
};

export type CreateRoleInput = {
  /** Role description */
  readonly description: Scalars['String']['input'];
  /** Role name */
  readonly name: Scalars['String']['input'];
};

export type CurrentWeather = {
  readonly __typename?: 'CurrentWeather';
  /** Weather data of this city. */
  readonly city: CityForecast;
  /** Current weather. */
  readonly weather: Weather;
};

export type FetchForecastInput = {
  /** Number of days for which the weather forecast should be obtained. */
  readonly days?: InputMaybe<Scalars['Int']['input']>;
};

export type Forecast = {
  readonly __typename?: 'Forecast';
  /** Forecasts of this city. */
  readonly city: CityForecast;
  /** Forecasts. */
  readonly forecasts: ReadonlyArray<Maybe<Weather>>;
};

export type GetCityInput = {
  /** City ID */
  readonly id?: InputMaybe<Scalars['ID']['input']>;
  /** City latitude */
  readonly latitude?: InputMaybe<Scalars['Float']['input']>;
  /** City longitude */
  readonly longitude?: InputMaybe<Scalars['Float']['input']>;
  /** City name */
  readonly name?: InputMaybe<Scalars['String']['input']>;
};

export type GetCityParametersInput = {
  /** Limit */
  readonly limit?: InputMaybe<Scalars['Float']['input']>;
  /** Offset */
  readonly offset?: InputMaybe<Scalars['Float']['input']>;
  /** Order */
  readonly order?: InputMaybe<Scalars['String']['input']>;
  /** Sort by */
  readonly sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetRoleInput = {
  /** Role description */
  readonly description?: InputMaybe<Scalars['String']['input']>;
  /** Role ID */
  readonly id?: InputMaybe<Scalars['ID']['input']>;
  /** Role name */
  readonly name?: InputMaybe<Scalars['String']['input']>;
};

export type GetRoleParametersInput = {
  /** Limit */
  readonly limit?: InputMaybe<Scalars['Float']['input']>;
  /** Offset */
  readonly offset?: InputMaybe<Scalars['Float']['input']>;
  /** Order */
  readonly order?: InputMaybe<Scalars['String']['input']>;
  /** Sort by */
  readonly sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly addUserCities: ReadonlyArray<UserCity>;
  readonly addUserRole: UserRole;
  readonly createRole: Role;
  readonly deleteRole?: Maybe<Scalars['Int']['output']>;
  readonly deleteUserCities: Scalars['Int']['output'];
  readonly deleteUserRole?: Maybe<ReadonlyArray<UserRole>>;
  readonly logout: Authenticated;
  readonly refresh: Authenticated;
  readonly signIn: Authenticated;
  readonly signUp: Authenticated;
  readonly updatePassword: ReadonlyArray<User>;
  readonly updateRole: ReadonlyArray<Role>;
  readonly updateUser?: Maybe<ReadonlyArray<User>>;
  readonly updateUserCity?: Maybe<ReadonlyArray<UserCity>>;
  readonly updateUserRole?: Maybe<ReadonlyArray<UserRole>>;
};


export type MutationAddUserCitiesArgs = {
  payload: ReadonlyArray<GetCityInput>;
};


export type MutationAddUserRoleArgs = {
  role: Scalars['Int']['input'];
  user: Scalars['Int']['input'];
};


export type MutationCreateRoleArgs = {
  role: CreateRoleInput;
};


export type MutationDeleteRoleArgs = {
  filter: GetRoleInput;
};


export type MutationDeleteUserCitiesArgs = {
  payload: ReadonlyArray<GetCityInput>;
};


export type MutationDeleteUserRoleArgs = {
  role: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdatePasswordArgs = {
  payload: UpdatePasswordInput;
};


export type MutationUpdateRoleArgs = {
  filter: GetRoleInput;
  payload: UpdateRoleInput;
};


export type MutationUpdateUserArgs = {
  payload: UpdateUserInput;
};


export type MutationUpdateUserCityArgs = {
  filter: GetCityInput;
  payload: GetCityInput;
};


export type MutationUpdateUserRoleArgs = {
  current_role: Scalars['Int']['input'];
  new_role: Scalars['Int']['input'];
  user: Scalars['Int']['input'];
};

export type Query = {
  readonly __typename?: 'Query';
  readonly cities?: Maybe<ReadonlyArray<City>>;
  readonly city?: Maybe<City>;
  readonly fetchCurrentWeatherByCity?: Maybe<ReadonlyArray<CurrentWeather>>;
  readonly fetchCurrentWeatherByUser?: Maybe<ReadonlyArray<CurrentWeather>>;
  readonly fetchForecastByCity?: Maybe<ReadonlyArray<Forecast>>;
  readonly fetchForecastByUser?: Maybe<ReadonlyArray<Forecast>>;
  readonly me?: Maybe<User>;
  readonly role?: Maybe<Role>;
  readonly roles?: Maybe<ReadonlyArray<Role>>;
};


export type QueryCitiesArgs = {
  filter?: InputMaybe<GetCityInput>;
  parameters?: InputMaybe<GetCityParametersInput>;
};


export type QueryCityArgs = {
  filter: GetCityInput;
};


export type QueryFetchCurrentWeatherByCityArgs = {
  filter: GetCityInput;
};


export type QueryFetchForecastByCityArgs = {
  filter: GetCityInput;
  options?: InputMaybe<FetchForecastInput>;
};


export type QueryFetchForecastByUserArgs = {
  options?: InputMaybe<FetchForecastInput>;
};


export type QueryRoleArgs = {
  filter: GetRoleInput;
};


export type QueryRolesArgs = {
  filter?: InputMaybe<GetRoleInput>;
  parameters?: InputMaybe<GetRoleParametersInput>;
};

export type Role = {
  readonly __typename?: 'Role';
  /** Role description */
  readonly description?: Maybe<Scalars['String']['output']>;
  /** Role ID */
  readonly id: Scalars['ID']['output'];
  /** Role name */
  readonly name?: Maybe<Scalars['String']['output']>;
};

export type SignInInput = {
  /** User Email */
  readonly email: Scalars['String']['input'];
  /** User Password */
  readonly password: Scalars['String']['input'];
};

export type SignUpInput = {
  /** User Email */
  readonly email: Scalars['String']['input'];
  /** User Password */
  readonly password: Scalars['String']['input'];
};

export type UpdatePasswordInput = {
  /** New user password */
  readonly newPassword: Scalars['String']['input'];
  /** Current user password */
  readonly oldPassword: Scalars['String']['input'];
};

export type UpdateRoleInput = {
  /** Role description */
  readonly description?: InputMaybe<Scalars['String']['input']>;
  /** Role name */
  readonly name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  /** User Email */
  readonly email?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  readonly __typename?: 'User';
  /** User pinned cities */
  readonly cities: ReadonlyArray<Maybe<City>>;
  /** User Email */
  readonly email: Scalars['String']['output'];
  /** User ID */
  readonly id: Scalars['ID']['output'];
  /** User Roles */
  readonly roles: ReadonlyArray<Maybe<Role>>;
};

export type UserCity = {
  readonly __typename?: 'UserCity';
  /** City ID */
  readonly cityId: Scalars['ID']['output'];
  /** User-city relation ID */
  readonly id: Scalars['ID']['output'];
  /** User ID */
  readonly userId: Scalars['ID']['output'];
};

export type UserRole = {
  readonly __typename?: 'UserRole';
  /** User-role relation ID */
  readonly id: Scalars['ID']['output'];
  /** Role ID */
  readonly roleId: Scalars['ID']['output'];
  /** User ID */
  readonly userId: Scalars['ID']['output'];
};

export type Weather = {
  readonly __typename?: 'Weather';
  /** Forecast date. */
  readonly date: Scalars['String']['output'];
  /** Humidity. */
  readonly humidity: Scalars['Int']['output'];
  /** Pressure. */
  readonly pressure: Scalars['Int']['output'];
  /** Forecast temperature. */
  readonly temperature: Scalars['Float']['output'];
  /** Temperature feels like. */
  readonly temperatureFeelsLike: Scalars['Float']['output'];
  /** Weather condition. */
  readonly weather: Scalars['String']['output'];
  /** Weather description. */
  readonly weatherDescription: Scalars['String']['output'];
  /** Weather icon */
  readonly weatherIcon: Scalars['String']['output'];
  /** Speed of wind. */
  readonly windSpeed: Scalars['Float']['output'];
};

export type AddUserCitiesMutationVariables = Exact<{
  payload: ReadonlyArray<GetCityInput> | GetCityInput;
}>;


export type AddUserCitiesMutation = { readonly __typename?: 'Mutation', readonly userCities: ReadonlyArray<{ readonly __typename?: 'UserCity', readonly userId: string, readonly cityId: string }> };

export type DeleteUserCitiesMutationVariables = Exact<{
  payload: ReadonlyArray<GetCityInput> | GetCityInput;
}>;


export type DeleteUserCitiesMutation = { readonly __typename?: 'Mutation', readonly userCities: number };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { readonly __typename?: 'Mutation', readonly logout: { readonly __typename?: 'Authenticated', readonly authenticated: boolean } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { readonly __typename?: 'Mutation', readonly refresh: { readonly __typename?: 'Authenticated', readonly authenticated: boolean } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { readonly __typename?: 'Mutation', readonly signIn: { readonly __typename?: 'Authenticated', readonly authenticated: boolean } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { readonly __typename?: 'Mutation', readonly signUp: { readonly __typename?: 'Authenticated', readonly authenticated: boolean } };

export type UpdatePasswordMutationVariables = Exact<{
  payload: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { readonly __typename?: 'Mutation', readonly user: ReadonlyArray<{ readonly __typename?: 'User', readonly id: string, readonly email: string, readonly cities: ReadonlyArray<{ readonly __typename?: 'City', readonly id: string, readonly name: string, readonly longitude: number, readonly latitude: number } | null> }> };

export type UpdateUserCityMutationVariables = Exact<{
  filter: GetCityInput;
  payload: GetCityInput;
}>;


export type UpdateUserCityMutation = { readonly __typename?: 'Mutation', readonly userCities?: ReadonlyArray<{ readonly __typename?: 'UserCity', readonly userId: string, readonly cityId: string }> | null };

export type UpdateUserMutationVariables = Exact<{
  payload: UpdateUserInput;
}>;


export type UpdateUserMutation = { readonly __typename?: 'Mutation', readonly user?: ReadonlyArray<{ readonly __typename?: 'User', readonly id: string, readonly email: string, readonly cities: ReadonlyArray<{ readonly __typename?: 'City', readonly id: string, readonly name: string, readonly longitude: number, readonly latitude: number } | null> }> | null };

export type CitiesQueryVariables = Exact<{
  filter?: InputMaybe<GetCityInput>;
  parameters?: InputMaybe<GetCityParametersInput>;
}>;


export type CitiesQuery = { readonly __typename?: 'Query', readonly cities?: ReadonlyArray<{ readonly __typename?: 'City', readonly id: string, readonly name: string, readonly country: string, readonly latitude: number, readonly longitude: number }> | null };

export type CityQueryVariables = Exact<{
  filter: GetCityInput;
}>;


export type CityQuery = { readonly __typename?: 'Query', readonly city?: { readonly __typename?: 'City', readonly id: string, readonly name: string, readonly country: string, readonly latitude: number, readonly longitude: number } | null };

export type FetchCurrentWeatherByCityQueryVariables = Exact<{
  filter: GetCityInput;
}>;


export type FetchCurrentWeatherByCityQuery = { readonly __typename?: 'Query', readonly weather?: ReadonlyArray<{ readonly __typename?: 'CurrentWeather', readonly weather: { readonly __typename?: 'Weather', readonly date: string, readonly temperature: number, readonly temperatureFeelsLike: number, readonly weather: string, readonly weatherDescription: string, readonly weatherIcon: string, readonly windSpeed: number, readonly humidity: number, readonly pressure: number }, readonly city: { readonly __typename?: 'CityForecast', readonly cityName: string, readonly cityCoordinates: { readonly __typename?: 'CityCoordinates', readonly latitude: number, readonly longitude: number } } }> | null };

export type FetchCurrentWeatherByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCurrentWeatherByUserQuery = { readonly __typename?: 'Query', readonly weather?: ReadonlyArray<{ readonly __typename?: 'CurrentWeather', readonly weather: { readonly __typename?: 'Weather', readonly date: string, readonly temperature: number, readonly temperatureFeelsLike: number, readonly weather: string, readonly weatherDescription: string, readonly weatherIcon: string, readonly windSpeed: number, readonly humidity: number, readonly pressure: number }, readonly city: { readonly __typename?: 'CityForecast', readonly id: string, readonly cityName: string, readonly cityCoordinates: { readonly __typename?: 'CityCoordinates', readonly latitude: number, readonly longitude: number } } }> | null };

export type FetchForecastByCityQueryVariables = Exact<{
  filter: GetCityInput;
  options?: InputMaybe<FetchForecastInput>;
}>;


export type FetchForecastByCityQuery = { readonly __typename?: 'Query', readonly forecast?: ReadonlyArray<{ readonly __typename?: 'Forecast', readonly forecasts: ReadonlyArray<{ readonly __typename?: 'Weather', readonly date: string, readonly temperature: number, readonly temperatureFeelsLike: number, readonly weather: string, readonly weatherDescription: string, readonly weatherIcon: string, readonly windSpeed: number } | null>, readonly city: { readonly __typename?: 'CityForecast', readonly cityName: string, readonly cityCoordinates: { readonly __typename?: 'CityCoordinates', readonly latitude: number, readonly longitude: number } } }> | null };

export type FetchForecastByUserQueryVariables = Exact<{
  options?: InputMaybe<FetchForecastInput>;
}>;


export type FetchForecastByUserQuery = { readonly __typename?: 'Query', readonly forecast?: ReadonlyArray<{ readonly __typename?: 'Forecast', readonly forecasts: ReadonlyArray<{ readonly __typename?: 'Weather', readonly date: string, readonly temperature: number, readonly temperatureFeelsLike: number, readonly weather: string, readonly weatherDescription: string, readonly weatherIcon: string, readonly windSpeed: number } | null>, readonly city: { readonly __typename?: 'CityForecast', readonly cityName: string, readonly cityCoordinates: { readonly __typename?: 'CityCoordinates', readonly latitude: number, readonly longitude: number } } }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { readonly __typename?: 'Query', readonly me?: { readonly __typename?: 'User', readonly id: string, readonly email: string } | null };


export const AddUserCitiesDocument = gql`
    mutation addUserCities($payload: [GetCityInput!]!) {
  userCities: addUserCities(payload: $payload) {
    userId
    cityId
  }
}
    `;
export type AddUserCitiesMutationFn = Apollo.MutationFunction<AddUserCitiesMutation, AddUserCitiesMutationVariables>;

/**
 * __useAddUserCitiesMutation__
 *
 * To run a mutation, you first call `useAddUserCitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserCitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserCitiesMutation, { data, loading, error }] = useAddUserCitiesMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAddUserCitiesMutation(baseOptions?: Apollo.MutationHookOptions<AddUserCitiesMutation, AddUserCitiesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserCitiesMutation, AddUserCitiesMutationVariables>(AddUserCitiesDocument, options);
      }
export type AddUserCitiesMutationHookResult = ReturnType<typeof useAddUserCitiesMutation>;
export type AddUserCitiesMutationResult = Apollo.MutationResult<AddUserCitiesMutation>;
export type AddUserCitiesMutationOptions = Apollo.BaseMutationOptions<AddUserCitiesMutation, AddUserCitiesMutationVariables>;
export const DeleteUserCitiesDocument = gql`
    mutation deleteUserCities($payload: [GetCityInput!]!) {
  userCities: deleteUserCities(payload: $payload)
}
    `;
export type DeleteUserCitiesMutationFn = Apollo.MutationFunction<DeleteUserCitiesMutation, DeleteUserCitiesMutationVariables>;

/**
 * __useDeleteUserCitiesMutation__
 *
 * To run a mutation, you first call `useDeleteUserCitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserCitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserCitiesMutation, { data, loading, error }] = useDeleteUserCitiesMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useDeleteUserCitiesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserCitiesMutation, DeleteUserCitiesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserCitiesMutation, DeleteUserCitiesMutationVariables>(DeleteUserCitiesDocument, options);
      }
export type DeleteUserCitiesMutationHookResult = ReturnType<typeof useDeleteUserCitiesMutation>;
export type DeleteUserCitiesMutationResult = Apollo.MutationResult<DeleteUserCitiesMutation>;
export type DeleteUserCitiesMutationOptions = Apollo.BaseMutationOptions<DeleteUserCitiesMutation, DeleteUserCitiesMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    authenticated
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshDocument = gql`
    mutation refresh {
  refresh {
    authenticated
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($input: SignInInput!) {
  signIn(input: $input) {
    authenticated
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpInput!) {
  signUp(input: $input) {
    authenticated
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($payload: UpdatePasswordInput!) {
  user: updatePassword(payload: $payload) {
    id
    email
    cities {
      id
      name
      longitude
      latitude
    }
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserCityDocument = gql`
    mutation updateUserCity($filter: GetCityInput!, $payload: GetCityInput!) {
  userCities: updateUserCity(filter: $filter, payload: $payload) {
    userId
    cityId
  }
}
    `;
export type UpdateUserCityMutationFn = Apollo.MutationFunction<UpdateUserCityMutation, UpdateUserCityMutationVariables>;

/**
 * __useUpdateUserCityMutation__
 *
 * To run a mutation, you first call `useUpdateUserCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserCityMutation, { data, loading, error }] = useUpdateUserCityMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateUserCityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserCityMutation, UpdateUserCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserCityMutation, UpdateUserCityMutationVariables>(UpdateUserCityDocument, options);
      }
export type UpdateUserCityMutationHookResult = ReturnType<typeof useUpdateUserCityMutation>;
export type UpdateUserCityMutationResult = Apollo.MutationResult<UpdateUserCityMutation>;
export type UpdateUserCityMutationOptions = Apollo.BaseMutationOptions<UpdateUserCityMutation, UpdateUserCityMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($payload: UpdateUserInput!) {
  user: updateUser(payload: $payload) {
    id
    email
    cities {
      id
      name
      longitude
      latitude
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CitiesDocument = gql`
    query cities($filter: GetCityInput, $parameters: GetCityParametersInput) {
  cities: cities(filter: $filter, parameters: $parameters) {
    id
    name
    country
    latitude
    longitude
  }
}
    `;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useCitiesQuery(baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const CityDocument = gql`
    query city($filter: GetCityInput!) {
  city: city(filter: $filter) {
    id
    name
    country
    latitude
    longitude
  }
}
    `;

/**
 * __useCityQuery__
 *
 * To run a query within a React component, call `useCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCityQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCityQuery(baseOptions: Apollo.QueryHookOptions<CityQuery, CityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CityQuery, CityQueryVariables>(CityDocument, options);
      }
export function useCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CityQuery, CityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CityQuery, CityQueryVariables>(CityDocument, options);
        }
export type CityQueryHookResult = ReturnType<typeof useCityQuery>;
export type CityLazyQueryHookResult = ReturnType<typeof useCityLazyQuery>;
export type CityQueryResult = Apollo.QueryResult<CityQuery, CityQueryVariables>;
export const FetchCurrentWeatherByCityDocument = gql`
    query fetchCurrentWeatherByCity($filter: GetCityInput!) {
  weather: fetchCurrentWeatherByCity(filter: $filter) {
    weather {
      date
      temperature
      temperatureFeelsLike
      weather
      weatherDescription
      weatherIcon
      windSpeed
      humidity
      pressure
    }
    city {
      cityName
      cityCoordinates {
        latitude
        longitude
      }
    }
  }
}
    `;

/**
 * __useFetchCurrentWeatherByCityQuery__
 *
 * To run a query within a React component, call `useFetchCurrentWeatherByCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCurrentWeatherByCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCurrentWeatherByCityQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFetchCurrentWeatherByCityQuery(baseOptions: Apollo.QueryHookOptions<FetchCurrentWeatherByCityQuery, FetchCurrentWeatherByCityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCurrentWeatherByCityQuery, FetchCurrentWeatherByCityQueryVariables>(FetchCurrentWeatherByCityDocument, options);
      }
export function useFetchCurrentWeatherByCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCurrentWeatherByCityQuery, FetchCurrentWeatherByCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCurrentWeatherByCityQuery, FetchCurrentWeatherByCityQueryVariables>(FetchCurrentWeatherByCityDocument, options);
        }
export type FetchCurrentWeatherByCityQueryHookResult = ReturnType<typeof useFetchCurrentWeatherByCityQuery>;
export type FetchCurrentWeatherByCityLazyQueryHookResult = ReturnType<typeof useFetchCurrentWeatherByCityLazyQuery>;
export type FetchCurrentWeatherByCityQueryResult = Apollo.QueryResult<FetchCurrentWeatherByCityQuery, FetchCurrentWeatherByCityQueryVariables>;
export const FetchCurrentWeatherByUserDocument = gql`
    query fetchCurrentWeatherByUser {
  weather: fetchCurrentWeatherByUser {
    weather {
      date
      temperature
      temperatureFeelsLike
      weather
      weatherDescription
      weatherIcon
      windSpeed
      humidity
      pressure
    }
    city {
      id
      cityName
      cityCoordinates {
        latitude
        longitude
      }
    }
  }
}
    `;

/**
 * __useFetchCurrentWeatherByUserQuery__
 *
 * To run a query within a React component, call `useFetchCurrentWeatherByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCurrentWeatherByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCurrentWeatherByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCurrentWeatherByUserQuery(baseOptions?: Apollo.QueryHookOptions<FetchCurrentWeatherByUserQuery, FetchCurrentWeatherByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCurrentWeatherByUserQuery, FetchCurrentWeatherByUserQueryVariables>(FetchCurrentWeatherByUserDocument, options);
      }
export function useFetchCurrentWeatherByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCurrentWeatherByUserQuery, FetchCurrentWeatherByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCurrentWeatherByUserQuery, FetchCurrentWeatherByUserQueryVariables>(FetchCurrentWeatherByUserDocument, options);
        }
export type FetchCurrentWeatherByUserQueryHookResult = ReturnType<typeof useFetchCurrentWeatherByUserQuery>;
export type FetchCurrentWeatherByUserLazyQueryHookResult = ReturnType<typeof useFetchCurrentWeatherByUserLazyQuery>;
export type FetchCurrentWeatherByUserQueryResult = Apollo.QueryResult<FetchCurrentWeatherByUserQuery, FetchCurrentWeatherByUserQueryVariables>;
export const FetchForecastByCityDocument = gql`
    query fetchForecastByCity($filter: GetCityInput!, $options: FetchForecastInput) {
  forecast: fetchForecastByCity(filter: $filter, options: $options) {
    forecasts {
      date
      temperature
      temperatureFeelsLike
      weather
      weatherDescription
      weatherIcon
      windSpeed
    }
    city {
      cityName
      cityCoordinates {
        latitude
        longitude
      }
    }
  }
}
    `;

/**
 * __useFetchForecastByCityQuery__
 *
 * To run a query within a React component, call `useFetchForecastByCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchForecastByCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchForecastByCityQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useFetchForecastByCityQuery(baseOptions: Apollo.QueryHookOptions<FetchForecastByCityQuery, FetchForecastByCityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchForecastByCityQuery, FetchForecastByCityQueryVariables>(FetchForecastByCityDocument, options);
      }
export function useFetchForecastByCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchForecastByCityQuery, FetchForecastByCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchForecastByCityQuery, FetchForecastByCityQueryVariables>(FetchForecastByCityDocument, options);
        }
export type FetchForecastByCityQueryHookResult = ReturnType<typeof useFetchForecastByCityQuery>;
export type FetchForecastByCityLazyQueryHookResult = ReturnType<typeof useFetchForecastByCityLazyQuery>;
export type FetchForecastByCityQueryResult = Apollo.QueryResult<FetchForecastByCityQuery, FetchForecastByCityQueryVariables>;
export const FetchForecastByUserDocument = gql`
    query fetchForecastByUser($options: FetchForecastInput) {
  forecast: fetchForecastByUser(options: $options) {
    forecasts {
      date
      temperature
      temperatureFeelsLike
      weather
      weatherDescription
      weatherIcon
      windSpeed
    }
    city {
      cityName
      cityCoordinates {
        latitude
        longitude
      }
    }
  }
}
    `;

/**
 * __useFetchForecastByUserQuery__
 *
 * To run a query within a React component, call `useFetchForecastByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchForecastByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchForecastByUserQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useFetchForecastByUserQuery(baseOptions?: Apollo.QueryHookOptions<FetchForecastByUserQuery, FetchForecastByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchForecastByUserQuery, FetchForecastByUserQueryVariables>(FetchForecastByUserDocument, options);
      }
export function useFetchForecastByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchForecastByUserQuery, FetchForecastByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchForecastByUserQuery, FetchForecastByUserQueryVariables>(FetchForecastByUserDocument, options);
        }
export type FetchForecastByUserQueryHookResult = ReturnType<typeof useFetchForecastByUserQuery>;
export type FetchForecastByUserLazyQueryHookResult = ReturnType<typeof useFetchForecastByUserLazyQuery>;
export type FetchForecastByUserQueryResult = Apollo.QueryResult<FetchForecastByUserQuery, FetchForecastByUserQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;