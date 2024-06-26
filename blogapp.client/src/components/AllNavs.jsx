import { ALLNEWS_URL, ALLUSERS_URL, HOME_URL, LOGIN_URL, PROFILE_URL, isUserOnline } from "../services/commonService";
import { Nav, NavDropdown } from 'react-bootstrap';
import { exitFromProfile } from "../services/usersService";


const AllNavs = () => {
    let navs = [
        <Nav.Link href={HOME_URL}>Home</Nav.Link>
    ];

    if(isUserOnline()){
        navs.push(
            <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href={ALLNEWS_URL}>Wall</NavDropdown.Item>
                <NavDropdown.Item href={PROFILE_URL}>Profile</NavDropdown.Item>
                <NavDropdown.Item href={ALLUSERS_URL}>Search</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item style={{color: 'red'}} href="#" onClick={() => exitFromProfile()}>Sign out</NavDropdown.Item>
            </NavDropdown>
        );
    }
    else {
        navs.push(
            <Nav.Link href={LOGIN_URL}>Login</Nav.Link>
        )
    }
    return (
        <Nav className="mr-auto">
            {navs}
        </Nav>
    )
}
export default AllNavs;