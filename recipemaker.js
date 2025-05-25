document.addEventListener('DOMContentLoaded', function() {
    const findRecipesBtn = document.getElementById('find-recipes');
    const recipeResults = document.getElementById('recipe-results');
    
    findRecipesBtn.addEventListener('click', function() {
        const ingredientsInput = document.getElementById('available-ingredients').value;
        const nutritionFocus = document.getElementById('nutrition-focus').value;
        
        const ingredients = ingredientsInput.split(',').map(ing => ing.trim().toLowerCase());
        
        // Get all recipes
        const allRecipes = JSON.parse(localStorage.getItem('recipes'));
        
        // Filter recipes based on available ingredients
        const matchingRecipes = allRecipes.filter(recipe => {
            // Check if at least 2 ingredients match
            const matchingIngredients = recipe.ingredients.filter(recipeIng => {
                const recipeIngLower = recipeIng.toLowerCase();
                return ingredients.some(inputIng => recipeIngLower.includes(inputIng));
            });
            
            return matchingIngredients.length >= 2;
        });
        
        // Further filter by nutrition focus if specified
        const filteredRecipes = matchingRecipes.filter(recipe => {
            if (nutritionFocus === 'balanced') return true;
            if (nutritionFocus === 'high-protein') return recipe.protein >= 15;
            if (nutritionFocus === 'low-carb') return recipe.carbs <= 20;
            if (nutritionFocus === 'low-fat') return recipe.fats <= 10;
            if (nutritionFocus === 'keto') return recipe.carbs <= 10 && recipe.fats >= 15;
            if (nutritionFocus === 'vegetarian') return recipe.tags.includes('vegetarian');
            if (nutritionFocus === 'vegan') return recipe.tags.includes('vegan');
            return true;
        });
        
        displayResults(filteredRecipes);
    });
    
    function displayResults(recipes) {
        if (recipes.length === 0) {
            recipeResults.innerHTML = `
                <div class="no-results">
                    <p>No recipes found matching your ingredients and preferences.</p>
                </div>
            `;
            return;
        }
        
        recipeResults.innerHTML = '';
        
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            
            recipeCard.innerHTML = `
                <div class="recipe-image" style="background-image: url('${recipe.image}')"></div>
                <div class="recipe-info">
                    <h3>${recipe.name}</h3>
                    <div class="recipe-meta">
                        <span>${recipe.cookingTime} mins</span>
                        <span>${recipe.calories} cal</span>
                    </div>
                    <div class="nutrition-facts">
                        <span>Protein: ${recipe.protein}g</span>
                        <span>Carbs: ${recipe.carbs}g</span>
                        <span>Fats: ${recipe.fats}g</span>
                    </div>
                    <div class="recipe-tags">
                        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            recipeResults.appendChild(recipeCard);
        });
    }
});