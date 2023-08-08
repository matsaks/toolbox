import { useDispatch, useSelector } from 'react-redux';
import { selectAdFilters, setAdFilter } from '../store/AdFiltersReducer';
import TwStyles from '../Data';

interface TextFieldProps {
    DummyText?: string,
    Label: string,
    Type: string,
    Width?: string
}

interface PriceControl {
    max: boolean
}


export function CustomTextField(props: TextFieldProps) {
    return (
        <input
            type='text'
            placeholder={props.Label}
            className={TwStyles.TextField}
        />
    );
};

export function Searchfield(props: TextFieldProps) {
    const dispatch = useDispatch();
    const filters = useSelector(selectAdFilters);

    return (
        <input
            type='text'
            placeholder={props.Label}
            value={filters.search}
            onChange={(event: any) => {
                dispatch(setAdFilter({ field: "search", value: event.target.value }));
            }}
            className={TwStyles.TextField}
        />
    );
}

export function PriceControlField(props: PriceControl) {
    const dispatch = useDispatch();
    const filters = useSelector(selectAdFilters);

    return (
        props.max ?
            <input
                placeholder="Til kr"
                value={filters.maxPrice}
                type='number'
                min="0"
                onChange={(event: any) => {
                    dispatch(setAdFilter({ field: 'maxPrice', value: event.target.value }))
                }}
                className={TwStyles.TextField}
            />
            :
            <input
                placeholder="Fra kr"
                value={filters.minPrice}
                type='number'
                min="0"
                onChange={(event: any) => {
                    dispatch(setAdFilter({ field: "minPrice", value: event.target.value }));
                }}
                className={TwStyles.TextField}
            />
    );
}

export function PostalControl() {
    const dispatch = useDispatch();
    const filters = useSelector(selectAdFilters);

    return (
        <input
            placeholder="Postnummer"
            value={filters.zipCode}
            type='number'
            min="0"
            onChange={(event: any) => {
                dispatch(setAdFilter({ field: "zipCode", value: event.target.value })); // filterer på ± 50 
            }}
            className={TwStyles.TextField}
        />
    )
}





