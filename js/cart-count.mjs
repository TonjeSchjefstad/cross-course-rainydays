export function updateCartCount () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    const cartIcon = document.querySelector(".fa-cart-shopping");
    if (cart.length > 0) {
        cartIcon.classList.add("filled-cart");
    } else {
        cartIcon.classList.remove("filled-cart");
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);