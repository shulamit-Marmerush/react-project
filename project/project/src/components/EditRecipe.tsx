import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "../types/receipe"; // ודא שהשם נכון

const EditRecipe = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
   

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get<Recipe>(`http://localhost:8080/api/recipe/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (recipe) {
            const { name, value } = e.target;
            setRecipe({ ...recipe, [name]: value });
        }
    };

    const handleIngredientChange = (index: number, value: string) => {
        if (recipe) {
            const updatedIngredients = [...recipe.Ingridents];
            updatedIngredients[index].Name = value; // או כל שדה אחר שתרצה לעדכן
            setRecipe({ ...recipe, Ingridents: updatedIngredients });
        }
    };

    const handleInstructionChange = (index: number, value: string) => {
        if (recipe) {
            const updatedInstructions = [...recipe.Instructions];
            updatedInstructions[index].Name = value; // או כל שדה אחר שתרצה לעדכן
            setRecipe({ ...recipe, Instructions: updatedInstructions });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipe) {
            console.error("Recipe is null or undefined");
            return;
        }

        try {
            const updatedRecipe = {
                Id: recipe.Id,
                Name: recipe.Name,
                Img: recipe.Img,
                Duration: recipe.Duration,
                Difficulty: recipe.Difficulty,
                Description: recipe.Description,
                Ingridents: recipe.Ingridents,
                Instructions: recipe.Instructions,
                UserId: recipe.UserId || "defaultUserId",
                CategoryId: recipe.CategoryId || "defaultCategoryId"
            };
            

            await axios.post(`http://localhost:8080/api/recipe/edit`, updatedRecipe);
            navigate("/recipes");
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>עריכת מתכון</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID המתכון:</label>
                    <input type="text" name="Id" value={recipe.Id} readOnly />
                </div>
                <div>
                    <label>שם המתכון:</label>
                    <input type="text" name="Name" value={recipe.Name} onChange={handleChange} required />
                </div>
                <div>
                    <label>תמונה (URL):</label>
                    <input type="text" name="Img" value={recipe.Img} onChange={handleChange} required />
                </div>
                <div>
                    <label>זמן הכנה:</label>
                    <input type="number" name="Duration" value={recipe.Duration} onChange={handleChange} required />
                </div>
                <div>
                    <label>רמת קושי:</label>
                    <input type="text" name="Difficulty" value={recipe.Difficulty} onChange={handleChange} required />
                </div>
                <div>
                    <label>תיאור:</label>
                    <textarea name="Description" value={recipe.Description} onChange={handleChange} required />
                </div>
                <div>
                    <label>רכיבים:</label>
                    {recipe.Ingridents.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={`${ingredient.Count} ${ingredient.Type} ${ingredient.Name}`}

                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                required
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label>הוראות:</label>
                    {recipe.Instructions.map((instruction, index) => (
                        <div key={index}>
                            <input
                                type="text"
                            value={`,${instruction.Name}`}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                required
                            />
                        </div>
                    ))}
                </div>
                <button type="submit">שמור מתכון</button>
            </form>
        </div>
    );
};

export default EditRecipe;
