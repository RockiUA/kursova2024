# Sunny Days App.
## Before start:
Since this project will be built in a Docker container, make sure that this technology is available on your device.

## Project launching:
After build, it can be started by running the following command:

    docker-compose -f ./docker-compose.development.yml up

For starting development environment. For production:

    docker-compose -f ./docker-compose.production.yml up

It will run builds of both server-side and client-side after migrating and seeding PostgreSQL database. Also, if you need to migrate and seed separately PostgreSQL database, you can run command:

    npm run prepare:postgres

But for that, you will need to configure `.env` file variables for working with some concrete PostgreSQL database.

## Mobile project:
You can start project in development mode by using following command:

    npm run start

For checking result, you should use your camera `(IOS)` or download `Expo Go` app `(Android)`.

For building project, you need to set up `EXPO_PUBLIC_DOMAIN_URL` variable is `eas secrets`. This could be done by following command:

    eas secret:create --scope project --name EXPO_PUBLIC_DOMAIN_URL --value https://exapmle.com --type string

After that, you can run application build with such command:

    eas build --platform your_platform --profile={development|preview|production}