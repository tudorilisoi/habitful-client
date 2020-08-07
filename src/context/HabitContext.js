import React, { useState, createContext } from 'react';

export const HabitContext = createContext();

export const HabitContextProvider = props => {

    const [habits, setHabits] = useState();
    const [habitRecords, setHabitRecords] = useState(null);
    const [habitId, setHabitId] = useState(0);
    const [test,setTest] = useState([]);
    const [gapArray,setGapArray] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    // checkBeforeAnything = () => {
    //     const authToken = localStorage.getItem('authToken');
    //     if (!authToken) {
    //       return (
    //         <Redirect to={'/'} />
    //       )
    //     };
    //   };
    
    //   checkLoggedInStatus = () => {
    //     const authToken = localStorage.getItem('authToken');
    //     const loggedInStatus = authToken ? true : false;
    //     this.setState({
    //       isLoggedIn: loggedInStatus
    //     });
    //   };
    
    //   handleCurrentCategoryId = (currentCategoryId) => {
    //     sessionStorage.setItem('currentCategoryId', `${currentCategoryId}`);
    //     this.setState({
    //       currentCategoryId
    //     });
    //   };



    return (
        <HabitContext.Provider value={{
            test,
            setTest,
            habits,
            setHabits,
            habitRecords,
            setHabitRecords,
            habitId,
            setHabitId,
            gapArray,
            setGapArray,
            isLoggedIn,
            setIsLoggedIn,
            
        }}>
            {props.children}
        </HabitContext.Provider>
    )
}