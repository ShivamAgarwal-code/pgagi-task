import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CardElement from '../../component/CardElement'
// import { userProfileAction } from '../../redux/actions/userAction'

const UserJobsHistory = () => {
    const { user } = useSelector(state => state.userProfile);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(userProfileAction());
    //     //eslint-disable-next-line
    // }, []);

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "#fafafa" }}> Jobs History</Typography>
                <Box>
                    {
                    user && user.jobsHistory ?(
                        user && user.jobsHistory.map((history, i) => (
                            <CardElement
                                key={i}
                                id={history._id}
                                jobTitle={history.title}
                                description={history.description}
                                category=''
                                location={history.location}
                            />
                        ))
                    ) :  (<Typography variant="body1" sx={{ paddingTop: 2, marginTop: 2 }}>No jobs applied.</Typography>
                    )
                    }
                </Box>
            </Box>
        </>
    )
}

export default UserJobsHistory