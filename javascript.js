const bannerContent = document.querySelector('.banner-content');
const banner = document.querySelector('.banner');


const card = document.getElementsByClassName("card");
const btnAdd = document.getElementsByClassName("btn-info");
const btnCart = document.querySelector(".btn-cart");
const cartList = document.querySelector(".shopping-cart-list");


class Shopping{
    constructor(title,price,image){
        this.image = image;
        this.title = title;
        this.price = price;
    }
}

class UI{

    addToCart(shopping){
        const listItem = document.createElement("div");
        listItem.classList = "list-item";

        listItem.innerHTML = 
        `
        <div class="row align-items-center text-white-50">
            <div class="col-md-3">
                <img src="${shopping.image}" alt="product" class="img-fluid">
            </div>
            <div class="col-md-5">
                <div class="title">${shopping.title}</div>
            </div>
            <div class="col-md-2">
                <div class="price">${shopping.price}</div>
            </div>
            <div class="col-md-2">
                <button class="btn btn-delete">
                    <i class="fas fa-trash-alt text-danger"></i>
                </button>
            </div>
        </div>
        `
        cartList.appendChild(listItem);
    }

    removeCart(){
        let btnRemove = document.getElementsByClassName("btn-delete");
        let self = this;
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", function(){
                this.parentElement.parentElement.parentElement.remove();
                self.cartCount();
            })
            
        }
    }

    cartCount(){
        let cartListItem = cartList.getElementsByClassName("list-item");
        let itemCount = document.getElementById("item-count");
        itemCount.innerHTML = cartListItem.length;
    }

    cartToggle(){
        btnCart.addEventListener("click", function(){
            cartList.classList.toggle("d-none");
        })
    }
    
}


for (let i = 0; i < card.length; i++) {
    btnAdd[i].addEventListener("click", function(e){
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        let price = card[i].getElementsByClassName("price")[0].textContent;
        let image = card[i].getElementsByClassName("card-img-top")[0].src;
        btnAdd[i].classList.add("disabled");
        btnAdd[i].textContent = "In Card";
        let shopping = new Shopping(title,price,image);
        let ui = new UI();

        ui.addToCart(shopping);
        ui.removeCart()
        ui.cartCount();


        e.preventDefault();
    })
}

document.addEventListener("DOMContentLoaded", ()=> {
    let ui = new UI();

    ui.cartToggle();
})

class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []; 
    }

    
    addToCart(product) {
        this.cart.push(product);
        this.updateCart();
    }

    
    removeFromCart(productIndex) {
        this.cart.splice(productIndex, 1);
        this.updateCart();
    }

    
    updateQuantity(productIndex, newQuantity) {
        this.cart[productIndex].quantity = newQuantity;
        this.updateCart();
    }

    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    
    updateCart() {
        this.saveCart();
        this.displayCartItems();
        this.calculateTotal();
    }

    
    displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = ''; 
        this.cart.forEach((product, index) => {
            const item = document.createElement('div');
            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.innerHTML = `
                <div class="row w-100">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${product.image}" alt="product" class="img-fluid" style="max-width: 50px;">
                        <div class="ms-3">
                            <h5>${product.title}</h5>
                            <p class="mb-0">₺${product.price}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <input type="number" class="form-control" value="${product.quantity}" min="1" data-index="${index}" id="quantity-${index}">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger" data-index="${index}" id="remove-${index}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(item);

           
            document.getElementById(`remove-${index}`).addEventListener('click', () => this.removeFromCart(index));
            document.getElementById(`quantity-${index}`).addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    this.updateQuantity(index, newQuantity);
                }
            });
        });
    }

    
    calculateTotal() {
        let total = 0;
        this.cart.forEach((product) => {
            total += product.price * product.quantity;
        });
        document.getElementById('total-price').textContent = total.toFixed(2);
    }

    
    clearCart() {
        this.cart = [];
        this.updateCart();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const shoppingCart = new ShoppingCart();

    
    document.querySelectorAll('.btn-info').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            const price = parseFloat(card.querySelector('.price').textContent.replace('₺', '').replace(',', '.'));
            const image = card.querySelector('.card-img-top').src;

            
            shoppingCart.addToCart({
                title,
                price,
                image,
                quantity: 1,
            });
        });
    });

    
    shoppingCart.displayCartItems();

    
    document.getElementById('clear-cart').addEventListener('click', () => shoppingCart.clearCart());

    
    shoppingCart.calculateTotal();
});



const products = [
    { name: "IT-FRIDAY 9", link: "productIT-FRIDAY9.html" },
    { name: "TEKNOHAYAT-19", link: "productTEKNOHAYAT-19.html" },
    { name: "ModArt-X23.4", link: "productModArt-X23.4.html" },
    { name: "WEEKEND-5", link: "productWEEKEND-5.html" },
    { name: "ModArt-X22", link: "productModArt-X22.html" },
    { name: "ModArt-ARC 4", link: "productModArt-ARC4.html" },
    { name: "WEEKEND-4", link: "productWEEKEND-4.html" },
    { name: "IT-FRIDAY 5", link: "productIT-FRIDAY5.html" },
    { name: "ECOBOOST V6.1", link: "productECOBOOSTV6.1.html" },
    { name: "ModArt-X23.3", link: "productModArt-X23.3.html" },
    { name: "DRAGON-4060 V2", link: "productDRAGON-4060V2.html" },
    { name: "KUARK-VANE", link: "productKUARK-VANE.html" }
];


const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");


searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ""; 
    if (query) {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        if (filteredProducts.length > 0) {
            const resultList = document.createElement("ul");
            filteredProducts.forEach(product => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = product.link;
                link.textContent = product.name;
                listItem.appendChild(link);
                resultList.appendChild(listItem);
            });
            searchResults.appendChild(resultList);
            searchResults.style.display = "block"; 
        } else {
            searchResults.style.display = "none"; 
        }
    } else {
        searchResults.style.display = "none"; 
    }
});


document.addEventListener("click", (event) => {
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
        searchResults.style.display = "none";
    }
});


searchInput.addEventListener("focus", () => {
    const inputRect = searchInput.getBoundingClientRect();
    searchResults.style.width = `${inputRect.width}px`;
    searchResults.style.left = `${inputRect.left}px`; 
    searchResults.style.display = "block"; 
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-button");
    const products = document.querySelectorAll(".container .col-lg-4");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            
            products.forEach(product => {
                
                const productText = product.textContent.toLowerCase();

                if (filter === "all" || productText.includes(filter)) {
                    product.style.display = "block"; 
                } else {
                    product.style.display = "none"; 
                }
            });

            
            filterButtons.forEach(btn => btn.classList.remove("btn-primary"));
            button.classList.add("btn-primary");
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const wishlistButtons = document.querySelectorAll('.wishlist-button');
    const loadWishlist = () => JSON.parse(localStorage.getItem('wishlist')) || [];
    const saveWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));
    const updateButtonState = (button, isFavorited) => {
        button.textContent = isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist';
        button.classList.toggle('btn-danger', isFavorited);
        button.classList.toggle('btn-warning', !isFavorited);
    };

    wishlistButtons.forEach(button => {
        const product = {
            id: button.dataset.productId,
            name: button.dataset.productName,
            price: button.dataset.productPrice,
            img: button.dataset.productImg
        };

        
        const wishlist = loadWishlist();
        const isFavorited = wishlist.some(item => item.id === product.id);
        updateButtonState(button, isFavorited);

        button.addEventListener('click', () => {
            let wishlist = loadWishlist();
            const isFavorited = wishlist.some(item => item.id === product.id);

            if (isFavorited) {
                
                wishlist = wishlist.filter(item => item.id !== product.id);
                alert(`${product.name} has been removed from your wishlist.`);
            } else {
                
                wishlist.push(product);
                alert(`${product.name} has been added to your wishlist!`);
            }

            saveWishlist(wishlist);
            updateButtonState(button, !isFavorited);
        });
    });
});


