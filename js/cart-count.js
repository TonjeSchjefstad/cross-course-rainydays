function updateCartCount () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        const totalItems = cart.reduce((total, item) => {
            return total + (item.quantity || 1);
        }, 0);

        cartCount.textContent = totalItems;
    }

    const cartIcon = document.querySelector(".fa-cart-shopping");
    if (cart.length > 0) {
        cartIcon.classList.add("filled-cart");
    } else {
        cartIcon.classList.remove("filled-cart");
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);