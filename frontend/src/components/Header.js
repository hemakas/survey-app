import { FaLock, FaReply, FaSignOutAlt } from 'react-icons/fa'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { logoutSurveyee, resetSurveyee, updateSurveyee } from '../features/surveyee/surveyeeSlice'
import { resetTimer } from '../features/timer/timerSlice'

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { surveyee } = useSelector((state) => state.surveyee)
    const { surveyTimer } = useSelector((state) => state.timer)

    // user logout
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(resetSurveyee())
        dispatch(logoutSurveyee())
        navigate('/')
    }

    // surveyee logout
    const onLogout2 = () => {
        const surveyeeData = { 
            authCode : surveyee.authCode,
            timeRemaining : surveyTimer
        }

        // update surveyee
        dispatch(updateSurveyee(surveyeeData))
        
        dispatch(resetTimer())
        dispatch(resetSurveyee())
        dispatch(logoutSurveyee())
        dispatch(reset())
        navigate('/')
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Survey App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                        { user ? (
                        <>
                            <Nav.Link href="/Generate"><FaLock /> Generate</Nav.Link>
                            <Nav.Link href="/Responses"><FaReply /> Responses</Nav.Link>
                            <Button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </Button>
                        </>
                        ) : surveyee ? (
                            <>
                                {/* <Nav.Link href="#">Hi! { surveyee.name !== '' ? surveyee.name.split(' ')[0] : ''}</Nav.Link>  */}
                                <Button className='warning' onClick={onLogout2}>
                                    <FaSignOutAlt /> Logout
                                </Button>
                            </>
                        ) : ( 
                            <>
                            </>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header