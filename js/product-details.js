const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let product = null;

async function fetchProductDetails() {
    const loadingMessage = document.getElementById("loading");
    const productContainer = document.getElementById("product-detail-container");

    if (!loadingMessage || !productContainer) {
        console.error("Loading message or product container not found");
        return;
    }   

    loadingMessage.style.display = "block";

    try {
        if (!productId) {
            throw new Error("Product ID is missing in the URL");
        }

        const response = await fetch("https://v2.api.noroff.dev/rainy-days");

        if (!response.ok) {
            throw new Error("Failed to fetch product details"); 
        }

        const data = await response.json();
        const product = data.data.find (product => product.id === productId);

        if (product) {
            displayProductDetails(product);
        } else {
            productContainer.innerHTML = "<p>Product not found</p>";
        }

    } catch (error) {
        console.error("An error occurred while fetching product details", error);
        productContainer.innerHTML = "<p>Error loading product details. Please try again later.</p>";
    } finally {
        loadingMessage.style.display = "none";
    }
}

function displayProductDetails(product) {
    try {
        const container = document.getElementById("product-detail-container");

        if (!container) {
            console.error("Product detail container not found");
            return;
        }

        if (!product.title || !product.price) {
            console.error("Product is missing required data", product); 
            container.innerHTML = "<p>Product details are incomplete</p>";
            return;
        }

        let sizeOptions = "";
        if (product.sizes && Array.isArray(product.sizes)) {
            sizeOptions = product.sizes.map(size => {
                return `<button class="size-button" data-size="${size}">${size}</button>`;
            }).join("");
        } else {
           sizeOptions = `<p>No sizes available</p>`;
        }

        const isDiscounted = product.discountedPrice && product.discountedPrice < product.price;


        container.innerHTML = `
                <div class="image"> 
                    <img src="${product.image?.url || ''}" alt="${product.image?.alt || product.title}"> 
                </div>
                <div class="product">
                <h1 id="title">${product.title}</h1>
                <p id="price">${isDiscounted ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ""} 
                        <span class="current-price">$${(isDiscounted ? product.discountedPrice : product.price).toFixed(2)}</span></p>
                <p id="description">${product.description}</p>
                <label for ="size-buttons">Size:</label>
                    <div id="size-buttons">
                        ${sizeOptions}
                    </div>
                <div>
                <button id="add-to-cart" data-id="${product.id}">Add to cart</button>
                <button id="favorite-button" data-id="${product.id}"><i class="fa-solid fa-heart"></i></button>
                </div>
                </div>
            `;

        let selectedSize = null;

        const sizeButtons = document.querySelectorAll('.size-button');
        if (sizeButtons.length > 0) {
            sizeButtons.forEach(button => {
                button.addEventListener('click', function () {
                    sizeButtons.forEach(btn=>btn.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedSize = this.getAttribute("data-size");
                });
            });
        } 

        const addToCartButton = document.getElementById("add-to-cart");
        const favoriteButton = document.getElementById("favorite-button");

        if (addToCartButton) {
            addToCartButton.addEventListener('click', function () {
                addToCart(product, selectedSize);
            });
        } 

        if (favoriteButton) {
            favoriteButton.addEventListener('click', function () {
                toggleFavorite(product.id);
            });
        }

    } catch (error) {
        console.error("An error occurred while displaying product details", error);
        const container = document.getElementById("product-detail-container");
        if (container) {
            container.innerHTML = "<p>Error displaying product details. Please try again later.</p>";
        }
    }
}

function addToCart(product, selectedSize) {
    try {
        if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && !selectedSize) {
            alert("Please select a size");
            return;
        }

        if (!product.id || !product.title || !product.price) {
            console.error("Product is missing required data", product);
            alert("Product details are incomplete");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        } else {
            const cartItem = {...product, size: selectedSize, quantity: 1};
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        showCartPopup(`${product.title} added to cart`);
        updateCartCount();
    } catch (error) {
        console.error("An error occurred while adding to cart", error);
        alert("An error occurred while adding the item to the cart. Please try again.");
    }
}

//Pop up message when adding item to cart
function showCartPopup(message) {
    try {
        const popupMessage = document.getElementById("popup-message");
        const popup = document.getElementById("cart-popup");

        if (!popupMessage || !popup) {
            console.error("Popup message or popup container not found");
            alert(message);
            return;
        }

        popupMessage.textContent = message;
        popup.style.display = "flex";

        setTimeout(() => {
            popup.style.display = "none";
        }, 2000);
    } catch (error) {
        console.error("An error occurred while showing cart popup", error);
        alert (message);
    }
}

document.addEventListener("DOMContentLoaded", fetchProductDetails);
