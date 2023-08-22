# Multilayer Network Dashboard

**NOTE: I have written this README using declarative sentences as it might appear when published. However some parts are not implemented yet.**

## Getting Started

Please see the [Getting Started](/docs/documents/gettingstarted.md) section for instructions on how to get started with this project.

## Documentation

Please see the [Summary](/docs/documents/summary.md) of directory for documentation.

## Contributing

Please see our [Contributing Guide](/CONTRIBUTING) for more information. If you have any questions, please contact me `samratbaral.sb [at] gmail [dot] com`.

## Setup ENV File

- APP_NAME=
- APP_ENV=
- MONGODB_URI=
- PORT=
- APP_DIRECTORY=
- APP_ADMIN_DIRECTORY=
- APP_USER_DIRECTORY=


## Dev notes

Need to Update/Upgrade:

- filler content in /homepage
- get started with organization page
- create organization page (accessible from account settings)
- account settings.
- database working need privilege on the database for network IP address.
- make graphql server schema, endpoint, and resolvers
- backend/api documentation

TODO: sidebar have two tabs visible for all research tab.

- show all files: then users open individual files with a default or user-specified file viewer
- show all projects: then users open individual projects with

TODO: Research tab: after log-in

- [ ] User directory integration with flask app.
- [ ] Layer generation config file integration with flask app.
- [ ] Analysis file integration with flask app.
- [ ] Visualization integration with flask app.

Later TODO's:

- [ ] add prisma seed command to create `system` and `anonymous` users
- [ ] add unit and integration tests
- [ ] implement single file server endpoint GET/POST/LIST/DELETE.
- [ ] don't show files that the user doesn't have access to.
- [ ] add captcha to create account.
- [ ] obtain API keys to authenticate with Google, Facebook, etc. and enable third-party authentication
