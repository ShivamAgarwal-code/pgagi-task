import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../component/Footer'
import LoadingBox from '../component/LoadingBox'
import Navbar from '../component/Navbar'
import { jobLoadSingleAction } from '../redux/actions/jobAction'
import Button from '@mui/material/Button'
import { userApplyJobAction } from '../redux/actions/userAction'



const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

const SingleJob = () => {
    
    const dispatch = useDispatch();
    const { singleJob, loading } = useSelector(state => state.singleJob)
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
    }, [dispatch,id]);
    const [btntext, setbtntext] = useState("Apply through official website")
    const applyForAJob = () => {
        
        dispatch(userApplyJobAction({
            title: singleJob && singleJob.title,
            description: singleJob && singleJob.description,
            salary: singleJob && singleJob.salary,
            location: singleJob && singleJob.location,
            jobType : singleJob && singleJob.jobType.jobTypeName,
            createdAt : singleJob && singleJob.createdAt
        }))
        setbtntext("Apply through official website")

    }


    return (
        <>

            <Box sx={{ bgcolor: "#fafafa",  minHeight: "90vh", }}>

                <Navbar />
                <Box sx={{ height: 'auto' }}>
                    <Container sx={{ pt: '30px' }}>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>

                                {

                                    loading ? <LoadingBox /> :

                                        <Card>
                                            <CardContent>
                                                <Typography variant="h5" component="h3">
                                                    {singleJob && singleJob.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: Rs. {singleJob && singleJob.salary}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {singleJob && singleJob.jobType ? singleJob.jobType.jobTypeName : "No category"}
                                                </Typography>

                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleJob && singleJob.location}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Date Posted : </Box>: 
                                                    {formatDate(singleJob && singleJob.createdAt)}
                                                    {/* {singleJob && singleJob.createdAt} */}
                                                </Typography>

                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                <p>&nbsp;</p>
                                                    
                                                    <h3>Job description:</h3> 
                                                    <p>&nbsp;</p>
                                                    <span dangerouslySetInnerHTML = {{__html: singleJob && singleJob.description}}></span>
                                                    {/* {singleJob && singleJob.description} */}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                }
                            </Box>
                            {/* this button is moved below from the right side  */}

                            {/* <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2 }}>
                                    <Button id='jobApplybtn' onClick={applyForAJob} sx={{ fontSize: "13px" }} variant='contained' >{btntext}</Button>
                                </Card>
                            </Box> */}

                        </Stack>
{/* this button is moved below from the right side  */}
            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2 }}>
                                    <Button id='jobApplybtn' onClick={applyForAJob} sx={{ fontSize: "13px" }} variant='contained' >{btntext}</Button>
                                </Card>
                            </Box>
{/* the above button was moved from right side to bottom till here  */}
                    </Container>
                </Box>
            </Box>
                <Footer />
        </>
    )
}

export default SingleJob