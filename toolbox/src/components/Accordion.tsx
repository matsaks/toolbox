import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface AccordionProps {
  question: string;
  answer: string;
  panel: string;
}

const SingleAccordion = (props: AccordionProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion sx={{ width: 1 }} expanded={expanded === `${props.panel}`} onChange={handleChange(`${props.panel}`)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.panel}bh-content`}
        id={`${props.panel}bh-header`}
      >
        <Typography sx={{ width: '100%', flexShrink: 0 }}>
          {props.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {props.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>

  )
}


interface children {
  children: React.ReactNode;
}

const ControlledAccordions = (props: children) => {
  return (
    <div>
      {props.children}
    </div>
  );
}

export { SingleAccordion, ControlledAccordions };