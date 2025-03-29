document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    const viewCartButton = document.getElementById("view-cart");
    const cartCount = document.getElementById("cart-count");
    const productContainer = document.getElementById("product-container");
    const ModalContent = document.querySelector(".modal-content");
    const closeModal = document.querySelector(".close");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartDiscount = document.getElementById("cart-discount");
    const finalPrice = document.getElementById("final-price");
    const checkoutButton = document.getElementById("checkout");
   
    // Fetch and display products from JSON server
    async function fetchProducts() {
        try {
            const response = await fetch("/api/products");
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    function displayProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.setAttribute("data-id", product.id);
            productElement.setAttribute("data-price", product.price);
            
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Ksh. ${product.price.toLocaleString()}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;
            
            productContainer.appendChild(productElement);
        });

        addCartEventListeners();
    }

    function addCartEventListeners() {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productElement = event.target.closest(".product");
                const id = parseInt(productElement.getAttribute("data-id"));
                const name = productElement.querySelector("h3").textContent;
                const price = parseFloat(productElement.getAttribute("data-price"));

                const existingItem = cart.find(item => item.id === id);
                if (!existingItem) {
                    cart.push({ id, name, price });
                }
                
                updateCart();
            });
        });
    }

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price;

            const li = document.createElement("li");
            li.textContent = `${item.name} - Ksh. ${item.price.toLocaleString()}`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-item");
            removeBtn.addEventListener("click", () => removeFromCart(item.id));

            li.appendChild(removeBtn);
            cartItems.appendChild(li);
        });

        let discount = calculateDiscount(cart.length, total);
        let discountedTotal = total - discount;

        cartTotal.textContent = total.toLocaleString();
        cartDiscount.textContent = discount.toLocaleString();
        finalPrice.textContent = discountedTotal.toLocaleString();
        cartCount.textContent = cart.length;
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function calculateDiscount(cartSize, totalPrice) {
        if (cartSize > 6 && totalPrice > 200000) {
            return totalPrice - (totalPrice * 0.05);
        }
        else if (totalPrice > 200000) {
            return totalPrice - (totalPrice * 0.02);
        } 
        else if (cartSize > 6) {
            return totalPrice - (totalPrice * 0.01);
        } 
        else {
        return totalPrice;}
    }
    viewCartButton.addEventListener("click", () => {
        ModalContent.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("We could not process your request. Your shopping cart is empty! Please select a product!");
            ModalContent.style.display = "none";
        }
        else {
            alert("Thank you for shopping with us! Stay tuned for great deals!");
            cart = [];
            updateCart();
            ModalContent.style.display = "none";
        }
    });

    document.getElementById("toggle-theme").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    
        // Save the user's preference to local storage
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
    });
    
    // Load the user's preference when the page loads
    document.addEventListener("DOMContentLoaded", () => {
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    });
    

    document.getElementById("search").addEventListener("input", (event) => {
        const searchText = event.target.value.toLowerCase();
        document.querySelectorAll(".product").forEach(product => {
            const name = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = name.includes(searchText) ? "block" : "none";
        });
    });

    fetchProducts();
});
