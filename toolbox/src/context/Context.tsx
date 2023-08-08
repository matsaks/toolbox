import { AlertColor } from '@mui/material';
import React, { createContext } from 'react';

class Snack {
  message?: string;
  color?: AlertColor;
  autoHideDuration?: number;
  open: boolean;

  constructor(data: Snack) {
    this.message = data.message || '';
    this.color = data.color || 'info';
    this.autoHideDuration = data.autoHideDuration || 5000;
    this.open = data.open;
  }
}

export { Snack };

type SnackDefaultValue = {
  snack: Snack,
  setSnack: React.Dispatch<React.SetStateAction<Snack>>
};

export const SnackbarContext = createContext<SnackDefaultValue>({ snack: new Snack({ open: false }), setSnack: () => { } });

export type StartDateDefaultValue = {
  startDate: Date,
  setStartDate: React.Dispatch<React.SetStateAction<Date>>
}

type EndDateDefaultValue = {
  endDate: Date,
  setEndDate: React.Dispatch<React.SetStateAction<Date>>
}

export const StartDateContext = createContext<StartDateDefaultValue>({ startDate: new Date(), setStartDate: () => { } });
export const EndDateContext = createContext<EndDateDefaultValue>({ endDate: new Date(), setEndDate: () => { } });
