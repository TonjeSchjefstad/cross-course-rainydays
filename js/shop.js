
let allProducts = [];

async function fetchProducts () {
    try {
        const response = await fetch ("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) {
            throw new Error ('Network response was not ok ' + response.statusText)
        }
        
        const data = await response.json();

        return data.data || []; 
    }
    catch (error) {
        console.error("An error occurred while fetching products", error.message);
        alert ("An error occurred while fetching products");
        return [];
    }
}

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
        if (!product.id || !product.title) {
            return;
        }

        const productElement = document.createElement("div");
        productElement.classList.add ("product");
        
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
        productList.appendChild(productElement);

    });
}

async function loadProducts () {
    const loadingMessage = document.getElementById("loading");

    try {
        const products = await fetchProducts();
        allProducts = products;
        displayProducts(products);
    } catch (error) {
        console.error("An error occurred while loading products", error.message);
        alert("An error occurred while loading products");
    } finally {
        loadingMessage.style.display = "none";
    }
}

document.getElementById("sort-filter").addEventListener("change", applyFilters);
document.getElementById("size-filter").addEventListener("change", applyFilters);
document.getElementById("color-filter").addEventListener("change", applyFilters);
document.getElementById("sale-filter").addEventListener("change", applyFilters);
document.getElementById("gender-filter").addEventListener("change", applyFilters);
document.getElementById("clear-filters").addEventListener("click", clearFilters);

function applyFilters () {
    try {
        let filteredProducts = allProducts;

        const sizeFilter = document.getElementById("size-filter").value;
        if (sizeFilter !== "all") {
            filteredProducts = filteredProducts.filter (product => {
                return product.sizes && product.sizes.map (size => size.toLowerCase()).includes(sizeFilter.toLowerCase());
            });     
        }

        const colorFilter = document.getElementById("color-filter").value;
        if (colorFilter !== "all") {
            filteredProducts = filteredProducts.filter(product => {
            return product.baseColor && product.baseColor.toLowerCase() === colorFilter.toLowerCase();
        });
        }

        const saleFilter = document.getElementById("sale-filter").value;
        if (saleFilter === "yes") {
            filteredProducts = filteredProducts.filter(product => product.onSale === true);
        }
        else if (saleFilter === "no") {
            filteredProducts = filteredProducts.filter(product => product.onSale === false);
        }

        const genderFilter = document.getElementById("gender-filter").value;
        if (genderFilter !== "all") {
            filteredProducts = filteredProducts.filter(product => {
                return product.gender && product.gender.toLowerCase() === genderFilter.toLowerCase();
            });
        }

        const sortOption = document.getElementById("sort-filter").value;
        if (sortOption === "favorite") {
            filteredProducts = filteredProducts.filter(product => product.favorite === true);
        }
        else if (sortOption === "price-low") {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        }
        else if (sortOption === "price-high") {
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }

        const productCount = document.getElementById("product-count");
        if (productCount) {
            productCount.textContent = filteredProducts.length;
        }

        displayProducts(filteredProducts);

    } catch (error) {
        console.error("An error occurred while applying filters", error);
        alert("An error occurred while applying filters");
    }
}

function clearFilters () {
    try {
        document.getElementById("size-filter").value = "all";
        document.getElementById("color-filter").value = "all";
        document.getElementById("sale-filter").value = "all";
        document.getElementById("gender-filter").value = "all";

        applyFilters();
    } catch (error) {
        console.error("An error occurred while clearing filters", error);
        alert("An error occurred while clearing filters");
    }
}

loadProducts();