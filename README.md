# Road To Jobs - The open-source Interview Tracking app

Every journey has its meaning, the same goes for Interview Journey.

Road To Jobs is an OSS software for single & self-hosted usage.

Note: this is still heavily under development. Stays tuned!!!

## Features

Road To Jobs helps you to:

- Create a journey for every interview period in your life.
- Mark a goal for the journey and start to tackle it.
- Track every status and proactively handle the progress of interview.
- Noted everything, noted today, great lessons for tomorrow.
- Quickly generate your own blacklisted, personal avoid,... for future references.
- ...

We are all human, and we can't remember everything from the past, so we should have an appropriate platform to assist us.

Road To Jobs aims to be your companion, helping you document every detail of your job-seeking journey.

## Technology
- NodeJS 18 x TypeScript
- [SurrealDB](https://surrealdb.com/)
- Vue 3 x TypeScript
- TailwindCSS for UI/UX

## Project Structure
Road To Jobs is a monorepo which contains:

- `server`: Backend
- `web`: Frontend
- `shared`: Stuff that can be used from both `server` & `web`
- `tests-e2e`: E2E test cases to test the Deployed Application.

## Development

Check out this project (on `main` (not stable) or on latest tag (stable))

### Booting up the projects

```bash
# From root path
sh ./bin/bootstrap.sh
```

Note: to run SurrealDB, check [this](https://surrealdb.com/install). We also add the `docker-compose.yml` if 
you are using Docker.

### Start the development mode

```bash
# From root path
npm run start
```

### Run the tests

```bash
# From root path
npm run test
```

## Production

Checkout [Deployment](./README.md) for more information.

## Contributing
Thank you for considering contributing to the Road To Jobs! 
The contribution guide can be found in the [Contribution Documentation](./README.md)

## Code of Conduct
In order to ensure that the Road To Jobs community is welcoming to all, please review and abide by the Code of Conduct.

## Security Vulnerabilities
If you discover a security vulnerability within Interview Journey, please send an e-mail to Seth Phat via [security@sethphat.com](security@sethphat.com). 
All security vulnerabilities will be promptly addressed.

## License
The Interview Journey is open-sourced software licensed under the MIT license.
