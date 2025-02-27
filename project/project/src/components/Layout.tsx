import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

// סגנונות עבור Layout
const useStyles = makeStyles(() => ({
    backgroundImage: {
        backgroundImage: 'url("./images/7.png")',
        height: '100vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    },
    appBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
    },
    appBarTitle: {
        color: '#C0392B',
        textAlign: 'left',
        flexGrow: 1,
    },
    button: {
        color: '#C0392B',
        borderBottom: '2px solid transparent',
        margin: '0 10px',
        '&:hover': {
            borderBottom: '2px solid #C0392B',
        },
    },
}));

interface LayoutProps {
    children: ReactNode; // הגדרת סוג children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.backgroundImage}>
            <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}> {/* צבע שחור עם שקיפות */}
                <Toolbar className={classes.appBar}>
                    <Typography variant="h4" className={classes.appBarTitle}>
                        מתכונים
                    </Typography>
                    <div>
                        <Button variant="text" className={classes.button} component={Link} to="/">
                            בית
                        </Button>
                        <Button variant="text" className={classes.button} component={Link} to="/register">
                            הרשמה
                        </Button>
                        <Button variant="text" className={classes.button} component={Link} to="/add-recipe">
                            הוספת מתכון
                        </Button>
                        <Button variant="text" className={classes.button} component={Link} to="/add-category"> {/* כפתור הוספת קטגוריה */}
                            הוספת קטגוריה
                        </Button>
                        <Button variant="text" className={classes.button} component={Link} to="/login">
                            התחברות
                        </Button>
                        <Button variant="text" className={classes.button} component={Link} to="/recipes">
                            מתכונים
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
