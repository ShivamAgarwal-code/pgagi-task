import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';




const CardElement = ({jobTitle, description, category, location, id}) => {
    const {palette} = useTheme()
 
  return (
    <Card sx={{ minWidth: 275, mb:3, mt:3,
      marginBottom: 2,
      boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
      
    }}>

      <CardContent>
        <Typography sx={{ fontSize: 14,
           color: palette.secondary.main,
            fontWeight: 500
             }}gutterBottom >
         <IconButton><LocationOnIcon sx={{color: palette.secondary.main, fontSize: 18}} /></IconButton> {location}
        </Typography>
        <Typography variant="h5" component="div">
          {jobTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body1" >   
          {/* Description : {description.split("").slice(0,150).join("")+ "..."} */}
          <b> Description : </b> 
          <span dangerouslySetInnerHTML = {{ __html:  description.split("").slice(0,300).join("") + "...."}}></span> 

          <br />
        </Typography>
       
      </CardContent>
      <CardActions>
      <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/job/${id}`}>More Details</Link></Button>
      </CardActions>
    </Card>
  );
}

export default CardElement;

