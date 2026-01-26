import { render, screen } from '@testing-library/react';
import { Root } from './Root';
import { TestApiProvider } from '@backstage/test-utils';
import { searchApiRef } from '@backstage/plugin-search-react';
import { configApiRef, identityApiRef } from '@backstage/core-plugin-api';
import { MemoryRouter } from 'react-router-dom';
import { lightTheme } from '@backstage/theme';
import { ThemeProvider } from '@material-ui/core/styles';

// Mock the config API
const mockConfigApi = {
  getString: jest.fn().mockReturnValue('Test App'),
  getOptionalString: jest.fn().mockReturnValue(undefined),
  getConfig: jest.fn().mockReturnValue({ getString: () => 'Test' }),
  getOptionalConfig: jest.fn().mockReturnValue(undefined),
  getConfigArray: jest.fn().mockReturnValue([]),
  getNumber: jest.fn().mockReturnValue(0),
  getOptionalNumber: jest.fn().mockReturnValue(undefined),
  getBoolean: jest.fn().mockReturnValue(false),
  getOptionalBoolean: jest.fn().mockReturnValue(undefined),
  getStringArray: jest.fn().mockReturnValue([]),
  getOptionalStringArray: jest.fn().mockReturnValue(undefined),
  has: jest.fn().mockReturnValue(false),
  keys: jest.fn().mockReturnValue([]),
};

// Mock the identity API
const mockIdentityApi = {
  getBackstageIdentity: jest.fn().mockResolvedValue({
    type: 'user',
    userEntityRef: 'user:default/guest',
    ownershipEntityRefs: [],
  }),
  getCredentials: jest.fn().mockResolvedValue({ token: undefined }),
  getProfileInfo: jest.fn().mockResolvedValue({
    email: 'guest@example.com',
    displayName: 'Guest',
  }),
  signOut: jest.fn().mockResolvedValue(undefined),
};

// Mock the search API
const mockSearchApi = {
  query: jest.fn().mockResolvedValue({ results: [] }),
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <MemoryRouter>
        <TestApiProvider
          apis={[
            [configApiRef, mockConfigApi],
            [identityApiRef, mockIdentityApi],
            [searchApiRef, mockSearchApi],
          ]}
        >
          {ui}
        </TestApiProvider>
      </MemoryRouter>
    </ThemeProvider>,
  );
};

describe('Root', () => {
  it('should render sidebar with navigation items', async () => {
    renderWithProviders(
      <Root>
        <div data-testid="child-content">Content</div>
      </Root>,
    );

    // Check that child content is rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithProviders(
      <Root>
        <div>Content</div>
      </Root>,
    );

    // The Root component renders SidebarItems with text
    // These are rendered as part of the sidebar structure
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
