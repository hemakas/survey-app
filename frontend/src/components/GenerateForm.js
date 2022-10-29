import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { Form, Button, Row, InputGroup } from 'react-bootstrap'
import { createSurveyee, resetSurveyee } from '../features/surveyee/surveyeeSlice'
import ReactSpinner from './ReactSpinner'

function GenerateForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [authCode, setAuthCode] = useState("")
    const [isCopied, setIsCopied] = useState(false)

    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.surveyee)

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        if (!user) {
            navigate('/')
        }

        if (isSuccess) {
            toast.success("Surveyee created successfully");
            navigate('/Responses')
        }

        dispatch(resetSurveyee())
    }, [isError, isSuccess, message, navigate, dispatch])
    
    const handleSetAuthCode = (e) => {
        setAuthCode(e.target.value)
    }

    const handleGenerate = (e) => {
        setAuthCode(uuidv4(6))
    }

    const handleCopy = (e) => {
        navigator.clipboard.writeText(authCode)
        toast.success("Auth code copied to clipboard")
        setIsCopied(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!authCode || authCode == '') {
            toast.error('Please generate an auth code')
        } else {
            const surveyeeData = { 
                authCode,
            }

            // create surveyee
            dispatch(createSurveyee(surveyeeData))
        }
    }

    // show spinner while loading
    if (isLoading) {
        return <ReactSpinner />
    }

    return (
        <>
            <Form>
                {/* generate */}
                <Form.Group className="mb-3">
                    <Form.Label>Generate Code</Form.Label>
                    <Form.Control type="text" name="authCode" id="authCode" value={authCode} onChange={handleSetAuthCode} />
                </Form.Group>

                {/* url with code */}
                {/* <Form.Label>Your vanity URL</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">https://example.com/users/</InputGroup.Text>
                    <Form.Control name="authCode" id="authCode" aria-describedby="basic-addon3" value={authCode} onChange={handleSetAuthCode} />
                </InputGroup> */}

                {/* save button */}
                <Form.Group className="mb-3">
                    <Button type='button' onClick={handleGenerate} variant='warning'>Generate</Button>{ ' ' }
                    <Button type='button' disabled={!authCode} onClick={handleCopy} variant='secondary'>Copy URL</Button>{ ' ' }
                    <Button type='submit' disabled={!authCode || !isCopied} onClick={handleSubmit} variant='primary'>Save</Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default GenerateForm