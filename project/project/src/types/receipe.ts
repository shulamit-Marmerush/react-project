import { Ingredient } from "./Ingredient ";
import { Instruction } from "./Instruction";

export type Recipe=
{
    Id: number;
    Name: string;
    Img: string;
    Duration: number; // אם מדובר בזמן, כדאי לשמור על מספר
    Difficulty: number; // אם מדובר בדרגת קושי, כדאי לשמור על מספר
    Description: string;
    Ingridents: Ingredient[]; // רשימה של רכיבים
    Instructions: Instruction[]; 
    // רשימה 
    UserId: number; // הוספת UserId
    CategoryId: number;
}