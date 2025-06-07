const bestsellerSection = document.getElementById('bestseller-list');
const loadingMessage = document.getElementById("loading");

async function fetchBestsellers() {
    loadingMessage.style.display = "block";

    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) {
            throw new Error("Failed to fetch bestsellers");
        }

        const data = await response.json();
        const bestsellers = data.data.filter(product => product.favorite);
        
        displayBestsellers(bestsellers);

    } catch (error) {
        console.error("An error occurred while fetching bestsellers", error);
    } finally {
        loadingMessage.style.display = "none";
    }
}

function showErrorMessage() {
    bestsellerSection.innerHTML = `
    <div class="error-message">
        <p>Failed to load bestsellers</p>
        <p>Please try again later.</p>
    </div>
    `;
}

function displayBestsellers(products) {
    bestsellerSection.innerHTML = "";
    if (products.length === 0) {
        bestsellerSection.innerHTML = "<p>No bestsellers found</p>";
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const isDiscounted = product.discountedPrice && product.discountedPrice < product.price;

        const productLink = document.createElement("a");
        productLink.href = `product-details.html?id=${product.id}`;
        productLink.classList.add ("product-link");

        productLink.innerHTML = `
        <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            <p>
                ${isDiscounted ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ""} 
                <span class="current-price">$${(isDiscounted ? product.discountedPrice : product.price).toFixed(2)}</span>
            </p>
        `;
        productElement.appendChild(productLink);
        bestsellerSection.appendChild(productElement);
    });
}

fetchBestsellers();