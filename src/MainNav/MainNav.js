import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import './MainNav.css';
import { HabitContextProvider, HabitContext } from '../context/HabitContext';

function MainNav() {
    const context = useContext(HabitContext);

    // function renderLogInOrOut() {
    //     // const authToken = localStorage.getItem('authToken');
    //     // const loggedInStatus = authToken ? true : false;

    //     if (!loggedInStatus) {
    //         return (
    //             <div className='last-two-wrapper'>
    //                 <Link className='nav-link text-primary-color'
    //                     to={'/signup'}>SignUp</Link>
    //                 <Link className='nav-link text-primary-color'
    //                     to={'/login'}>Login</Link>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className='last-two-wrapper'>
    //                 <Link
    //                     className='nav-link text-primary-color'
    //                     to={'/categories'}>My Recipes</Link>
    //                 <Link
    //                     className='nav-link text-primary-color'
    //                     onClick={context.handleLogout}
    //                     to={'/'}>Logout</Link>
    //             </div>
    //         );
    //     };
    // };

    return (
        <nav className="MainNav__nav ">
            {/* {renderLogInOrOut()} */}
            login and 
        </nav>
    );
};

export default MainNav;