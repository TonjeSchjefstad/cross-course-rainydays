function displayCheckout () {
    try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const checkoutContainer = document.getElementById("checkout-container")

        if (!checkoutContainer) {
            console.error("Checkout container not found");
            return;
        }

        if (cart.length === 0) {
            checkoutContainer.innerHTML = "<p> Your cart is empty. Please add items to your cart before proceeding.</p>";
            return;
        }

        let cartHTML = "";
        let totalPrice = 0;

        cart.forEach ((item) => {
            if (!item.title || !item.price) {
                console.error("Item missing title or price", item);
                return;
            }
            
            const quantity = item.quantity || 1;
            const itemTotal = item.price * quantity;
            totalPrice += itemTotal; 

            cartHTML += `
                <div class="checkout-item">
                    <div class="checkout-item-img-wrapper">
                        <img src="${item.image?.url || '' }" alt="${item.image?.alt || item.title}">
                    </div>
                    <div class="checkout-item-details">
                        <h3>${item.title}</h3>
                        <div class="checkout-item-size-price">
                            <p class="size">Size: ${item.size || 'N/A'}</p>
                            <p class="quantity">Quantity: ${quantity}</p>
                            <p class="price">$${item.price.toFixed(2)}</p>
                            <p class="subtotal"><strong>Subtotal: $${itemTotal.toFixed(2)}</strong></p>
                        </div>
                    </div>
                </div>
            `;
        }) ;
        
        cartHTML +=`
            <div class="checkout-summary">
                <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
            </div>
        `;

        checkoutContainer.innerHTML = cartHTML;
    } catch (error) {
        console.error("Error displaying checkout:", error);
    } 
}  

document.addEventListener("DOMContentLoaded", displayCheckout)

document.addEventListener("DOMContentLoaded", function () {

    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const closeTerms = document.querySelector('.close-terms');
    const closePrivacy = document.querySelector('.close-privacy');
    const acceptTermsCheckboxes = document.getElementById('accept-terms');
    const submitButton = document.querySelector('button[type="submit"]');

    if (termsLink && termsModal)  {
        termsLink.onclick = function (event) {
            event.preventDefault();
            termsModal.style.display = 'block'; 
        }
    }

    if (privacyLink && privacyModal) {
        privacyLink.onclick = function (event) {
            event.preventDefault();
            privacyModal.style.display = 'block';
        }
    }

    if (closeTerms && termsModal)   {
        closeTerms.onclick = function () {
            termsModal.style.display = 'none';
        }
    }

    if (closePrivacy && privacyModal) {
        closePrivacy.onclick = function () {
            privacyModal.style.display = 'none';
        }
    }

    window.onclick = function (event) {
        if (termsModal && event.target == termsModal) {
            termsModal.style.display = 'none';
        }
        if (privacyModal && event.target == privacyModal) {
            privacyModal.style.display = 'none';
        }
    }       

    if (acceptTermsCheckboxes && submitButton) {
        acceptTermsCheckboxes.addEventListener('change', function () {
            submitButton.disabled = !acceptTermsCheckboxes.checked;
        });
    } 
});

const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "confirmation.html";
    });
} else {
    console.error("Checkout form not found");
}
