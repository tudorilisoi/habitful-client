import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './HabitCard.css'

const HabitCard = props => {

    return (
        <div className="habit-card-wrapper">
            <p className="habit-name">{props.name}</p>  
            {/* horizontal aligned select boxes to select day of habit completion */}
            {/* onClick of select box triggers function to update date of completion records */}
        </div>
    )
}

export default HabitCard