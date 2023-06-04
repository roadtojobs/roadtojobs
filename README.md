# Interview Journey

Every journey has its meaning, the same goes for Interview Journey.

Interview Journey is an OSS software for single & self-hosted usage.

## Features

Interview Journey helps you to:

- Create a journey for every interview period in your life.
- Mark a goal for the journey and start to tackle it.
- Track every status and proactively handle the progress of interview.
- Noted everything, noted today, great lessons for tomorrow.
- Quickly generate your own blacklisted, personal avoid,... for future references.
- ...

We are all human, and we can't remember everything from the past, so we should have an appropriate platform to assist us.

Interview Journey aims to be your companion, helping you document every detail of your job-seeking journey.

## Technology
- NodeJS 18 x TypeScript
- [SurrealDB](https://surrealdb.com/)
- Vue 3 x TypeScript
- TailwindCSS for UI/UX

## Project Structure
Interview Journey is a monorepo which contains:

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

Checkout [Deployment](/) for more information.

## Contributing
Thank you for considering contributing to the Interview Journey! 
The contribution guide can be found in the [Contribution Documentation](/)

## Code of Conduct
In order to ensure that the Interview Journey community is welcoming to all, please review and abide by the Code of Conduct.

## Security Vulnerabilities
If you discover a security vulnerability within Interview Journey, please send an e-mail to Seth Phat via [phattranminh96@gmail.com](phattranminh96@gmail.com). 
All security vulnerabilities will be promptly addressed.

## License
The Interview Journey is open-sourced software licensed under the MIT license.
