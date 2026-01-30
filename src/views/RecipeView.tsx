import React from 'react';
import { RecipeCard } from '../components/RecipeCard';
import './RecipeView.css';

// Using local paths for the images we will copy to public
const RECIPES = [
    {
        title: "Classic Soft Boiled",
        time: "6-7 mins",
        description: "The perfect breakfast egg with a runny yolk and set whites. Delicious with toast soldiers.",
        imageUrl: "/images/soft_boiled.png",
        ingredients: ["Fresh eggs (room temp)", "Water", "Pinch of salt", "Toast for serving"],
        steps: [
            "Bring a pot of water to a rolling boil.",
            "Gently lower eggs into the water.",
            "Boil for 6-7 minutes depending on size.",
            "Transfer immediately to an ice bath for 2 minutes.",
            "Peel carefully and serve."
        ]
    },
    {
        title: "Shakshuka",
        time: "20 mins",
        description: "North African dish of eggs poached in a sauce of tomatoes, chili peppers, and garlic.",
        imageUrl: "/images/shakshuka.png",
        ingredients: ["4 eggs", "1 can chopped tomatoes", "1 onion, diced", "1 bell pepper", "Cumin, Paprika, Chili powder"],
        steps: [
            "Sauté onion and peppers until soft.",
            "Add spices and cook for 1 minute.",
            "Pour in tomatoes and simmer until thickened.",
            "Make indentations and crack eggs into sauce.",
            "Cover and simmer for 5-8 minutes until whites set."
        ]
    },
    {
        title: "Korean Steamed Eggs",
        time: "15 mins",
        description: "Silky, fluffy steamed egg custard (Gyeran Jjim). ideal comfort food.",
        imageUrl: "",
        ingredients: ["3 eggs", "1 cup chicken stock or water", "1 tsp sesame oil", "Green onions", "Salt"],
        steps: [
            "Whisk eggs with stock and salt until frothy.",
            "Pour into a pot (earthenware is best) and cook on medium heat.",
            "Stir frequently scraping bottom until 80% cooked.",
            "Cover with a bowl and cook on low for 3 mins.",
            "Garnish with sesame oil and green onions."
        ]
    },
    {
        title: "Classic Deviled Eggs",
        time: "25 mins",
        description: "The ultimate party snack. Creamy, tangy yolks piped into firm egg whites.",
        imageUrl: "/images/deviled_eggs.png",
        ingredients: ["6 hard boiled eggs", "3 tbsp mayonnaise", "1 tsp dijon mustard", "Paprika", "Chives"],
        steps: [
            "Slice hard boiled eggs in half lengthwise.",
            "Remove yolks into a bowl and mash with fork.",
            "Mix in mayo, mustard, vinegar, salt and pepper.",
            "Pipe mixture back into egg whites.",
            "Sprinkle with paprika and chives."
        ]
    },
    {
        title: "Creamy Scrambled Eggs",
        time: "10 mins",
        description: "Soft, custard-like curds. The key is low heat and patience.",
        imageUrl: "/images/scrambled_eggs.png",
        ingredients: ["3 eggs", "1 tbsp butter", "Salt", "Chives", "Toast"],
        steps: [
            "Crack eggs into a cold non-stick pan.",
            "Add butter and turn heat to medium-low.",
            "Stir constantly with spatula.",
            "Remove from heat when curds form but look wet.",
            "Season with salt and serve on toast."
        ]
    },
    {
        title: "Egg Salad Sandwich",
        time: "15 mins",
        description: "Chunky, savory egg salad on a buttery croissant. Perfect for picnics.",
        imageUrl: "/images/egg_salad.png",
        ingredients: ["4 hard boiled eggs", "2 tbsp mayo", "1 celery stalk diced", "1 tsp lemon juice", "Lettuce", "Croissant"],
        steps: [
            "Peel and roughly chop the boiled eggs.",
            "Mix with mayo, celery, lemon juice, salt, pepper.",
            "Slice croissant in half.",
            "Layer lettuce and pile on egg salad.",
            "Enjoy immediately."
        ]
    }
];

export const RecipeView: React.FC = () => {
    return (
        <div className="view-container recipe-view">
            <div className="recipe-page-header">
                <h2>Egg Recipes</h2>
                <p>Delicious ways to enjoy your perfectly cooked eggs</p>
            </div>
            {RECIPES.map((recipe, i) => (
                <RecipeCard key={i} {...recipe} />
            ))}
        </div>
    );
};
