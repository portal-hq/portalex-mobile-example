# Portal Example Mobile App

> This is an example mobile app that uses an example backend that displays how you can integrate portal into your mobile app.

## Setting up your env file

- _[Follow the docs](https://docs.portalhq.io/npm-packages/storage-adapters/cloud-storage/portal-hq-gdrive-storage#create-a-google-app)_ to create a google app and configure the google drive backup option.

- Create an [Alchemy ID](https://www.alchemy.com/)

We have implemented our exchange backend that is hosted at `https://portalex-mpc.portalhq.io` which you can use to get spun up quickly but we recommend using that as a guide to implement your own backend to be used with portal.

Create your `.env` file:

```
# Used by the Portal client
ANDROID_CLIENT_ID="VALUE"
ALCHEMY_ID="VALUE"
IOS_CLIENT_ID="VALUE"

# Used by app-specific code
CUSTODIAN_SERVER_URL="https://portalex-mpc.portalhq.io"
```

## Installation

> Ensure you have recieved an npm auth token and created an `.npmrc` file in the root of this folder

_See the docs for more [info on setting up your npmrc file](https://docs.portalhq.io/reference/authentication#npm-authentication)_

### Android

```
yarn
yarn android
```

### iOS (in development)

```
yarn
cd ios
pod install
cd ..
yarn ios
```
