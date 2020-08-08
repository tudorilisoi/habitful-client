import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HabitContext } from '../../context/HabitContext';
import './MainNav.css';

function MainNav(props) {
    const context = useContext(HabitContext);
    const { isLoggedIn, setIsLoggedIn, habitId } = context;

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    }

    const renderAddOrEdit = () => {

        if (props.location && props.location.pathname === '/habits') {
            return (
                <Link to={'/add-habit'}>
                    <p>Add |</p>
                </Link>
            )
        }

        if (props.location && props.location.pathname.endsWith('habit-data')) {
            return (
                <Link to={`/${habitId}/edit-habit`}>
                    <p>Edit |</p>
                </Link>
            )
        }
    }

    const renderLogInOrOut = () => {

        if (isLoggedIn) {
            return (
                <>
                    <Link className="last-nav-item" to={'/habits'}>
                        <p>My Habits</p>
                    </Link>
                    <Link className="last-nav-item"
                        onClick={handleLogout}
                        to={'/'}>
                        <p>| Logout</p>
                    </Link>
                </>
            )
        } else {
            return (
                <>
                    <Link className="last-nav-item" to={'/signup'}>
                        <p> Signup</p>
                    </Link>
                    <Link className="last-nav-item" to={'/login'}>
                        <p>| Login</p>
                    </Link>
                </>
            )
        }
    }

    return (
        <nav className="MainNav__nav ">
            <Link to={'/'}>
                <p>Home</p>
            </Link>
            <div className="end-elements">
                {renderAddOrEdit()}
                {renderLogInOrOut()}
            </div>
        </nav>
    );
}

export default MainNav;