import { FaTrash, FaEdit } from 'react-icons/fa'
import { deleteSurveyee } from '../features/surveyee/surveyeeSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";

function SurveyeeItem({ surveyee = {}, index }) {
    const dispatch = useDispatch()
    let txt = ""

    // concat answers with a comma
    if (surveyee.answers != null) {
        let answers = surveyee.answers.toString()
        if (answers.length > 0) {
            function myFunction(value, index, array) {
                txt += value + ", " 
            }
            surveyee.answers.forEach(myFunction);
        }
    } 
    
    const onDeleteSurveyee = () => {
        dispatch(deleteSurveyee(surveyee?._id))
        toast.success("Surveyee deleted succefully")
    }
    
    return (
        <tr>
            <td>{++index}</td>
            <td>{surveyee.authCode}</td>
            <td>{surveyee.name}</td>
            <td>{surveyee.email}</td>
            <td>{surveyee.phone}</td>
            <td>{txt}</td>
            <td>{Math.floor(surveyee.timeRemaining / 60 )} Mins</td>
            <td>{surveyee.isCompleted === true ? 'Yes' : 'No'}</td>
            <td>
                {/* <button onClick={() => dispatch(deleteSurveyee(surveyee._id))}><FaTrash /></button> */}
                
                {/* edit button */}
                <Link to={`/Responses/Update/${surveyee.authCode}`}>
                    <button><FaEdit /></button>
                </Link>
                
                {/* delete button */}
                <button onClick={onDeleteSurveyee}><FaTrash /></button>
            </td>
        </tr>
    )
}

export default SurveyeeItem