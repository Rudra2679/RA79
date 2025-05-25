document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipe-post-form');
    
    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('recipe-name').value;
        const image = document.getElementById('recipe-image').value;
        const category = document.getElementById('recipe-category').value;
        const tags = document.getElementById('recipe-tags').value.split(',').map(tag => tag.trim());
        const cookingTime = parseInt(document.getElementById('cooking-time').value);
        const ingredients = document.getElementById('ingredients').value.split('\n').filter(line => line.trim() !== '');
        const instructions = document.getElementById('instructions').value.split('\n').filter(line => line.trim() !== '');
        const calories = parseInt(document.getElementById('calories').value) || 0;
        const protein = parseInt(document.getElementById('protein').value) || 0;
        const carbs = parseInt(document.getElementById('carbs').value) || 0;
        const fats = parseInt(document.getElementById('fats').value) || 0;
        
        // Create recipe object
        const newRecipe = {
            id: Date.now(), // Simple unique ID
            name,
            image: image || 'https://via.placeholder.com/400x300?text=No+Image',
            category,
            tags,
            cookingTime,
            ingredients,
            instructions,
            calories,
            protein,
            carbs,
            fats,
            author: 'user', // In a real app, this would be the logged-in user
            likes: 0,
            comments: []
        };
        
        // Save to local storage
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        
        // Show success message
        alert('Recipe posted successfully!');
        
        // Reset form
        recipeForm.reset();
    });
});