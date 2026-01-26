# Changelog

All notable changes to GoldenPath IDP Backstage will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Makefile** - Portable CI targets for platform-agnostic builds
  - `make ci-all` - Run full CI pipeline locally
  - `make ci-lint` - TypeScript, ESLint, Prettier checks
  - `make ci-test` - Tests with coverage
  - `make ci-build` - Backend build
  - `make ci-docker` - Docker image build (local)
  - `make ci-docker-push` - Docker build and push to ECR
  - `make ci-security` - Security audit
  - `make ci-artifacts-check` - Check for tracked build artifacts
- **Docker validation job** - PRs now validate Docker builds without pushing

### Changed
- **Unified CI workflow** - Consolidated `ci.yml`, `build-push-ecr.yml`, and `lint.yml` into single `ci.yml`
  - Eliminates duplicate `yarn tsc` and `yarn build:backend` steps
  - Docker push only runs on main branch (not PRs)
  - PRs get Docker build validation without AWS credentials
  - All functionality preserved with better organization

### Removed
- **lint.yml** - Artifact check now integrated into unified `ci.yml` lint job
- **build-push-ecr.yml** - Docker build/push now part of unified `ci.yml`

### Migration Notes
- **No breaking changes** - All CI functionality preserved
- **Faster PR builds** - Removed redundant tsc/build steps from separate workflows
- **Local CI** - Developers can now run `make ci-all` to validate locally before pushing

### References
- ADR-0164: Agent Trust and Identity Architecture
- Enterprise portability pattern: Makefile-driven CI

---

## [0.1.0] - 2025-01-XX

### Added
- Initial Backstage scaffolding
- GitHub authentication
- Kubernetes plugin
- TechDocs integration
- Software templates
