// import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
// import axios from 'axios';
// import { useNavigate} from "react-router-dom";
// import { Recipe } from '../types/receipe';


// // הגדרת ממשק עבור הנתונים
// interface RecipeForm {
//     id?: number;
//     name: string;
//     img: string;
//     duration: number;
//     difficulty: number; // שיניתי ל-number בשביל דרגת קושי
//     description: string;
//     ingredients: {
//         id?: number; // הוספת ID
//         name: string;
//         count: number;
//         type: string;
//     }[];
//     instructions: {
//         id?: number; // הוספת ID
//         name: string;
//     }[];
//     userId: number; // הוספת UserId
//     categoryId?: string; // הוספת CategoryId
// }

// const AddRecipe = () => {
//     const navigate = useNavigate();
//     const { register, handleSubmit, control } = useForm<RecipeForm>();
//     const { fields: ingredients, append: appendIngredient } = useFieldArray({
//         control,
//         name: "ingredients"
//     });
//     const { fields: instructions, append: appendInstruction } = useFieldArray({
//         control,
//         name: "instructions"
//     });

//     const onSubmit: SubmitHandler<RecipeForm> = async (data) => {
//         const recipeData = {
//             Id: data.id,
//             Name: data.name,
//             Img: data.img,
//             Duration: data.duration,
//             Difficulty: data.difficulty,
//             Description: data.description,
//             Ingridents: data.ingredients.map((ingredient, index) => ({
//                 Id: index,
//                 Name: ingredient.name,
//                 Count: ingredient.count.toString(),
//                 Type: ingredient.type,
//             })),
//             Instructions: data.instructions.map((instruction, index) => ({
//                 Id: index,
//                 Name: instruction.name,
//             })),
//             UserId: data.userId||1, // הוספת UserId
//             CategoryId: data.categoryId||1, // הוספת CategoryId
//         };

//         try {
//             await axios.post<Recipe>('http://localhost:8080/api/recipe', recipeData);
//             console.log('Recipe added successfully!');
//             navigate("/recipes");
            
//         } catch (error) {
//             console.error('Error adding recipe:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>הוספת מתכון חדש</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label>:שם המתכון</label>
//                     <input {...register("name", { required: true })} />
//                 </div>
//                 <div>
//                     <label>תמונה (URL):</label>
//                     <input {...register("img", { required: true })} />
//                 </div>
//                 <div>
//                     <label>זמן הכנה:</label>
//                     <input type="number" {...register("duration", { required: true })} />
//                 </div>
//                 <div>
//                     <label>רמת קושי:</label>
//                     <input type="number" {...register("difficulty", { required: true })} />
//                 </div>
//                 <div>
//                     <label>תיאור:</label>
//                     <textarea {...register("description", { required: true })} />
//                 </div>
//                 {/* <div>
//                     <label>User ID:</label>
//                     <input type="number" {...register("userId", { required: true })} />
//                 </div> */}
//                 <div>
//                     <label>קטגוריה:</label>
//                     <select {...register("categoryId", { required: true })}>
//                         <option value="">בחר קטגוריה</option>
//                         <option value="dairy">חלבי</option>
//                         <option value="pareve">פרווה</option>
//                         <option value="meat">בשרי</option>
//                     </select>
//                 </div>
//                 <h3>רכיבים:</h3>
//                 {ingredients.map((ingredient, index) => (
//                     <div key={ingredient.id}>
//                         <input
//                             placeholder="שם רכיב"
//                             {...register(`ingredients.${index}.name`, { required: true })}
//                         />
//                         <input
//                             type="number"
//                             placeholder="כמות"
//                             {...register(`ingredients.${index}.count`, { required: true })}
//                         />
//                         <input
//                             placeholder="סוג"
//                             {...register(`ingredients.${index}.type`, { required: true })}
//                         />
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => appendIngredient({ name: '', count: 0, type: '' })}>הוסף רכיב</button>
//                 <h3>:הוראות</h3>
//                 {instructions.map((instruction, index) => (
//                     <div key={instruction.id}>
//                         <input
//                             placeholder="הוראה"
//                             {...register(`instructions.${index}.name`, { required: true })}
//                         />
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => appendInstruction({ name: '' })}>הוסף הוראה:</button>
//                 <button type="submit">שמור מתכון</button>
//             </form>
//         </div>
//     );
// };

// export default AddRecipe;
// import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid'; // הוספת ספריית UUID
// import { Recipe } from '../types/receipe';
// import { Category } from '../types/Category';

// // הגדרת ממשק עבור הנתונים
// interface RecipeForm {
//     name: string;
//     img: string;
//     duration: number;
//     difficulty: number;
//     description: string;
//     ingredients: {
//         id?: string; // שיניתי ל-string כדי להתאים ל-ID הייחודי
//         name: string;
//         count: number;
//         type: string;
//     }[];
//     instructions: {
//         id?: string; // שיניתי ל-string כדי להתאים ל-ID הייחודי
//         name: string;
//     }[];
//     userId: number;
//     categoryId: string;
// }



// const AddRecipe = () => {
//     const navigate = useNavigate();
//     const { register, handleSubmit, control } = useForm<RecipeForm>();
//     const { fields: ingredients, append: appendIngredient } = useFieldArray({
//         control,
//         name: "ingredients"
//     });
//     const { fields: instructions, append: appendInstruction } = useFieldArray({
//         control,
//         name: "instructions"
//     });

//     const [categories, setCategories] = useState<Category[]>([]);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get<Category[]>('http://localhost:8080/api/category', {
//                 timeout: 5000, // Set timeout to 5 seconds
//             });
//             setCategories(response.data);
//             console.log('Categories fetched:', response.data); // הדפסת מערך הקטגוריות לקונסול
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };
    
    

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const onSubmit: SubmitHandler<RecipeForm> = async (data) => {
       

//         // בדוק אם כל השדות הנדרשים קיימים
//         if (!data.name || !data.img || !data.duration || !data.difficulty || !data.description || !data.categoryId) {
//             console.error('All required fields must be filled.');
//             return;
//         }
    
//         const recipeData = {
//             Id: 0,
//             Name: data.name,
//             Img: data.img,
//             Duration: data.duration,
//             Difficulty: data.difficulty,
//             Description: data.description,
//             Ingridents: data.ingredients.map((ingredient) => ({
//                 Id: ingredient.id || uuidv4(),
//                 Name: ingredient.name,
//                 Count: ingredient.count.toString(), // ודא שזה מומר למחרוזת אם זה מה שהשרת מצפה
//                 Type: ingredient.type,
//             })),
//             Instructions: data.instructions.map((instruction) => ({
//                 Id: instruction.id || uuidv4(),
//                 Name: instruction.name,
//             })),
//             UserId: data.userId || 1, // ודא שזה נכון
//             CategoryId: data.categoryId||1,
//         };
    
//         try {
//             console.log('Data to be sent:', recipeData);

//             const response = await axios.post<RecipeForm>('http://localhost:8080/api/recipe', recipeData);
//             console.log('Recipe added successfully!', response.data);
//             navigate("/recipes");
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.error('Axios error:', error.message);
//             } else {
//                 console.error('Unexpected error:', error);
//             }
//         }
//     };
    

//     return (
//         <div>
//             <h1>הוספת מתכון חדש</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label>:שם המתכון</label>
//                     <input {...register("name", { required: true })} />
//                 </div>
//                 <div>
//                     <label>תמונה (URL):</label>
//                     <input {...register("img", { required: true })} />
//                 </div>
//                 <div>
//                     <label>זמן הכנה:</label>
//                     <input type="number" {...register("duration", { required: true })} />
//                 </div>
//                 <div>
//                     <label>רמת קושי:</label>
//                     <input type="number" {...register("difficulty", { required: true })} />
//                 </div>
//                 <div>
//                     <label>תיאור:</label>
//                     <textarea {...register("description", { required: true })} />
//                 </div>
//                 <div>
//                     <label>קטגוריה:</label>
//                     <select {...register("categoryId", { required: true })}>
//                         <option value="">בחר קטגוריה</option>
//                         {categories.map(category => (
//                             <option key={category.Id} value={category.Id}>{category.Name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <h3>רכיבים:</h3>
//                 {ingredients.map((ingredient) => (
//                     <div key={ingredient.id ? ingredient.id : uuidv4()}> {/* שימוש ב-ID או ID ייחודי */}
//                         <input
//                             placeholder="שם רכיב"
//                             {...register(`ingredients.${ingredients.indexOf(ingredient)}.name`, { required: true })}
//                         />
//                         <input
//                             type="number"
//                             placeholder="כמות"
//                             {...register(`ingredients.${ingredients.indexOf(ingredient)}.count`, { required: true })}
//                         />
//                         <input
//                             placeholder="סוג"
//                             {...register(`ingredients.${ingredients.indexOf(ingredient)}.type`, { required: true })}
//                         />
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => appendIngredient({ id: uuidv4(), name: '', count: 0, type: '' })}>הוסף רכיב</button>
//                 <h3>:הוראות</h3>
//                 {instructions.map((instruction) => (
//                     <div key={instruction.id ? instruction.id : uuidv4()}> {/* שימוש ב-ID או ID ייחודי */}
//                         <input
//                             placeholder="הוראה"
//                             {...register(`instructions.${instructions.indexOf(instruction)}.name`, { required: true })}
//                         />
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => appendInstruction({ id: uuidv4(), name: '' })}>הוסף הוראה:</button>
//                 <button type="submit">שמור מתכון</button>
//             </form>
//         </div>
//     );
// };

// export default AddRecipe;



import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// הגדרת ממשק עבור הנתונים
interface RecipeForm {
    Name: string;
    Img: string;
    Duration: number;
    Difficulty: number; // שיניתי ל-number בשביל דרגת קושי
    Description: string;
    Ingridents: {
        id?: number; // הוספת ID
        Name: string;
        Count: number;
        Type: string;
    }[];
    Instructions: {
        id?: number; // הוספת ID
        Name: string;
    }[];
    UserId: number; // הוספת UserId
    CategoryId: string; // הוספת CategoryId
}

const AddRecipe = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control } = useForm<RecipeForm>();
    const { fields: ingredients, append: appendIngredient } = useFieldArray({
        control,
        name: "Ingridents"
    });
    const { fields: instructions, append: appendInstruction } = useFieldArray({
        control,
        name: "Instructions"
    });

    const onSubmit: SubmitHandler<RecipeForm> = async (data) => {
        const recipeData = {
            Name: data.Name,
            Img: data.Img,
            Duration: data.Duration,
            Difficulty: data.Difficulty,
            Description: data.Description,
            Ingridents: data.Ingridents.map((ingredient) => ({
                Id: ingredient.id,
                Name: ingredient.Name,
                Count: ingredient.Count.toString(),
                Type: ingredient.Type,
            })),
            Instructions: data.Instructions.map((instruction) => ({
                Id: instruction.id,
                Name: instruction.Name,
            })),
            // UserId: data.UserId || 1, // הוספת UserId
            // CategoryId: data.CategoryId, // הוספת CategoryId
        };

        try {
    await axios.post(`http://localhost:8080/api/recipe`, recipeData);
            console.log('Recipe added successfully!');
            navigate("/recipes");
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div>
            <h1>הוספת מתכון חדש</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>:שם המתכון</label>
                    <input {...register("Name", { required: true })} />
                </div>
                <div>
                    <label>תמונה (URL):</label>
                    <input {...register("Img", { required: true })} />
                </div>
                <div>
                    <label>זמן הכנה:</label>
                    <input type="number" {...register("Duration", { required: true })} />
                </div>
                <div>
                    <label>רמת קושי:</label>
                    <input type="number" {...register("Difficulty", { required: true })} />
                </div>
                <div>
                    <label>תיאור:</label>
                    <textarea {...register("Description", { required: true })} />
                </div>
                <div>
                    <label>קטגוריה:</label>
                    <select {...register("CategoryId", { required: true })}>
                        <option value="">בחר קטגוריה</option>
                        <option value="dairy">חלבי</option>
                        <option value="pareve">פרווה</option>
                        <option value="meat">בשרי</option>
                    </select>
                </div>
                <h3>רכיבים:</h3>
                {ingredients.map((ingredient, index) => (
                    <div key={ingredient.id}>
                        <input
                            placeholder="שם רכיב"
                            {...register(`Ingridents.${index}.Name`, { required: true })}
                        />
                        <input
                            type="number"
                            placeholder="כמות"
                            {...register(`Ingridents.${index}.Count`, { required: true })}
                        />
                        <input
                            placeholder="סוג"
                            {...register(`Ingridents.${index}.Type`, { required: true })}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => appendIngredient({ Name: '', Count: 0, Type: '' })}>הוסף רכיב</button>
                <h3>:הוראות</h3>
                {instructions.map((instruction, index) => (
                    <div key={instruction.id}>
                        <input
                            placeholder="הוראה"
                            {...register(`Instructions.${index}.Name`, { required: true })}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => appendInstruction({ Name: '' })}>הוסף הוראה:</button>
                <button type="submit">שמור מתכון</button>
            </form>
        </div>
    );
};

export default AddRecipe;

