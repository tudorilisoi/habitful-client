import React, { useContext, useState } from 'react';
// import config from '../config';
// import RecipesContext from '../RecipesContext';
// import './AddHabit.css';
// import TextareaAutosize from 'react-textarea-autosize';
// import ValidationError from '../ValidationError/ValidationError';
import { HabitContext } from '../context/HabitContext';


function AddHabit(props) {
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [ingredients, setIngredients] = useState('');
    // const [directions, setDirections] = useState('');
    const context = useContext(HabitContext);
    // const {  } = context;

    function handleCancel() {
        props.history.goBack();
    }

    // function validateName() {
    //     const recipeName = name.trim();
    //     if (recipeName.length === 0) {
    //         return ` *name is required `
    //     };
    // };

    function handleSubmit(e) {
        e.preventDefault();
        // const { select_category } = e.target;
        // postRecipe({
        //     category_id: select_category.value,
        //     title: name,
        //     description,
        //     ingredients,
        //     directions,
        // });
    };

    // async function postRecipe(fields) {
    //     try {
    //         const authToken = localStorage.getItem('authToken');
    //         const res = await fetch(`${config.API_ENDPOINT}/recipes`, {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //                 "authorization": `bearer ${authToken}`
    //             },
    //             body: JSON.stringify(fields)
    //         })
    //         const postedRecipe = await res.json();
    //         // switch current category id to the one the user
    //         // selected so that when they get to the recipe page, 
    //         // they can click back to go to the correct category
    //         // ie the category which the new recipe belongs to
    //         sessionStorage.setItem('currentCategoryId', `${postedRecipe.category_id}`);
    //         context.handleGetRecipes();
    //         props.history.push(`/recipes/${postedRecipe.id}`);
    //     } catch (err) {
            
    //     };
    // };

    // function renderOptions() {
    //     return categories.map(category => (
    //         <option
    //             key={category.id}
    //             id={category.id}
    //             value={category.id}
    //         >
    //             {category.category_name}
    //         </option>
    //     ))
    // };

    // function toggleHoverClass() {
    //     if (name.length !== 0) {
    //         return ['AddHabit__submit', 'allowHover'].join(' ')
    //     } else {
    //         return 'AddHabit__submit'

    //     };
    // };

    return (
        <div className='AddHabit__outermost-wrapper
        default-primary-color'>
            <div className='AddHabit__add-recipe-container
        default-primary-color'>
                <h2 className='AddHabit__heading 
            text-primary-color'>Add Recipe</h2>
                <form
                    onSubmit={handleSubmit}
                    className='AddHabit__add-recipe'>
                    <label
                        htmlFor='select_category'>
                        Select Category</label>
                    <select
                        className='select-category'
                        name='select_category'
                        id='select_category'
                        aria-label='select_category'>
                        {/* {renderOptions()} */}
                    </select>
                    <label
                        htmlFor='recipe_name'>
                        Recipe Name</label>
                    <input type='text'
                        name='recipe_name'
                        id='recipe_name'
                        aria-label='recipe_name'
                        // value={name}
                        // onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                    {/* <ValidationError
                        className='accent-color'
                        // message={validateName()}
                        errorPosition={'relative'}
                    /> */}
                    <label
                        htmlFor='description'>
                        Description</label>
                    <textarea
                        name='description'
                        id='description'
                        aria-label='description'
                        // value={description}
                        // onChange={e => setDescription(e.target.value)}
                    />
                    <label
                        htmlFor='ingredients'>
                        Ingredients</label>
                   
                    <label
                        htmlFor='directions'>
                        Directions</label>
                   
                    <div className='AddHabit__buttons-wrapper'>
                        <button
                            className='AddHabit__cancel-button 
                        allowHover'
                            type="button"
                            aria-label='Cancel'
                            onClick={handleCancel}>Cancel</button>
                        <button
                            // className={toggleHoverClass()}
                            type="submit"
                            aria-label='submit'
                            // disabled={name.length === 0}
                        >Save</button>
                    </div>
                </form>
            </div>
            <div className='bottom-color-area 
                       default-primary-color'>
            </div>
        </div>
    )
};

export default AddHabit