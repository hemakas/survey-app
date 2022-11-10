import { FaTrash } from 'react-icons/fa'
import { deleteSurveyee } from '../features/surveyee/surveyeeSlice'
import { useDispatch } from 'react-redux'

function SurveyeeItem({ surveyee, index }) {
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
    
    return (
        <tr>
            <td>{++index}</td>
            <td>{surveyee.authCode}</td>
            <td>{surveyee.name}</td>
            <td>{surveyee.email}</td>
            <td>{surveyee.phone}</td>
            <td>{txt}</td>
            <td>{Math.floor(surveyee.timeRemaining / 60 )} Mins</td>
            <td>{surveyee.isCompleted == true ? 'Yes' : 'No'}</td>
            <td>
                <button onClick={() => dispatch(deleteSurveyee(surveyee._id))}><FaTrash /></button>
            </td>
        </tr>
    )
}

export default SurveyeeItem