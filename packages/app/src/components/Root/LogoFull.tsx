import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 48,
  },
});

const LogoFull = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 440 100"
      role="img"
      aria-label="Goldenpath IDP"
    >
      {/* Branching paths that converge */}
      <path d="M10 75 Q30 75 38 58" stroke="#F5C542" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3"/>
      <path d="M10 25 Q30 25 38 42" stroke="#F5C542" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3"/>
      <path d="M10 50 L38 50" stroke="#F5C542" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3"/>

      {/* First merge point */}
      <circle cx="38" cy="50" r="4" fill="#F5C542" opacity="0.5"/>

      {/* Merged path continuing */}
      <path d="M38 50 L62 50" stroke="#F5C542" strokeWidth="5" strokeLinecap="round"/>

      {/* Second decision node */}
      <circle cx="62" cy="50" r="5" fill="#F5C542" opacity="0.7"/>

      {/* Final golden path - rising */}
      <path d="M62 50 L95 25" stroke="#F5C542" strokeWidth="6" strokeLinecap="round"/>

      {/* Destination node (hollow ring) */}
      <circle cx="95" cy="25" r="9" fill="none" stroke="#F5C542" strokeWidth="3"/>

      {/* Goldenpath IDP text */}
      <text x="118" y="58" fontFamily="Space Grotesk, Inter, Arial, sans-serif" fontSize="34" fontWeight="700" fill="#F5C542" letterSpacing="1">Goldenpath IDP</text>
    </svg>
  );
};

export default LogoFull;
