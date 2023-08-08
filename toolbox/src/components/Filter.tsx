import FilterModule from './atoms/FilterModule';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { selectAdFilters, setAdFilter } from "../store/AdFiltersReducer";
import { PostalControl, PriceControlField } from './TextField';


const Filter = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectAdFilters);

    const MuiMode = useSelector((state: any) =>
        state.darkMode.active
    );


    let Basecolor = MuiMode ? "white" : "black";

    let radioStyle = {
        m: -1,
        color: Basecolor,
        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)': {
            color: Basecolor,
        },
        '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
            color: Basecolor,
        },
    }

    return (
        <div className="m-4 h-auto rounded-2xl  w-fit bg-white dark:bg-dark-lysGraa p-5 shadow-lg" >

            <FilterModule title="Kategori" margin="mt-4" >
                <RadioGroup value={filters.category || ""} >
                    <div className='mb-4 py-2'>
                        <Button
                            variant="contained"
                            onClick={
                                () => dispatch(setAdFilter({ field: "category", value: "" }))
                            }
                            sx={
                                MuiMode ? {
                                    border: "2px solid #292929",
                                } : {
                                    border: "2px solid black",
                                    color: "black",
                                    backgroundColor: "#ffff",
                                    "&:hover": {
                                        backgroundColor: "white"
                                    }
                                }
                            }
                        >
                            Nullstill Kategori
                        </Button>
                    </div>
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Elektronikk" value="Elektronikk" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Elektronikk" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Hage" value="Hage" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Hage" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Håndverktøy" value="Håndverktøy" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Håndverktøy" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Maskineri" value="Maskineri" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Maskineri" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Bil og motorsykkel" value="Bil og motorsykkel" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Bil og motorsykkel" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Sykkel" value="Sykkel" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Sykkel" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Henger" value="Henger" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Henger" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Rør" value="Rør" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Rør" }));
                    }} />
                    <FormControlLabel sx={radioStyle} control={<Radio />} label="Stiger" value="Stiger" onChange={(event: any) => {
                        dispatch(setAdFilter({ field: "category", value: "Stiger" }));
                    }} />
                </RadioGroup>
            </FilterModule>

            <FilterModule title="Pris" margin="mt-6">
                <div className="mt-5 flex flex-col justify-between h-auto gap-2">
                    <PriceControlField max={false} />
                    <PriceControlField max={true} />
                </div>
            </FilterModule>

            <FilterModule title="Postnummer (± 50)" margin="my-8">
                <FormControl>
                    <PostalControl />
                </FormControl>
            </FilterModule>

        </div>
    );
}

export default Filter;
