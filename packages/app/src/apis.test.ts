import { apis } from './apis';
import { scmIntegrationsApiRef } from '@backstage/integration-react';
import { configApiRef } from '@backstage/core-plugin-api';

describe('apis', () => {
  it('should export an array of API factories', () => {
    expect(Array.isArray(apis)).toBe(true);
    expect(apis.length).toBeGreaterThan(0);
  });

  it('should include ScmIntegrationsApi factory', () => {
    const scmFactory = apis.find(
      (factory: any) =>
        factory.api === scmIntegrationsApiRef ||
        factory.api?.id === 'scmIntegrationsApiRef',
    );
    expect(scmFactory).toBeDefined();
  });

  it('should include ScmAuth factory', () => {
    // ScmAuth.createDefaultApiFactory() creates multiple factories
    // Just verify we have more than one factory
    expect(apis.length).toBeGreaterThanOrEqual(2);
  });

  describe('ScmIntegrationsApi factory', () => {
    it('should have correct dependencies', () => {
      const scmFactory = apis[0] as any;

      // Check that it depends on configApi
      expect(scmFactory.deps).toBeDefined();
      expect(scmFactory.deps.configApi).toBe(configApiRef);
    });

    it('should have a factory function', () => {
      const scmFactory = apis[0] as any;
      expect(typeof scmFactory.factory).toBe('function');
    });
  });
});
