const loadCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => {

            displayCategories(data.categories)
        });
}
const displayCategories = (categories) => {

    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = "";


    categories.forEach(category => {

        const div = document.createElement("div")
        div.innerHTML = `
            <button class = "btn btn-outline w-full">${category.category_name}</button>
            `;

        categoriesContainer.append(div);

    });
}

loadCategories();
