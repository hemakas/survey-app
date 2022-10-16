import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { Form, Button, Row, InputGroup } from 'react-bootstrap'

function GenerateForm() {
    const [formData, setFormData] = useState({
        authCode: ''
    })

    const { authCode } = formData
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleGenerate = (e) => {

    }

    const handleCopy = (e) => {

    }

    const handleSubmit = (e) => {

    }

    return (
        <>
            <Form>
                {/* generate */}
                <Form.Group className="mb-3">
                    <Form.Label>Generate Code</Form.Label>
                    <Form.Control type="text" name="authCode" id="authCode" value={authCode} onChange={onChange} />
                </Form.Group>

                {/* url with code */}
                <Form.Label>Your vanity URL</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">https://example.com/users/</InputGroup.Text>
                    <Form.Control name="authCode" id="authCode" aria-describedby="basic-addon3" value={authCode} onChange={onChange} />
                </InputGroup>

                {/* save button */}
                <Form.Group className="mb-3">
                    <Button type='button' onClick={handleGenerate} variant='warning'>Generate</Button>{ ' ' }
                    <Button type='submit' onClick={handleSubmit} variant='primary'>Save</Button>{ ' ' }
                    <Button type='button' onClick={handleCopy} variant='secondary'>Copy URL</Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default GenerateForm