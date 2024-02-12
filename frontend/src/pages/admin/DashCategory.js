import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import LoadingBox from '../../component/LoadingBox'
import axios from 'axios';
import {toast} from 'react-toastify'



import moment from 'moment'


const DashCategory = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobTypeLoadAction())
        //eslint-disable-next-line
    }, []);


    const { jobType, loading } = useSelector(state => state.jobTypeAll);
    let data = [];
    
    data = (jobType !== undefined && jobType.length > 0) ? jobType : []

    //delete job by Id
    const deleteJobCategoryById = async(e, id) => {
        try {
            
            await axios.delete(`/api/type/delete/${id}`); 
        
            // Perform any necessary actions after successful deletion, like updating the UI
            // console.log('User deleted successfully');
            toast.success("Category deleted successfully",{autoClose: 1500})
            window.location.reload()
          } catch (error) {
            // Handle error
            console.error('Error deleting user:', error);
          }
    
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Category ID',
            width: 150,
            editable: false,
        },
        {
            field: 'jobTypeName',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )

        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteJobCategoryById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];


    return (
        loading ? <LoadingBox/> :
        <Box >

            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Jobs category
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to='/admin/category/create'>Create category</Link></Button>
            </Box>
           
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >
            
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }

                        }}
                        
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    // components={{ Toolbar: GridToolbarExport }}
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default DashCategory