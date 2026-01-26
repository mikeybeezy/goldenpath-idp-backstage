/**
 * Jest configuration for Backstage
 *
 * This extends the default backstage-cli configuration and adds:
 * - Coverage thresholds per ADR-0182 (TDD Philosophy)
 * - Coverage collection settings
 *
 * Reference: ADR-0164 Agent Trust Architecture
 * NOTE: Modifying coverage thresholds requires CODEOWNER approval.
 */

module.exports = {
  // Extend backstage-cli's default configuration
  ...require('@backstage/cli/config/jest'),

  // Coverage collection settings
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    'plugins/*/src/**/*.{ts,tsx}',
    // Exclude patterns
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/dist/**',
    '!**/index.{ts,tsx}',
    '!**/setupTests.ts',
  ],

  // Coverage thresholds - PROTECTED per ADR-0164
  // Modifying these values requires human approval
  coverageThreshold: {
    global: {
      // V1 targets (current)
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
      // V1.1 targets: 50%
      // V2 targets: 70%
    },
  },

  // Coverage reporters
  coverageReporters: ['text', 'text-summary', 'lcov', 'html', 'json-summary'],

  // Coverage output directory
  coverageDirectory: '<rootDir>/coverage',
};
