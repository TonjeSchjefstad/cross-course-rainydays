document.addEventListener("DOMContentLoaded", function () {
    localStorage.removeItem("cart");

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
});