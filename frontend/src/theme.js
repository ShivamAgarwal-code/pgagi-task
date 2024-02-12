import {createTheme} from '@mui/material/styles';
import {lightBlue} from '@mui/material/colors';

export const theme = createTheme({
    palette :{
        primary:{
            main: '#283C92'         //blue[500]
        },
        secondary :{
            main:   '#2B324D',              //lightBlue[800],
            midNightBlue : '#003366'
        },
        navbarColor : {
            
            main: lightBlue[500]
        }
    }
})