import products from "./dbProducts.js";
const cartContainer =  document.getElementById("cart-container")
const productsContainer = document.getElementById("products-container")
const dessertCards = document.getElementById("dessert-card-container")
const cartBtn = document.getElementById("cart-btn")
const clearCartBtn = document.getElementById("clear-cart-btn")
const totalNumberOfItems = document.getElementById("total-items")
const cartSubTotal = document.getElementById("subtotal")
const cartTaxes = document.getElementById("taxes")
const cartTotal = document.getElementById("total")
const showHideCartSpan = document.getElementById("show-hide-cart")
let isCartShowing = false



    products.forEach(({id,name,price,category}) => {
       dessertCards.innerHTML+=`
       <div class="dessert-card course-card">
            <img src="curso1.jpg" alt="Curso 1">
            <h2>${name}</h2>
            <p class="dessert-price">$ ${price}</p>
            <p class="product-category">Categoria: ${category}</p>
            <button id="${id}" class="btn add-to-cart-btn" >Add to cart</button>
        </div>
       <div >
       `
    });
    /*
            <p>Aprenda JS do básico ao avançado.</p>
            <span class="price">R$ 199,90</span>
    */

    class ShoppingCart{
       
        constructor(){
            this.items = [];
            this.total = 0;
            this.taxRate = 0.0825;
        }

        addItem(id,products){
            const product = products.find(item => item.id === id)
            const {name, price} = product;
            this.items.push(product);
            const totalCountPerProduct = {};
            this.items.forEach(dessert=>{
              totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
                
            })
            const currentProductCount = totalCountPerProduct[product.id];
            const currentProductCountSpan = document.getElementById(`product-count-for-id${product.id}`);
            currentProductCount > 1 
            ? currentProductCountSpan.textContent = `${currentProductCount}x` 
            : productsContainer.innerHTML += `
                    <div id="dessert${id}" class="product">
                        <p>
                        <span class="product-count" id="product-count-for-id${id}">
                            ${name}
                        </span>
                        </p>
                        <p>${price}</p>   
                    </div>
            `
        }

        calculateTotal(){
            const subTotal =  this.items.reduce((total,item)=>
                total + item.price,0)
            const tax = this.calculateTaxes(subTotal);
            this.total= tax + subTotal ;
            cartSubTotal.textContent = `$${subTotal.toFixed(2)}`
          }

        getCounts(){
            return this.items.length;
          }


        calculateTaxes(amount){
            return parseFloat(((this.taxRate/100)*amount).toFixed(2))
        }
    }

    const cart = new ShoppingCart();
    const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

    [...addToCartBtns].forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            products.add(event.target.id);
            cart.addItem(Number(event.target.id),products);
            totalNumberOfItems.textContent = cart.getCounts();
        })
    });

    cartBtn.addEventListener("click", () => {
        isCartShowing = !isCartShowing;
        showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
        cartContainer.style.display = isCartShowing ? "block" : "none";
    })
   

   



