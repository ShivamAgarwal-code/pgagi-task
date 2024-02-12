import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { registerAjobAction } from '../../redux/actions/jobAction';
import JoditEditor from 'jodit-react';


const validationSchema = yup.object({
    title: yup
        .string('Enter a job title')
        .required('title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    salary: yup
        .string('Enter a salary')
        .required('Salary is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    url: yup
            .string('Enter apply link')
            .required('Url is required'),
    jobType: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashCreateJob = () => {
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [content, setContent] = useState('');
    
    //job type
    useEffect(() => {
        dispatch(jobTypeLoadAction());
        //eslint-disable-next-line
    }, []);

    const { jobType } = useSelector(state => state.jobTypeAll);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            salary: '',
            location: '',
            jobType: '',
            url: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(registerAjobAction(values))
            // alert(JSON.stringify(values, null, 2));
            console.log(values)
            actions.resetForm();
        },
    });



    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Register a Job
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="title"
                            label="Title"
                            name='title'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                       
                        <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => {
                          formik.setFieldValue('description', newContent); // Update the description field
                          setContent(newContent);
                        }}
                        />

                        <TextField sx={{ mb: 3, mt:3 }}
                            fullWidth
                            id="salary"
                            name="salary"
                            label="salary"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Salary"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.salary && Boolean(formik.errors.salary)}
                            helperText={formik.touched.salary && formik.errors.salary}
                        />
                       
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />

                        
                    <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="url"
                            label="Apply link"
                            name="url"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Enter url here"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.url && Boolean(formik.errors.url)}
                            helperText={formik.touched.url && formik.errors.url}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="jobType"
                            id="jobType"
                            select
                            label="Category"
                            value={formik.values.jobType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                            helperText={formik.touched.jobType && formik.errors.jobType}
                        >



                            <MenuItem key={""} value={""}>

                            </MenuItem>

                            {jobType && jobType.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.jobTypeName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button fullWidth variant="contained" type='submit' >Create job</Button>
                    </Box>
                </Box>
              
            </Box>

        </>
    )
}

export default DashCreateJob