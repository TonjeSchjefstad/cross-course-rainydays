
let allProducts = [];

//fetching products
async function fetchProducts () {
    try {
        const response = await fetch ("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) {
            throw new Error ('Network response was not ok ' + response.statusText)
        }
        
        const data = await response.json();
        console.log("API respons", data);

        return data.data || []; 
    }
    catch (error) {
        console.error("An error occurred while fetching products", error.message);
        alert ("An error occurred while fetching products");
        return [];
    }
}

//make the products appear on the page
function displayProducts (products) {
    const productList = document.getElementById("product-list");
    const loadingMessage = document.getElementById("loading");
    
    loadingMessage.style.display = "none";

    if (products.length === 0) {
        productList.innerHTML = "<p>No products available</p>";
        return;
    }

    productList.innerHTML = "";

    products.forEach (product => {
        const productElement = document.createElement("div");
        productElement.classList.add ("product");
        
        //discount?
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
        productList.appendChild(productElement);

    });
}

async function loadProducts () {
    const products = await fetchProducts();
    allProducts = products;
    displayProducts(products);
}

//Filtering 
document.getElementById("sort-options").addEventListener("change", applyFilters);
document.getElementById("size-filter").addEventListener("input", applyFilters);
document.getElementById("color-filter").addEventListener("input", applyFilters);
document.getElementById("sale-filter").addEventListener("input", applyFilters);
document.getElementById("gender-filter").addEventListener("input", applyFilters);
document.getElementById("clear-filters").addEventListener("click", clearFilters);

function applyFilters () {
    let filteredProducts = allProducts;

    console.log("before filtering, products length", filteredProducts.length);

    //size filter
    const sizeFilter = document.getElementById("size-filter").value;
    if (sizeFilter !== "all") {
        filteredProducts = filteredProducts.filter (product => {
            return product.sizes && product.sizes.map (size => size.toLowerCase()).includes(sizeFilter.toLowerCase());
        });     
    }

    //color filter
    const colorFilter = document.getElementById("color-filter").value;
    if (colorFilter !== "all") {
        filteredProducts = filteredProducts.filter(product => {
        return product.baseColor && product.baseColor.toLowerCase() === colorFilter.toLowerCase();
    });
    }

    //On sale filter
    const saleFilter = document.getElementById("sale-filter").value;
    if (saleFilter === "yes") {
        filteredProducts = filteredProducts.filter(product => product.onSale === true);
        console.log ("filtered by sale", filteredProducts.length);
    }
    else if (saleFilter === "no") {
        filteredProducts = filteredProducts.filter(product => product.onSale === false);
        console.log ("filtered by sale", filteredProducts.length);
    }

    //Gender Filter
    const genderFilter = document.getElementById("gender-filter").value;
    if (genderFilter !== "all") {
        filteredProducts = filteredProducts.filter(product => {
            return product.gender && product.gender.toLowerCase() === genderFilter.toLowerCase();
        });
        console.log("filtered by gender", filteredProducts.length);
    }

    //Sorting 
    const sortOption = document.getElementById("sort-options").value;
    if (sortOption === "favorite") {
        filteredProducts = filteredProducts.filter(product => product.favorite === true);
        console.log("filtered by favorite", filteredProducts.length);
    }
    else if (sortOption === "price-low") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        console.log("sorted by price from low to high", filteredProducts.length);
    }
    else if (sortOption === "price-high") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        console.log("sorted by price from high to low", filteredProducts.length);
    }

    //Counting products
    const productCount = document.getElementById("product-count");
    productCount.textContent = filteredProducts.length;

    displayProducts(filteredProducts);
    console.log("after filtering, products length", filteredProducts.length);
}
// Clear filters button 
function clearFilters () {
    document.getElementById("size-filter").value = "all";
    document.getElementById("color-filter").value = "all";
    document.getElementById("sale-filter").value = "all";
    document.getElementById("gender-filter").value = "all";

    applyFilters();
}

loadProducts();

