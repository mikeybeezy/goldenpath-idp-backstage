# GoldenPath IDP - Backstage Makefile
# ==================================
# Purpose: Portable CI targets for platform-agnostic builds
# Reference: ADR-0164 Agent Trust Architecture
#
# This Makefile provides standardized targets that can be called from
# any CI platform (GitHub Actions, GitLab CI, Jenkins, etc.) ensuring
# consistent behavior across environments.
#
# Usage:
#   make ci-lint      # Run all linting checks
#   make ci-test      # Run tests with coverage
#   make ci-build     # Build backend artifacts
#   make ci-docker    # Build Docker image (no push)
#   make ci-all       # Run full CI pipeline locally

.PHONY: ci-all ci-lint ci-test ci-build ci-docker ci-security ci-artifacts-check help

# Environment
NODE_VERSION ?= 22
DOCKER_PLATFORMS ?= linux/amd64,linux/arm64
ECR_REPOSITORY ?= goldenpath-backstage
IMAGE_TAG ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo "dev")

################################################################################
# CI Targets (called by workflow files)
################################################################################

# Full CI pipeline - mirrors what runs in GitHub Actions
ci-all: ci-artifacts-check ci-lint ci-test ci-build
	@echo "✅ CI pipeline complete"

# Check for accidentally tracked build artifacts
ci-artifacts-check:
	@echo "Checking for tracked build artifacts..."
	@if git ls-files | grep -E 'node_modules/|dist-types/|\.pnp\.(cjs|loader\.mjs)|\.yarn/unplugged/' 2>/dev/null; then \
		echo "❌ ERROR: Build artifacts should not be tracked"; \
		exit 1; \
	fi
	@echo "✅ No tracked build artifacts"

# Lint: TypeScript + ESLint + Prettier
ci-lint:
	@echo "Running type check..."
	yarn tsc
	@echo "Running ESLint..."
	yarn lint:all
	@echo "Running Prettier check..."
	yarn prettier:check
	@echo "✅ Lint checks passed"

# Test with coverage (blocking)
ci-test:
	@echo "Running tests with coverage..."
	yarn test:all --reporters=default --reporters=jest-junit
	@echo "✅ Tests passed"

# Build backend artifacts
ci-build:
	@echo "Building backend..."
	yarn build:backend
	@echo "✅ Build complete"

# Security audit (informational)
ci-security:
	@echo "Running security audit..."
	-yarn npm audit --all 2>&1 | tee audit-output.log || true
	@echo "✅ Security audit complete (check audit-output.log for details)"

# Docker build (no push - for local validation)
ci-docker:
	@echo "Building Docker image..."
	docker buildx build \
		--platform $(DOCKER_PLATFORMS) \
		--file packages/backend/Dockerfile \
		--tag $(ECR_REPOSITORY):$(IMAGE_TAG) \
		--load \
		.
	@echo "✅ Docker build complete: $(ECR_REPOSITORY):$(IMAGE_TAG)"

# Docker build and push (requires AWS credentials)
ci-docker-push:
	@if [ -z "$(ECR_REGISTRY)" ]; then \
		echo "❌ ERROR: ECR_REGISTRY not set"; \
		exit 1; \
	fi
	@echo "Building and pushing Docker image..."
	docker buildx build \
		--platform $(DOCKER_PLATFORMS) \
		--file packages/backend/Dockerfile \
		--tag $(ECR_REGISTRY)/$(ECR_REPOSITORY):$(IMAGE_TAG) \
		--tag $(ECR_REGISTRY)/$(ECR_REPOSITORY):latest \
		--push \
		.
	@echo "✅ Image pushed: $(ECR_REGISTRY)/$(ECR_REPOSITORY):$(IMAGE_TAG)"

################################################################################
# Development Targets
################################################################################

.PHONY: dev test lint build clean

# Start development server
dev:
	yarn start

# Run tests (shorthand)
test:
	yarn test

# Run linting (shorthand)
lint:
	yarn lint:all

# Build all packages
build:
	yarn build:all

# Clean build artifacts
clean:
	yarn clean

################################################################################
# Help
################################################################################

help:
	@echo "GoldenPath Backstage - Makefile Targets"
	@echo ""
	@echo "== CI Targets (for workflows) =="
	@echo "  make ci-all              # Run full CI pipeline locally"
	@echo "  make ci-artifacts-check  # Check for tracked build artifacts"
	@echo "  make ci-lint             # Run TypeScript, ESLint, Prettier"
	@echo "  make ci-test             # Run tests with coverage"
	@echo "  make ci-build            # Build backend artifacts"
	@echo "  make ci-security         # Run security audit (informational)"
	@echo "  make ci-docker           # Build Docker image locally"
	@echo "  make ci-docker-push      # Build and push to ECR (requires ECR_REGISTRY)"
	@echo ""
	@echo "== Development Targets =="
	@echo "  make dev                 # Start development server"
	@echo "  make test                # Run tests"
	@echo "  make lint                # Run linting"
	@echo "  make build               # Build all packages"
	@echo "  make clean               # Clean build artifacts"
	@echo ""
	@echo "== Variables =="
	@echo "  IMAGE_TAG=$(IMAGE_TAG)"
	@echo "  ECR_REPOSITORY=$(ECR_REPOSITORY)"
	@echo "  DOCKER_PLATFORMS=$(DOCKER_PLATFORMS)"
