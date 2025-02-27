import { SubmitHandler, useForm } from "react-hook-form"
import { User } from "../types/User";
import axios from "axios";
import { useUserContext } from "./UserContext";
import {  useNavigate } from "react-router-dom";
export default function Login() {
    const { register, handleSubmit } = useForm<User>();
    const { setMyUser } = useUserContext();
    const navigate = useNavigate();
    const loginUser = async (user: User) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.post<User>('http://localhost:8080/api/user/login', user, { headers });
            return response; // החזר את התגובה
        } catch (error) {
            console.error("Login error:", error);
            return null; // החזר null במקרה של שגיאה
        }
    }
    
    const onSubmit: SubmitHandler<User> = async (data) => {
        console.log("Form submitted with data:", data);
        
        try {
            const response = await loginUser(data);
            
            if (response && response.data) {
                console.log("logged in");
                setMyUser(response.data);
                navigate('/recipes');
            } else {
                console.log("logged out");
                navigate('/register');
            }
        } catch (error) {
            console.log("Error during login:", error);
        }
    }
    
    
    return (
        <div>
           
            <form onSubmit={handleSubmit((data) => { 
                console.log("Submitting form..."); // הוסף שורה זו
                onSubmit(data); 
            })}>
                <input type="text" {...register("UserName", { required: true })} placeholder="Username" />
                <input type="password" {...register("Password", { required: true, minLength: 2 })} placeholder="Password" />
                <button type="submit">שלח </button>
            </form>
        </div>
    )
}
