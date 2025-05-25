// Shared functionality across all pages

// Initialize local storage for recipes if not exists
if (!localStorage.getItem('recipes')) {
    localStorage.setItem('recipes', JSON.stringify([]));
}

// Initialize local storage for user profile if not exists
if (!localStorage.getItem('userProfile')) {
    localStorage.setItem('userProfile', JSON.stringify({}));
}

// Sample recipes for demo purposes
function initializeSampleRecipes() {
    const sampleRecipes = [
        {
            id: 1,
            name: "Avocado Toast",
            image: "https://images.unsplash.com/photo-1515446134809-993c501ca304",
            category: "breakfast",
            tags: ["vegetarian", "quick", "healthy"],
            cookingTime: 10,
            ingredients: ["2 slices whole grain bread", "1 ripe avocado", "1 tbsp olive oil", "Salt and pepper to taste", "Red pepper flakes (optional)"],
            instructions: ["Toast the bread until golden and crisp.", "Mash the avocado in a bowl with olive oil, salt, and pepper.", "Spread the avocado mixture on the toast.", "Sprinkle with red pepper flakes if desired."],
            calories: 320,
            protein: 8,
            carbs: 30,
            fats: 20,
            author: "system",
            likes: 42,
            comments: 5
        },
        {
            id: 2,
            name: "Quinoa Salad",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
            category: "lunch",
            tags: ["vegan", "high-protein", "gluten-free"],
            cookingTime: 25,
            ingredients: ["1 cup quinoa", "2 cups water", "1 cucumber, diced", "1 cup cherry tomatoes, halved", "1/4 cup red onion, finely chopped", "1/4 cup olive oil", "2 tbsp lemon juice", "Salt and pepper to taste"],
            instructions: ["Rinse quinoa under cold water.", "Cook quinoa in water according to package instructions.", "Let quinoa cool.", "In a large bowl, combine quinoa with cucumber, tomatoes, and red onion.", "Whisk together olive oil, lemon juice, salt, and pepper.", "Pour dressing over salad and toss to combine."],
            calories: 280,
            protein: 12,
            carbs: 35,
            fats: 12,
            author: "system",
            likes: 36,
            comments: 8
        }
    ];

    const existingRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (existingRecipes.length === 0) {
        localStorage.setItem('recipes', JSON.stringify(sampleRecipes));
    }
}

// Initialize sample data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSampleRecipes();
});