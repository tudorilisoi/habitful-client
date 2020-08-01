import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './MainNav.css';
import { HabitContextProvider, HabitContext } from '../../context/HabitContext';

function MainNav(props) {
    // console.log('props', props)
    const context = useContext(HabitContext);


    const renderAddOrEdit = () => {

        // console.log('props.location.pathname', props.location.pathname)
        if (props.location.pathname === '/habits') {
            return (
                <Link to={'/add-habit'}>
                    <p>Add</p>
                </Link>
            )
        }

        if (props.location.pathname.endsWith('habit-data')) {
            return (
                <Link to={'/edit-habit'}>
                    <p>| Edit</p>
                </Link>
            )
        }

    }




    return (
        <nav className="MainNav__nav ">
            <Link to={'/'}>
                <p>Home</p>
            </Link>
            <div className="end-elements">
                {/* <p>Back</p> */}
                {/* {renderLogInOrOut()} */}

                {renderAddOrEdit()}
                <Link className="last-nav-item" to={'/habits'}>
                    <p>| My Habits</p>
                </Link>
                <Link className="last-nav-item" to={'/signup'}>
                    <p>| Signup</p>
                </Link>
                <Link className="last-nav-item" to={'/login'}>
                    <p>| Login</p>
                </Link>

            </div>

        </nav>
    );


}









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


// };

export default MainNav;