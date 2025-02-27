import  { useState } from 'react';
import axios from 'axios';
import { Category } from '../types/Category';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');

    const addCategory = async () => {
        const newCategory = {
            Id: 0, // תן מזהה ייחודי, אם נדרש
            Name: categoryName,
        };

        try {
            const response = await axios.post<Category>('http://localhost:8080/api/category', newCategory);
            console.log('New category added:', response.data); // הדפסת הקטגוריה החדשה שהוספה
            setCategoryName('');
            navigate("/home");
            // ניקוי השדה לאחר הוספה
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div>
            <h1>הוספת קטגוריה חדשה</h1>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="שם הקטגוריה"
            />
            <button onClick={addCategory}>הוסף קטגוריה</button>
        </div>
    );
};

export default AddCategory;
