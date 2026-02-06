# Contributing

Thanks for your interest in contributing to this Grafana panel plugin. This document explains how to prepare contributions, run the project locally, and what we look for in pull requests.

See the main [README.md](README.md) for project overview and architecture.

## Getting started

- Fork the repository and create a feature branch from `main`.
- Use descriptive branch names (e.g., `feat/add-user-auth`, `fix/panel-rendering`).
- Keep changes small and focused; one feature or bug fix per PR.

## Local development

We provide a top-level `Makefile` to simplify common tasks. From the repository root run:

```sh
# install dependencies for the plugin
make install

# build the plugin
make build

# run the unit tests
make test

# clean build artifacts
make clean

# test the plugin in a local Grafana instance
make int-test

# stop the test environment
make int-test-stop
```

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/) format:

**Types:**

- `feat`: New feature for the user
- `fix`: Bug fix
- `build`: Changes to build system or dependencies
- `docs`: Documentation only changes
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or correcting tests
- `chore`: Maintenance tasks

**Example:**

```sh
feat(chat): add message history support

Implement persistent message storage using browser localStorage.
Messages are now retained across page reloads.
```

## Testing

**Unit tests:**

- Unit tests are located in `src/` alongside source files (e.g., `module.test.ts`).
- Tests run with Jest. Keep tests small, focused, and deterministic.
- Add tests for bug fixes and core behaviors when possible.
- Run tests with: `make test`

**Integration tests:**

- Use `make int-test` to launch a local Grafana instance with the plugin installed.
- Access Grafana at http://localhost:3000 (default credentials: admin/admin).
- Manually verify panel behavior in the Grafana UI.
- Stop the environment with `make int-test-stop` when done.

## Pull request checklist

- [ ] I opened the PR against the `main` branch.
- [ ] The change has a descriptive title and follows conventional commit format.
- [ ] The PR description explains the motivation and approach.
- [ ] New code includes tests or an explanation why tests are not needed.
- [ ] I ran `make install`, `make build`, and `make test` locally without errors.
- [ ] I tested the change in a local Grafana instance using `make int-test` if applicable.
- [ ] I updated relevant documentation (README, CONTRIBUTING, plugin.json) if applicable.

Maintainers will review and give feedback. Thank you for your contribution!
