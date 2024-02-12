var express = require("express");
const router = express.Router();
const { createJobType, allJobsType, updateJobType, deleteJobType } = require("../controllers/jobTypeController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");



//job types routes

// /api/type/create
router.post('/type/create', isAuthenticated,isAdmin, createJobType)

// /api/type/jobs
router.get('/type/jobs', allJobsType)

// /api/type/update/:typeid
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType)

// /api/type/delete/:typeid
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteJobType)





module.exports = router;
