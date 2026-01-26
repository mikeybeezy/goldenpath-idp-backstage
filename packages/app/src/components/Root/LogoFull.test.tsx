import { render, screen } from '@testing-library/react';
import LogoFull from './LogoFull';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from '@backstage/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

describe('LogoFull', () => {
  it('should render an SVG element', () => {
    renderWithTheme(<LogoFull />);

    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct aria-label for accessibility', () => {
    renderWithTheme(<LogoFull />);

    const svg = screen.getByRole('img', { name: 'Goldenpath IDP' });
    expect(svg).toBeInTheDocument();
  });

  it('should contain the Goldenpath IDP text', () => {
    renderWithTheme(<LogoFull />);

    // The text element contains "Goldenpath IDP"
    const svg = screen.getByRole('img');
    expect(svg).toContainHTML('Goldenpath IDP');
  });

  it('should have correct viewBox for full logo', () => {
    renderWithTheme(<LogoFull />);

    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('viewBox', '0 0 440 100');
  });
});
