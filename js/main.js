document.addEventListener('DOMContentLoaded', () => {
    
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const productId = params.get('id');
    const style = document.createElement('style');
    style.textContent = `

    .product-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; /* Allows items to wrap to the next line */
   
}
    a {
    text-decoration: none; 
    color: inherit; 
    cursor: pointer; 
    font-family: inherit; 
    font-size: inherit; 
    border:none;
}

.product-item {
    display: flex;
    flex-direction: column;
    // align-items: center;
    padding: 20px;
    border-radius: 10px;
    margin: 5px;
    width: 200px;
    
}
.product-item:hover {
    transform: translateY(-5px);
}

.product-item img {
    width: 100%;
    border-radius: 10px;
}

.product-item h3, .product-item .price {
    margin: 5px 0; 
   
}

.product-title-price {
    display: flex;
    justify-content: space-between;
    width: 100%; /* Ensure the container takes full width */
    margin-bottom: 10px; 
}

.product-item h3 {
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    padding:10px 0;
}

.product-item .price {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #333;
}

.product-item p {
    font-size: 14px;
    text-align: center;
    color: #666;
}

// product detail 
.product-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-images {
    display: flex;
    flex-direction: row;
}

.thumbnail-container {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.thumbnail {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    cursor: pointer;
}

.main-image img {
    width: 300px;
    height: auto;
}

.product-info {
    text-align: center;
}

.size-selection, .quantity-selection {
    margin: 20px 0;
}

button {
    margin: 5px;
}

        }
    `;
    document.head.appendChild(style);

    if (category) {
        displayProducts(category);
    }

    if (productId) {
        displayProductDetails(productId);
    }
});

function displayProducts(category) {
    const productList = document.getElementById('product-list');
    const products = data.products[0][category];
    const productCategory = document.getElementById('product-category');
    
    productList.innerHTML = ''; // Clear any existing content

   


    products.forEach(product => {
        // Create the anchor tag
        const productLink = document.createElement('a');
        productLink.href = `productDetail.html?id=${product.id}`; // Link to the productDetail.html page with product ID
    
        // Create the product item container
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
    
        // Create product image
        const productImage = document.createElement('img');
        productImage.src = product.thumbnail;
        productImage.alt = product.title;
    
        // Create product title
        const productTitle = document.createElement('h3');
        productTitle.innerHTML = `New!<br>${product.title}`;
    
        // Create product description
        const productDescription = document.createElement('p');
        // productDescription.textContent = product.description;
    
        // Create product price
        const productPrice = document.createElement('p');
        productPrice.className = 'price';
        productPrice.innerHTML = `Rs. <br> ₹${product.price}`;
    
        // Create container for title and price
        const titlePriceContainer = document.createElement('div');
        titlePriceContainer.className = 'product-title-price';
        titlePriceContainer.appendChild(productTitle);
        titlePriceContainer.appendChild(productPrice);
    
        // Append all elements to the product item container
        productItem.appendChild(productImage);
        productItem.appendChild(titlePriceContainer);
        productItem.appendChild(productDescription);
    
        // Append the product item to the anchor tag
        productLink.appendChild(productItem);
    
        // Append the anchor tag to the product list
        productList.appendChild(productLink);
    });
    
    
}

function displayProductDetails(productId) {
    const productDetails = document.getElementById('product-detail');
    let product;

    // Find the product by ID
    for (const category in data.products[0]) {
        product = data.products[0][category].find(p => p.id == productId);
        if (product) break;
    }

    if (product) {
        // Set up the initial HTML structure
        productDetails.innerHTML = `
            <div class="product-detail-container">
                <div class="product-images">
                    <div class="thumbnail-container">
                        ${product.images.map(image => `<img src="${image}" alt="${product.title}" class="thumbnail">`).join('')}
                    </div>
                    <div class="main-image">
                        <img src="${product.images[0]}" alt="${product.title}" id="main-product-image">
                    </div>
                </div>
                <div class="product-info">
                    <button id="layers-btn" class="layers-btn"> LAYERS</button>
                    <h2>${product.title}</h2>
                    
                    <div class="size-selection">
                        
                        <div class="sizes">
                            <span data-size="S">S</span>
                            <span data-size="M">M</span>
                            <span data-size="L">L</span>
                            <span data-size="XL">XL</span>
                            <span data-size="2XL">2XL</span>
                        </div>
                    </div>
                    <div class="quantity-selection">
                        
                        <button id="decrease-quantity">-</button>
                        <input type="text" id="quantity-input" value="0" readonly>
                        <button id="increase-quantity">+</button>
                    </div>
                    <button id="sold-out-btn" class="sold-out" disabled>SOLD OUT</button>
                    <p>${product.description}</p>
                    <p>100% cotton unisex sizing. Printing printed with puff ink on <br> a comfort color tee.</p>
                    <button id="contact-btn" class="contact-btn" style="display: none;">Contact Us</button>
                </div>
            </div>
            <div id="contact-form" class="contact-form" style="display: none;">
                <h4>Contact Us</h4>
                <input type="text" id="first-name" placeholder="First Name" required>
                <input type="text" id="last-name" placeholder="Last Name" required>
                <input type="email" id="email-address" placeholder="Email Address" required>
                <input type="tel" id="phone-number" placeholder="Phone Number" required>
                <input type="text" id="address" placeholder="Address" required>
                <button id="submit-btn">Submit</button>
            </div>
        `;

        // Add event listeners to the thumbnails for hover and click events
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('mouseover', () => {
                mainImage.src = thumbnail.src;
                thumbnails.forEach(t => t.style.border = 'none');
                thumbnail.style.border = '1px solid black';
            });

            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src;
                thumbnails.forEach(t => t.style.border = 'none');
                thumbnail.style.border = '1px solid black';
            });
        });

        // Size selection
        const sizes = document.querySelectorAll('.size-selection .sizes span');
        sizes.forEach(size => {
            size.addEventListener('click', () => {
                sizes.forEach(s => s.classList.remove('selected'));
                size.classList.add('selected');
            });
        });

        // Quantity control
        const quantityInput = document.getElementById('quantity-input');
        const decreaseButton = document.getElementById('decrease-quantity');
        const increaseButton = document.getElementById('increase-quantity');
        const contactBtn = document.getElementById('contact-btn');

        decreaseButton.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                quantityInput.value = quantity - 1;
                if (quantity - 1 === 0) {
                    contactBtn.style.display = 'none';
                    document.getElementById('contact-form').style.display = 'none';
                }
            }
        });

        increaseButton.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
            contactBtn.style.display = 'inline-block';
        });

        // Contact form display
        contactBtn.addEventListener('click', () => {
            if (parseInt(quantityInput.value) >= 1) {
                document.getElementById('contact-form').style.display = 'block';
            } else {
                document.getElementById('contact-form').style.display = 'none';
                // document.getElementById('').style.display = 'none'
            }
        });
    } else {
        productDetails.innerHTML = '<p>Product not found</p>';
    }
}

// Example usage: Call this function with the product ID when the page loads or when a product is selected
displayProductDetails(1);
