import { FaLock, FaReply, FaUserPlus, FaInfo, FaHourglassHalf, FaSignOutAlt } from 'react-icons/fa'
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export const Header = () => {
    const onLogout = () => {

    }

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Survey App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto justify-content-end">
                            {/* this will remove the use ref hook error */}
                            <>
                                <Nav.Link href="/Generate"><FaLock /> Generate</Nav.Link>
                                <Nav.Link href="/Responses"><FaReply /> Responses</Nav.Link>
                                <Button className='btn' onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </Button>

                                <Nav.Link href="/Register"><FaUserPlus /> Register</Nav.Link>
                                <Nav.Link href="/Instructions"><FaInfo /> Instructions</Nav.Link>
                                <Nav.Link href="/Survey"><FaHourglassHalf /> Survey</Nav.Link>
                            </>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header