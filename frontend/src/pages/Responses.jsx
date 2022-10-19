import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Alert, Container, Table } from 'react-bootstrap'
import { getSurveyees, resetSurveyee } from '../features/surveyee/surveyeeSlice'
import ReactSpinner from '../components/ReactSpinner'
import SurveyeeItem from '../components/SurveyeeItem'

function Responses() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { surveyees, isLoading, isError, message } = useSelector((state) => state.surveyee)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/')
    }

    dispatch(getSurveyees())

    return () => {
      dispatch(resetSurveyee())
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <ReactSpinner />
  }

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>All Surveyees</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        { surveyees.length > 0 ? (
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Auth Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Answers</th>
                <th>Completed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {surveyees.map((surveyee, index) => (
                <SurveyeeItem key={index} surveyee={surveyee} />
              ))}
            </tbody>
          </Table>
        ) : (
          <h5>You have not set any surveyees</h5>
        )}
      </Container>      
    </>
  )
}

export default Responses