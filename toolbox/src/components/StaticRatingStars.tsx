import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

interface defaultValues {
  value: number;
}

const labels: { [index: string]: string } = {
  1: 'Forferdelig',
  2: 'Dårlig',
  3: 'Ok',
  4: 'Bra',
  5: 'Fantastisk',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function StaticRatingStars(props: defaultValues) {

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >

      <Rating
        name="read-only"
        value={props.value}
        precision={0.5}
        getLabelText={getLabelText}
        readOnly
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

    </Box>
  );
}