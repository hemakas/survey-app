import { FaTrash } from 'react-icons/fa'
import { deleteSurveyee } from '../features/surveyee/surveyeeSlice'
import { useDispatch } from 'react-redux'

function SurveyeeItem({ surveyee, index }) {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> </td>
            <td>{surveyee.authCode}</td>
            <td>{surveyee.name}</td>
            <td>{surveyee.email}</td>
            <td>{surveyee.phone}</td>
            <td>{surveyee.answers}</td>
            <td>{surveyee.isCompleted ? 'Yes' : 'No'}</td>
            <td>
                <button onClick={() => dispatch(deleteSurveyee(surveyee._id))}><FaTrash /></button>
            </td>
        </tr>
    )
}

export default SurveyeeItem