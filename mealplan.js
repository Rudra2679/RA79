document.addEventListener('DOMContentLoaded', function() {
    const generatePlanBtn = document.getElementById('generate-plan');
    const mealPlanResults = document.getElementById('meal-plan-results');
    const planActions = document.getElementById('plan-actions');
    const shoppingListContainer = document.getElementById('shopping-list-container');
    const shoppingList = document.getElementById('shopping-list');
    
    generatePlanBtn.addEventListener('click', function() {
        const duration = parseInt(document.getElementById('plan-duration').value);
        const budget = document.getElementById('budget-preference').value;
        
        // Get user profile for personalized recommendations
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const allRecipes = JSON.parse(localStorage.getItem('recipes'));
        
        // Filter recipes based on user preferences
        let filteredRecipes = [...allRecipes];
        
        if (userProfile.diet === 'vegetarian') {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.tags.includes('vegetarian'));
        } else if (userProfile.diet === 'vegan') {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.tags.includes('vegan'));
        }
        
        if (userProfile.allergies && userProfile.allergies.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                return !userProfile.allergies.some(allergy => 
                    recipe.ingredients.some(ing => ing.toLowerCase().includes(allergy.toLowerCase()))
                );
            });
        }
        
        // Generate meal plan
        const mealPlan = generateMealPlan(duration, filteredRecipes);
        const ingredientsList = generateShoppingList(mealPlan);
        
        displayMealPlan(mealPlan);
        displayShoppingList(ingredientsList);
        
        planActions.style.display = 'block';
        shoppingListContainer.style.display = 'block';
    });
    
    function generateMealPlan(days, recipes) {
        const mealPlan = [];
        const mealTypes = ['breakfast', 'lunch', 'dinner'];
        
        for (let i = 0; i < days; i++) {
            const day = {
                dayNumber: i + 1,
                meals: {}
            };
            
            mealTypes.forEach(type => {
                const availableRecipes = recipes.filter(recipe => recipe.category === type);
                if (availableRecipes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableRecipes.length);
                    day.meals[type] = availableRecipes[randomIndex];
                }
            });
            
            mealPlan.push(day);
        }
        
        return mealPlan;
    }
    
    function generateShoppingList(mealPlan) {
        const ingredients = new Set();
        
        mealPlan.forEach(day => {
            Object.values(day.meals).forEach(meal => {
                meal.ingredients.forEach(ing => {
                    ingredients.add(ing);
                });
            });
        });
        
        return Array.from(ingredients);
    }
    
    function displayMealPlan(mealPlan) {
        mealPlanResults.innerHTML = '';
        
        mealPlan.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day-plan';
            
            let mealsHTML = '';
            Object.entries(day.meals).forEach(([type, meal]) => {
                mealsHTML += `
                    <div class="meal">
                        <h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                        <p><strong>${meal.name}</strong> - ${meal.calories} cal</p>
                        <p>${meal.ingredients.slice(0, 3).join(', ')}...</p>
                    </div>
                `;
            });
            
            dayElement.innerHTML = `
                <h3>Day ${day.dayNumber}</h3>
                ${mealsHTML}
            `;
            
            mealPlanResults.appendChild(dayElement);
        });
    }
    
    function displayShoppingList(ingredients) {
        shoppingList.innerHTML = '';
        
        ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            shoppingList.appendChild(li);
        });
    }
    
    // Print and Download buttons (basic implementation)
    document.getElementById('print-plan').addEventListener('click', function() {
        window.print();
    });
    
    document.getElementById('download-plan').addEventListener('click', function() {
        alert('In a real app, this would generate a PDF of your meal plan');
    });
    
    document.getElementById('save-plan').addEventListener('click', function() {
        alert('Meal plan saved to your profile!');
    });
});