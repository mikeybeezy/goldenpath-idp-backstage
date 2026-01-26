import { render, screen } from '@testing-library/react';
import LogoIcon from './LogoIcon';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from '@backstage/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

describe('LogoIcon', () => {
  it('should render an SVG element', () => {
    renderWithTheme(<LogoIcon />);

    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct aria-label for accessibility', () => {
    renderWithTheme(<LogoIcon />);

    const svg = screen.getByRole('img', { name: 'Goldenpath IDP' });
    expect(svg).toBeInTheDocument();
  });

  it('should have square viewBox for icon version', () => {
    renderWithTheme(<LogoIcon />);

    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
  });

  it('should not contain text element (icon only)', () => {
    renderWithTheme(<LogoIcon />);

    const svg = screen.getByRole('img');
    // LogoIcon doesn't have text element, only paths and circles
    expect(svg.querySelector('text')).toBeNull();
  });
});
