import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActive } from '../store/darkModeSlice';
import { IconButton } from '@mui/material';

const ThemeSwitch = () => {
    const darkMode = useSelector((state: any) =>
        state.darkMode.active
    );
    const dispatch = useDispatch()

    return (
        <IconButton
            onClick={() => {
                document.documentElement.classList.contains('dark') ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
                dispatch(toggleActive())
            }}
        >
            {/*If darkmode, show white moon, else show gray sun */}
            {darkMode ? <Brightness3Icon color="secondary" /> : <WbSunnyIcon />}
        </IconButton>
    )
}
export default ThemeSwitch