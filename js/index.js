
const bestsellerSection = document.getElementById('bestseller-list');

async function fetchBestsellers() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        const data = await response.json();

        const bestsellers = data.data.filter(product => product.favorite);
        
        displayBestsellers(bestsellers);
    } catch (error) {
        console.error("An error occurred while fetching bestsellers", error);
    }
}

function displayBestsellers(products) {
    bestsellerSection.innerHTML = "";

    if (products.length === 0) {
        bestsellerSection.innerHTML = "<p>No bestsellers found</p>";
        return
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const isDiscounted = product.discountedPrice && product.discountedPrice < product.price;

        productElement.innerHTML = `
        <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            <p>
                ${isDiscounted ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ""} 
                <span class="current-price">$${(isDiscounted ? product.discountedPrice : product.price).toFixed(2)}</span>
            </p>
            <a href="product-details.html?id=${product.id}" class="view-product-button">View product</a>
        `;
        bestsellerSection.appendChild(productElement);
    });
}

fetchBestsellers();