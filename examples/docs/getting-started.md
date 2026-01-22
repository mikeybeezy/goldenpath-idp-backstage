# Getting Started

This guide will help you get started with the Example Website.

## Prerequisites

- Node.js 22+
- Docker (optional)

## Installation

```bash
# Clone the repository
git clone https://github.com/example/example-website.git

# Install dependencies
yarn install

# Start development server
yarn start
```

## Configuration

Create a `.env` file with the following variables:

```env
API_URL=http://localhost:8080
LOG_LEVEL=debug
```

## Running Tests

```bash
# Run unit tests
yarn test

# Run integration tests
yarn test:integration
```

## Deployment

The application can be deployed using:

1. **Docker**: `docker build -t example-website .`
2. **Kubernetes**: Apply the manifests in `k8s/`

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Connection refused | Check API_URL configuration |
| Build failures | Clear node_modules and reinstall |

## Next Steps

- Review the [API documentation](/docs/default/api/example-grpc-api)
- Check the [Architecture Diagram](index.md#architecture)
