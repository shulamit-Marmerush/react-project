// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Recipe } from "../types/receipe"; // ודא שהשם נכון
// import { Category } from "../types/Category";
// import { useUserContext } from "./UserContext";


// const Receips = () => {
//     const navigate = useNavigate();
//     const [recipes, setRecipes] = useState<Recipe[]>([]);
//     const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState<string>('');
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [duration, setDuration] = useState<number | ''>('');
//     const {user}=useUserContext();

//     useEffect(() => {
//         const fetchReceips = async () => {
//             try {
//                 const response = await axios.get<Recipe[]>('http://localhost:8080/api/recipe');
//                 setRecipes(response.data);
//                 setFilteredRecipes(response.data); // עדכן את המערך המסונן
//                 const categoryResponse = await axios.get<Category[]>('http://localhost:8080/api/category');
//                 setCategories(categoryResponse.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchReceips();
//     }, []);
    
//     useEffect(() => {
//         // סינון המתכונים
//         const filtered = recipes.filter(recipe => {
//             const matchesCategory = selectedCategory ? recipe.CategoryId.toString() === selectedCategory : true;
//             const matchesDuration = duration ? recipe.Duration <= duration : true;
//             const matchesSearch = recipe.Name.toLowerCase().includes(searchTerm.toLowerCase());
//             return matchesCategory && matchesDuration && matchesSearch;
//         });
//         setFilteredRecipes(filtered);
//     }, [selectedCategory, duration, searchTerm, recipes]);

//     const handleEdit = (id: number,userid:number) => {
//         if (userid !== user?.id) {
//             alert("אין לך הרשאות לערוך מתכון זה.");
//             return; // או תוכל להציג הודעה למשתמש
//         }
//         navigate(`/edit-recipe/${id}`);
//     };

//     const handleDelete = async (id: number,userid:number) => {
//         if (userid !== user?.id) {
//             alert("אין לך הרשאות למחוק מתכון זה.");
//             return; // או תוכל להציג הודעה למשתמש
//         }
//         const confirmDelete = window.confirm("האם אתה בטוח שברצונך למחוק את המתכון?");
//         if (confirmDelete) {
//             try {
//                 const response = await axios.post(`http://localhost:8080/api/recipe/delete/${id}`);
//                 if (response.status === 200 || response.status === 201) {
//                     setRecipes(recipes.filter(recipe => recipe.Id !== id));
//                     alert("המתכון נמחק בהצלחה!");
//                 } else {
//                     alert("מחיקת המתכון נכשלה.");
//                 }
//             } catch (error) {
//                 console.error(error);
//                 alert("אירעה שגיאה במחיקת המתכון.");
//             }
//         }
//     };

//     return (
//         <div>
//             <h1>All Recipes</h1>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="חפש מתכון..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
//                     <option value="">בחר קטגוריה</option>
//                     {categories.map(category => (
//                         <option key={category.Id} value={category.Id}>{category.Name}</option>
//                     ))}
//                 </select>
//                 <input
//                     type="number"
//                     placeholder="משך זמן (דקות)"
//                     value={duration}
//                     onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : '')}
//                 />
//             </div>
//             <ul>
//                 {filteredRecipes.map(recipe => (
//                     <li key={recipe.Id}>
//                         <h2>{recipe.Name}</h2>
//                         <img 
//     src={recipe.Img} 
//     alt={recipe.Name} 
//     onError={(e) => { 
//         const target = e.target as HTMLImageElement; // המרה ל-HTMLImageElement
//         target.onerror = null; 
//         target.src = ""; // החלף ב-URL לתמונה ברירת מחדל
//     }} 
// />
//                         <p><strong>:זמן הכנה</strong> {recipe.Duration} minutes</p>
//                         <p><strong>:רמת קושי</strong> {recipe.Difficulty}</p>
//                         <p><strong>:תיאור</strong> {recipe.Description}</p>
//                         <h3>:רכיבים </h3>
//                         <ul>
//                             {recipe.Ingridents.map(ingredient => (
//                                 <li key={ingredient.Id}>{ingredient.Name} - {ingredient.Count} {ingredient.Type}</li>
//                             ))}
//                         </ul>
//                         <h3>הוראות:</h3>
//                         <ol>
//                             {recipe.Instructions.map(instruction => (
//                                 <li key={instruction.Id}>{instruction.Name}</li>
//                             ))}
//                         </ol>
//                         <button onClick={() => handleDelete(recipe.Id,recipe.UserId)}>מחיקה</button>
//                         <button onClick={() => { handleEdit(recipe.Id,recipe.UserId) }}>עריכה</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Receips;
import Layout from './Layout';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../types/receipe";
import { Category } from "../types/Category";
import { useUserContext } from "./UserContext";
import {
    TextField,
    Select,
    MenuItem,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Grid,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Receips = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [duration, setDuration] = useState<number | ''>('');
    const { user } = useUserContext();

    useEffect(() => {
        const fetchReceips = async () => {
            try {
                const response = await axios.get<Recipe[]>('http://localhost:8080/api/recipe');
                setRecipes(response.data);
                setFilteredRecipes(response.data);
                const categoryResponse = await axios.get<Category[]>('http://localhost:8080/api/category');
                setCategories(categoryResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReceips();
    }, []);

    useEffect(() => {
        const filtered = recipes.filter(recipe => {
            const matchesCategory = selectedCategory ? recipe.CategoryId.toString() === selectedCategory : true;
            const matchesDuration = duration ? recipe.Duration <= duration : true;
            const matchesSearch = recipe.Name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesDuration && matchesSearch;
        });
        setFilteredRecipes(filtered);
    }, [selectedCategory, duration, searchTerm, recipes]);

    const handleEdit = (id: number, userid: number) => {
        if (userid !== user?.Id) {
            alert("אין לך הרשאות לערוך מתכון זה.");
            return;
        }
        navigate(`/edit-recipe/${id}`);
    };

    const handleDelete = async (id: number, userid: number) => {
        if (userid !== user?.Id) {
            alert("אין לך הרשאות למחוק מתכון זה.");
            return;
        }
        const confirmDelete = window.confirm("האם אתה בטוח שברצונך למחוק את המתכון?");
        if (confirmDelete) {
            try {
                const response = await axios.post(`http://localhost:8080/api/recipe/delete/${id}`);
                if (response.status === 200 || response.status === 201) {
                    setRecipes(recipes.filter(recipe => recipe.Id !== id));
                    alert("המתכון נמחק בהצלחה!");
                } else {
                    alert("מחיקת המתכון נכשלה.");
                }
            } catch (error) {
                console.error(error);
                alert("אירעה שגיאה במחיקת המתכון.");
            }
        }
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>כל המתכונים</Typography>
            <div>
                <TextField
                    label="חפש מתכון..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    sx={{ marginRight: 2 }}
                >
                    <MenuItem value="">
                        <em>בחר קטגוריה</em>
                    </MenuItem>
                    {categories.map(category => (
                        <MenuItem key={category.Id} value={category.Id}>{category.Name}</MenuItem>
                    ))}
                </Select>
                <TextField
                    type="number"
                    label="משך זמן (דקות)"
                    variant="outlined"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : '')}
                    sx={{ marginRight: 2 }}
                />
            </div>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {filteredRecipes.map(recipe => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={recipe.Img}
                                alt={recipe.Name}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "./images/8.webp"; // החלף ב-URL לתמונה ברירת מחדל
                                }}
                            />
                            <CardContent>
                                <Typography variant="h5">{recipe.Name}</Typography>
                                <Typography variant="body2"><strong>:זמן הכנה</strong> {recipe.Duration} דקות</Typography>
                                <Typography variant="body2"><strong>:רמת קושי</strong> {recipe.Difficulty}</Typography>
                                <Typography variant="body2"><strong>:תיאור</strong> {recipe.Description}</Typography>
                                <Typography variant="h6">:רכיבים</Typography>
                                <ul>
                                    {recipe.Ingridents.map(ingredient => (
                                        <li key={ingredient.Id}>{ingredient.Name} - {ingredient.Count} {ingredient.Type}</li>
                                    ))}
                                </ul>
                                <Typography variant="h6">הוראות:</Typography>
                                <ol>
                                    {recipe.Instructions.map(instruction => (
                                        <li key={instruction.Id}>{instruction.Name}</li>
                                    ))}
                                </ol>
                                <IconButton color="secondary" onClick={() => handleDelete(recipe.Id, recipe.UserId)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton color="primary" onClick={() => handleEdit(recipe.Id, recipe.UserId)}>
                                    <EditIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
};

export default Receips;
