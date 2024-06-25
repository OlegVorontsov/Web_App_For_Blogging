import { ALLNEWS_URL, ALLUSERS_URL, HOME_URL, LOGIN_URL, PROFILE_URL, isUserOnline } from "../services/commonService";
import { NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const AllNavs = () => {
    let navs = [
    <NavItem>
        <NavLink className="nav-link" to={HOME_URL}>Home</NavLink>
    </NavItem>
    ];

    if(isUserOnline()){
        navs.push(
            <NavItem className="nav-item">
                <NavLink className="nav-link" to={ALLNEWS_URL}>Wall</NavLink>
            </NavItem>
        );
        navs.push(
        <NavItem className="nav-item">
            <NavLink className="nav-link" to={PROFILE_URL}>Profile</NavLink>
        </NavItem>
        );
        navs.push(
            <NavItem className="nav-item">
                <NavLink className="nav-link" to={ALLUSERS_URL}>Search</NavLink>
            </NavItem>
        )
    }
    else {
        navs.push(
        <NavItem className="nav-item">
            <NavLink className="nav-link" to={LOGIN_URL}>Login</NavLink>
        </NavItem>
        )
    }
    return (
        <ul className="navbar-nav ms-auto">
            {navs}
          </ul>
    )
}
export default AllNavs;