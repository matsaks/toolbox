import { useDispatch, useSelector } from "react-redux";
import { selectAdFilters, setAdFilter } from "../../store/AdFiltersReducer";
import TwStyles from "../../Data";

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