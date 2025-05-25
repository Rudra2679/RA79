document.addEventListener('DOMContentLoaded', function() {
    const recipeContainer = document.getElementById('recipe-container');
    const searchInput = document.getElementById('search-recipes');
    const categoryFilter = document.getElementById('category-filter');
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    // Display all recipes initially
    displayRecipes();
    
    // Filter recipes when button is clicked
    applyFiltersBtn.addEventListener('click', function() {
        displayRecipes();
    });
    
    // Function to display recipes based on filters
    function displayRecipes() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        
        const filteredRecipes = recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || 
                                recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            const matchesCategory = category === "" || recipe.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        renderRecipes(filteredRecipes);
    }
    
    // Function to render recipes to the page
    function renderRecipes(recipes) {
        if (recipes.length === 0) {
            recipeContainer.innerHTML = '<div class="no-results"><p>No recipes found matching your criteria.</p></div>';
            return;
        }
        
        recipeContainer.innerHTML = '';
        
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
                    <div class="recipe-tags">
                        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            recipeContainer.appendChild(recipeCard);
        });
    }
});