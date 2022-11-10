import { Modal, Button } from 'react-bootstrap'

function ModalOnEndSurvey(props) {
  return (
    <>
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sorry! Your time is over.. 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>We have saved your responses..</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="warning">Ok</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ModalOnEndSurvey