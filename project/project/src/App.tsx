import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

import AddRecipe from './components/AddRecipe';
import Register from './components/SignIn';
import Receips from './components/Receips';
import EditRecipe from './components/EditRecipe';
import UserProvider from './components/UserContext';
import Home from './components/home';
import AddCategory from './components/AddCategory';

function App() {
    return (
       < UserProvider>
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipes" element={<Receips/>} />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/edit-recipe/:id" element={<EditRecipe />} /> 
                <Route path="//add-category" element={<AddCategory />} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
