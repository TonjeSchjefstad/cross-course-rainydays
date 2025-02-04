const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let product = null;

async function fetchProductDetails() {
    try{
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        const data = await response.json();
    
        const product = data.data.find (product => product.id === productId);

        if (product) {
        displayProductDetails(product);
        } else {
        document.getElementById("product-detail-container").innerHTML = "<p>Product not found</p>";
        }
    } catch (error) {
        console.error("An error occurred while fetching product details", error);
        document.getElementById("product-detail-container").innerHTML = "<p>An error occurred while fetching product details</p>";
    }
}

function displayProductDetails(product) {
  const container = document.getElementById("product-detail-container");

  let sizeOptions = product.sizes.map (size => {
    return `<option value="${size}">${size}</option>`;
    }).join("");
    
    //discount?
    const isDiscounted = product.discountedPrice && product.discountedPrice < product.price;


  container.innerHTML = `
        <div class="image"> <img src="${product.image.url}" alt="${product.image.alt}"> </div>
        <div class="product">
        <h1 id="title">${product.title}</h1>
        <p id="price">${isDiscounted ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ""} 
                <span class="current-price">$${(isDiscounted ? product.discountedPrice : product.price).toFixed(2)}</span></p>
        <p id="description">${product.description}</p>
        <label for ="size-select">Size:</label>
            <select id="size-select">
                <option value="select">Select Size</option> ${sizeOptions}
            </select>
        <div>
        <button id="add-to-cart" data-id="${product.id}">Add to cart</button>
        <button id="favorite-button" data-id="product-id"><i class="fa-solid fa-heart"></i></button>
        </div>
        </div>
    `;


    document.getElementById("add-to-cart").addEventListener("click", () => {
        addToCart(product);
    });

    document.getElementById("favorite-button").addEventListener("click", () => {
        toggleFavorites(product);
    });

}

//add to cart function
function addToCart(product) {
    const selectedSize = document.getElementById("size-select").value;

    if (selectedSize === "select") {
        alert("Please select a size");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = {...product, size: selectedSize};

    cart.push(cartItem);
    
    localStorage.setItem("cart", JSON.stringify(cart));

    showCartPopup(`${product.title} added to cart`);
    
    updateCartCount();
}


function showCartPopup(message) {
    const popupMessage = document.getElementById("popup-message");
    const popup = document.getElementById("cart-popup");

    popupMessage.textContent = message;

    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}


function toggleFavorite (product) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some(favorite => favorite.id === product.id);

    if (isFavorite) {
        favorites = favorites.filter(favorite => favorite.id !== product.id);
        alert(`${product.title} removed from favorites`);
    } else {
        favorites.push(product);
        alert(`${product.title} added to favorites`);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}


document.addEventListener("DOMContentLoaded", fetchProductDetails);
