import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setConfirm } from '../../features/modal/modalSlice'

function ModalOnSubmitSurvey(props) {
    const dispatch = useDispatch()

    // if surveyee confirms saving 
    const onHandleConfirm = (e) => {
        e.preventDefault()

        dispatch(setConfirm())
    }

    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Are you sure you want to submit your responses?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>By clicking 'Confirm' you will not be able to amend any changes. Click cancel to stay on this page and make further edits. </h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHandleConfirm} className="warning">Confirm</Button>
                    <Button onClick={props.onHide} className="primary">Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}

export default ModalOnSubmitSurvey