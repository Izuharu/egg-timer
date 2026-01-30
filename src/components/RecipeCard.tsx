import React from 'react';
import './RecipeCard.css';

interface RecipeCardProps {
    title: string;
    time: string;
    description: string;
    ingredients: string[];
    steps: string[];
    imageUrl?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
    title, time, description, ingredients, steps, imageUrl
}) => {
    return (
        <div className="recipe-card">
            {imageUrl && <img src={imageUrl} alt={title} className="recipe-image" />}
            <div className="recipe-content">
                <div className="recipe-header">
                    <h3>{title}</h3>
                    <span className="recipe-time">{time}</span>
                </div>
                <p className="recipe-desc">{description}</p>

                <div className="recipe-section">
                    <h4>Ingredients</h4>
                    <ul>
                        {ingredients.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>

                <div className="recipe-section">
                    <h4>Steps</h4>
                    <ol>
                        {steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                </div>
            </div>
        </div>
    );
};
