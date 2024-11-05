const apiKey = '36a1aadb2bf541459b18a5358067cc83'; // Replace with your actual Spoonacular API key
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=`;

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('search').value;
    if (query) {
        fetchRecipes(query);
    } else {
        document.getElementById('recipes').innerHTML = '<p>Please enter a search term.</p>';
    }
});

document.getElementById('goBackButton').addEventListener('click', () => {
    // Hide the recipes and "Go Back" button, and show the search input and button again
    document.getElementById('recipes').innerHTML = '';
    document.getElementById('goBackButton').classList.add('hidden');
    document.getElementById('search').style.display = 'block';
    document.getElementById('searchButton').style.display = 'inline-block';
});

async function fetchRecipes(query) {
    try {
        const response = await fetch(apiUrl + encodeURIComponent(query));
        const data = await response.json();

        if (response.ok) {
            displayRecipes(data.results);
        } else {
            console.log('Error:', data.message);
            document.getElementById('recipes').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        document.getElementById('recipes').innerHTML = '<p>There was an error fetching the recipes. Please try again later.</p>';
    }
}

function displayRecipes(recipes) {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '';

    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';

            const formattedTitle = recipe.title.toLowerCase().replace(/ /g, '-');

            recipeCard.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p><a href="https://spoonacular.com/recipes/${formattedTitle}-${recipe.id}" target="_blank">View Recipe</a></p>
            `;

            recipesDiv.appendChild(recipeCard);
        });

        // Hide the search bar and show the "Go Back" button
        document.getElementById('search').style.display = 'none';
        document.getElementById('searchButton').style.display = 'none';
        document.getElementById('goBackButton').classList.remove('hidden');
    } else {
        recipesDiv.innerHTML = '<p>No recipes found. Please try another search term.</p>';
    }
}
