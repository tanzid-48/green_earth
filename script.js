const loadCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => {

            displayCategories(data.categories)
        });
}

const loadingSpinner = document.getElementById('loading-spinner')
const treeDetailsModal = document.getElementById('tree_details');
let totalPrice = document.getElementById('total-price');
const loadTrees = () => {

    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex")
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadingSpinner.classList.remove("flex");
            loadingSpinner.classList.add("hidden");
            displayTrees(data.plants);
        })

}

const openTreeModel = (treeId) => {
    console.log(treeId, "treeId");
    const url = `https://openapi.programming-hero.com/api/plant/${treeId}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
       displayTreeDetails(data.plants)
        
        treeDetailsModal.showModal();

    })  
}

const displayTreeDetails = (tree) => {
    document.getElementById('modalTitle').innerText = tree.name;
    document.getElementById('modalImage').src = tree.image;
    document.getElementById('modalCategory').innerText = tree.category;
    document.getElementById('modalDescription').innerText = tree.description;
    document.getElementById('modalPrice').innerText = tree.price;
}




     

const displayTrees = (trees) => {
    const treesContainer = document.getElementById('trees-container')
    treesContainer.innerHTML = "";

    trees.forEach(tree => {

        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm";
        card.innerHTML = `
         <figure>
        <img src="${tree.image}" alt="${tree.name}" class="w-full h-40 object-cover rounded-t-2xl" />
    </figure>
    <div class="card-body p-4">
        <h2 class="card-title text-base cursor-pointer hover:text-green-400 transition-colors" onclick="openTreeModel(${tree.id})">${tree.name}</h2>
        <p class="text-sm text-gray-500 line-clamp-2">${tree.description}</p>
        <div class="flex justify-between items-center mt-2">
            <span class="text-xs border border-green-400 text-green-500 rounded-full px-2 py-1">${tree.category}</span>
            <h2 class="font-bold text-[#4ade80]">$${tree.price}</h2>
        </div>
        <button class="btn btn-success w-full rounded-full mt-2" onclick="addToCard(${tree.id},'${tree.name}',${tree.price})">Add to Cart</button>
    </div>
    
`;
        treesContainer.append(card)
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

        const btn = div.querySelector("button");
        btn.onclick = () => selectCategory(category.id, btn);

        categoriesContainer.append(div);

    });
}

const selectCategory = (categoryID, btn) => {

    const allButtons = document.querySelectorAll("#categories-container button, #all-trees-btn");
    console.log(allButtons);
    allButtons.forEach(b => {
        b.classList.remove("btn-primary1");
        b.classList.add("btn-outline")
    });

    btn.classList.add("btn-primary1")
    btn.classList.remove("btn-outline")


    const url = (`https://openapi.programming-hero.com/api/category/${categoryID}`);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayTrees(data.plants);
        })

}
//    all button work
const allTreesBtn = document.getElementById('all-trees-btn');
allTreesBtn.addEventListener('click', () => {

    const allButtons = document.querySelectorAll("#categories-container button, #all-trees-btn");
    console.log(allButtons);
    allButtons.forEach(b => {
        b.classList.remove("btn-primary1");
        b.classList.add("btn-outline")
    });

    allTreesBtn.classList.add("btn-primary1")
    allTreesBtn.classList.remove("btn-outline")

    loadTrees();

});

  let cart = [];

 const addToCard = (id,name,price)=>{

    const existingItem = cart.find((item) => item.id ===id);
    if(existingItem){
        existingItem.quantity +=1
    }else {
        cart.push({
        id,
        name,
        price,
        quantity:1
        });

    }
    updateCard()
 }
 const cardContainer = document.getElementById('card-container')
 let updateCard = () =>{
     cardContainer.innerHTML = "";
     let total =0 ;
     cart.forEach(item =>{
       total +=item.price *item.quantity;
        const cartItem = document.createElement("div")
        cartItem.className = "card card-body bg-slate-100"
        cartItem.innerHTML = `

           <div class="flex justify-between items-center">
                <div>
                    <h2>${item.name}</h2>
                    <p>$${item.price} X ${item.quantity}</p>
                </div>
               <button class="btn btn-ghost" onclick="removeFromCart('${item.id}')">X</button>
            </div>
            <p class="text-right font-semibold text-xl">$${item.price * item.quantity}</p>
        
        
        `;
        cardContainer.append(cartItem);

     });
     totalPrice.innerText = total;

 }
 let removeFromCart =(treeId)=>{
    const updateCartElement = cart.filter((item) => item.id != treeId);
    cart =updateCartElement;
    updateCard()

 }

loadCategories();
loadTrees();
