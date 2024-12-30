document.addEventListener('DOMContentLoaded', () => {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const loadWishlist = () => JSON.parse(localStorage.getItem('wishlist')) || [];
    const saveWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));
    const renderWishlist = () => {
        const wishlist = loadWishlist();
        wishlistItemsContainer.innerHTML = '';

        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p>Your wishlist is empty!</p>';
        } else {
            wishlist.forEach(product => {
                const productCard = `
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="card">
                            <img src="${product.img}" alt="${product.name}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.price}</p>
                                <button class="btn btn-danger remove-wishlist-button" data-product-id="${product.id}">
                                    Remove from Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                wishlistItemsContainer.innerHTML += productCard;
            });

            document.querySelectorAll('.remove-wishlist-button').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.productId;
                    const wishlist = loadWishlist().filter(item => item.id !== productId);
                    saveWishlist(wishlist);
                    renderWishlist();
                });
            });
        }
    };

    renderWishlist();
});
