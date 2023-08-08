import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext, useEffect, useState } from 'react';
import { EndDateContext, StartDateContext } from '../context/Context';
import { Ad, BookedDate, NewBookedDates, NewReservation } from '../types/types';
import Button from '@mui/material/Button';
import { Snack, SnackbarContext } from "../context/Context";
import { addBookedDates, addReservation, getAdBookedDates } from '../lib/controller';
import { useAuth } from '../context/AuthContext';
import { dateToText, dateToText2, findDatesBetween, validateDates } from '../lib/datecontroller';

interface AdProps {
	ad: Ad
}

export default function Calendar({ ad }: AdProps) {
	const { setStartDate } = useContext(StartDateContext);
	const { setEndDate } = useContext(EndDateContext);

	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

	const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
	const bookedDatesSec: number[] = [];

	const { setSnack } = useContext(SnackbarContext);

	const { currentUser } = useAuth();

	const today = new Date();

	async function getBookedDates() {
		const bookedDatesFromDatabase = await getAdBookedDates(ad.id);
		setBookedDates(bookedDatesFromDatabase);
	}

	useEffect(() => {
		getBookedDates()
	}, []);

	function disableDate(today: Date) {
		const startSeconds = Date.parse(today.toString());
		bookedDates.forEach((d) => {
			if (d.date) {
				const dateList: string[] = d.date.split(",");
				const year: number = +dateList[0];
				const month: number = +dateList[1];
				const date: number = +dateList[2];
				const newDate = new Date(year, month - 1, date);
				bookedDatesSec.push(Date.parse(newDate.toString()));
			}
		})

		return (date: Date) => {
			if (Date.parse(date.toString()) < startSeconds) {
				return true;
			}
			const sec = Date.parse(date.toString());

			if (bookedDatesSec.includes(sec)) {
				return true;
			}
			else {
				return false;
			}
		}
	}

	const handleStartDateChange = (startDate: Date | null) => {
		setSelectedStartDate(startDate);
		if (startDate) {
			setStartDate(startDate);
		}
	}

	const handleEndDateChange = (endDate: Date | null) => {
		setSelectedEndDate(endDate);
		if (endDate) {
			setEndDate(endDate);
		}
	}

	const handleReserve = async () => {
		if (currentUser?.id !== null && currentUser !== undefined) {
			if (selectedStartDate && selectedEndDate) {
				if (validateDates(selectedStartDate, selectedEndDate, bookedDatesSec)) {
					const bookedDates = findDatesBetween(dateToText(selectedStartDate), dateToText(selectedEndDate));
					//update myReservation
					const startDate = new Date(selectedStartDate);
					const endDate = new Date(selectedEndDate);

					const newReservation: NewReservation = {
						userId: currentUser?.id,
						adId: ad.id,
						startDate: dateToText2(startDate),
						endDate: dateToText2(endDate)
					}
					const res1 = await addReservation(newReservation);
					if (res1 === true) {
						setSnack(new Snack({ message: 'Produkt reservert!', color: 'success', autoHideDuration: 5000, open: true }));
					} else {
						setSnack(new Snack({ message: 'Noe gikk galt, prøv igjen senere', color: 'warning', autoHideDuration: 5000, open: true }));
					}

					//updateBookedAds(ad.id, bookedDates)
					bookedDates.forEach(async date => {
						const newBookedDate: NewBookedDates = {
							userId: currentUser?.id,
							adId: ad.id,
							date: date
						}
						const res2 = await addBookedDates(newBookedDate);
						if (res2 === true) {
							setSnack(new Snack({ message: 'Produkt reservert!', color: 'success', autoHideDuration: 5000, open: true }));
						} else {
							setSnack(new Snack({ message: 'Noe gikk galt, prøv igjen senere', color: 'warning', autoHideDuration: 5000, open: true }));
						}
					});

				} else {
					setSnack(new Snack({ message: 'Ikke gyldig datoer!', color: 'error', autoHideDuration: 5000, open: true }));
				}
			}
			else {
				setSnack(new Snack({ message: 'Ikke gyldig dato!', color: 'warning', autoHideDuration: 5000, open: true }))
			}
		}
		else {
			setSnack(new Snack({ message: 'Du må logge inn for å reservere et produkt!', color: 'warning', autoHideDuration: 5000, open: true }));
		}

	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div>
				<p className='mb-5'>Ønsker du å leie produktet? Velg start- og sluttdato for å bestemme leieperiode, og trykk "Legg inn reservasjon"</p>
				<div className='flex flex-row gap-1 mb-2 '>
					<div className="dark:bg-dark-white rounded-md">
						<DatePicker label="Fra dato" value={selectedStartDate} onChange={handleStartDateChange} format="DD-MM-YYYY" shouldDisableDate={disableDate(today)} />
					</div>
					<div className="dark:bg-dark-white rounded-md">
						<DatePicker label="Til dato" value={selectedEndDate} onChange={handleEndDateChange} format="DD-MM-YYYY" shouldDisableDate={disableDate(today)} />
					</div>
				</div>
				<p className='text-gray-400 mb-5'>MERK: enkelte datoer kan være utilgjengelige på grunn av andre reservasjoner.</p>

				<Button fullWidth variant="contained" disabled={currentUser ? false : true} sx={{ p: 1.5 }} onClick={handleReserve}>Legg inn reservasjon</Button>
			</div>
		</LocalizationProvider>
	);
}