import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../types/User";
import { useUserContext } from "./UserContext";
import axios from "axios";
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from './Layout'; // ודא שאתה מייבא את הקומפוננטה Layout
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    backgroundImage: {
        backgroundImage: 'url("./images/7.png")', 
        height: '100vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        width: 'auto',  // שיניתי את הרוחב ל-auto
        maxWidth: '400px',
    },
    submitButton: {
        backgroundColor: '#f50057',
        '&:hover': {
            backgroundColor: '#c51162',
        },
    },
}));

const validationSchema = object({
    UserName: string().required("Username is required").max(20, "Username cannot be more than 20 characters"),
    Name: string().required("Lastname is required").max(20, "Lastname cannot be more than 20 characters"),
    Password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
    Phone: string().required("Phone is required"),
    Email: string().required("Email is required").email("Email is not valid"),
    Tz: string().required("ID number is required"),
});

export default function Register() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<User>({
        // resolver: yupResolver(validationSchema),
    });
    const { setMyUser } = useUserContext();    

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            console.log("submitted");
            const response = await registerUser(data);
            console.log(response);
            setMyUser(data);
            navigate('/recipes');
        } catch (error) {
            console.error(error);
        }
    };

    const registerUser = async (user: User) => {
        try {
            const response = await axios.post<User>('http://localhost:8080/api/user/sighin', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert("User registered successfully!");
            return response.data;
        } catch (error) {
            // בדוק אם השגיאה מכילה תגובה מהשרת
            if (axios.isAxiosError(error) && error.response) {
                // הצג את הודעת השגיאה מהשרת
                alert(`Error: ${error.response.data}`); // או כל הודעה אחרת שתרצה
            } else {
                // במקרה של שגיאה אחרת
                alert("Error registering user. Please try again.");
            }
            console.error(error);
        }
    };
    

    return (
        <Layout>
            <div className={classes.backgroundImage}>
                <Container className={classes.formContainer}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Registration
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField 
                            {...register("UserName")} 
                            label="Username" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                            error={!!errors.UserName}
                            helperText={errors.UserName ? errors.UserName.message : ''}
                        />
                        <TextField 
                            {...register("Name")} 
                            label="Name" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                            error={!!errors.Name}
                            helperText={errors.Name ? errors.Name.message : ''}
                        />
                        <TextField 
                            type="password" 
                            {...register("Password")} 
                            label="Password" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                            error={!!errors.Password}
                            helperText={errors.Password ? errors.Password.message : ''}
                        />
                        <TextField 
                            {...register("Phone")} 
                            label="Phone" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                            error={!!errors.Phone}
                            helperText={errors.Phone ? errors.Phone.message : ''}
                        />
                        <TextField 
                            {...register("Email")} 
                            label="Email" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                            error={!!errors.Email}
                            helperText={errors.Email ? errors.Email.message : ''}
                        />
                        <TextField 
                            {...register("Tz")} 
                            label="ID Number" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                            error={!!errors.Tz}
                            helperText={errors.Tz ? errors.Tz.message : ''}
                        />
                        <Button type="submit" variant="contained" className={classes.submitButton} fullWidth>
                            Register
                        </Button>
                    </form>
                </Container>
            </div>
        </Layout>
    );
}
