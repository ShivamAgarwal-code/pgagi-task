import{JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS, JOB_LOAD_FAIL, JOB_LOAD_RESET, JOB_LOAD_SINGLE_REQUEST,JOB_LOAD_SINGLE_SUCCESS,JOB_LOAD_SINGLE_FAIL, JOB_LOAD_SINGLE_RESET
, REGISTER_JOB_FAIL,
REGISTER_JOB_REQUEST,
REGISTER_JOB_RESET,
REGISTER_JOB_SUCCESS, UPDATE_JOB_LIST} from '../constants/jobconstant'

export const loadJobReducer = (state={jobs:[]}, action) =>{
    switch (action.type) {
        case JOB_LOAD_REQUEST:
            return {loading : true};

        case JOB_LOAD_SUCCESS:
            
            return {
                loading : false,
                success : action.payload.data.success,
                page : action.payload.data.page,
                pages : action.payload.data.pages,
                count : action.payload.data.count,
                setUniqueLocation : action.payload.data.setUniqueLocation,
                jobs : action.payload.data.jobs
            };
           
            
        case JOB_LOAD_FAIL:
            
            return {
                loading : false,
                error: action.payload
            };
            
        case JOB_LOAD_RESET:
             return {};
            
    
        default:
            return state;
    } 
}

//single job reducer

export const loadJobSingleReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case JOB_LOAD_SINGLE_REQUEST:
            return { loading: true }
        case JOB_LOAD_SINGLE_SUCCESS:
            return {

                loading: false,
                success: action.payload.data.success,
                singleJob: action.payload.data.job,

            }
        case JOB_LOAD_SINGLE_FAIL:
            return { loading: false, error: action.payload }
        case JOB_LOAD_SINGLE_RESET:
            return {}
        default:
            return state;
    }
}

//Registred job;
export const registerAjobReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_JOB_REQUEST:
            return { loading: true }
        case REGISTER_JOB_SUCCESS:
            return {
                loading: false,
                job: action.payload,
            }
        case REGISTER_JOB_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_JOB_RESET:
            return {}
        default:
            return state;
    }

}


export const updateJobReducer = (state={jobs:[]}, action) =>{
    switch (action.type) {
        case UPDATE_JOB_LIST:
            return {
                ...state,
                job: action.payload,   //update the job with the new data
            };

       

    
        default:
            return state;
    } 
}
