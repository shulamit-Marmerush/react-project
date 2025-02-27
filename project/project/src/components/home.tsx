
import {  Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Layout from './Layout'; // ודא שאתה מייבא את הקומפוננטה Layout

const useStyles = makeStyles(() => ({
    overlay: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <Layout>
            <div className={classes.overlay}>
                <Typography variant="h4" sx={{ color: '#C0392B' }}>טעימה מהמתכונים</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#C0392B', color: 'white', '&:hover': { backgroundColor: '#A52A2A' } }} component={Link} to="/recipes">
                    לעבור למתכונים
                </Button>
            </div>
        </Layout>
    );
}

export default Home;

