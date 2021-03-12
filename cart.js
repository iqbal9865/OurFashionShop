let carts = document.querySelectorAll('.add-cart');
let product = [
    {
        name: "Supply 360",
        price: 120,
        inCart: 0
    },
    {
        name: "Nike 480",
        price: 150,
        inCart: 0
    },
    {
        name: "Adidas A14",
        price: 140,
        inCart: 0
    },
    {
        name: "Parx Shirts",
        price: 100,
        inCart: 0
    },
    {
        name: "Peter England Shirts",
        price: 110,
        inCart: 0
    },
    {
        name: "Perx Shirt",
        price: 115,
        inCart: 0  
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', ()=>{
        cartNumbers(product[i]);
        totalCost(product[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)
    
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent= productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1
    }
    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    if(cartItems!=null){
        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]:product
            }
        }
        cartItems[product.name].inCart += 1; 
    }
    else{
        product.inCart = 1;
        cartItems = {
        [product.name] : product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems))
}

function totalCost(product){

    let cartCost = localStorage.getItem("totalCost")
    if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    }
    else{
        localStorage.setItem("totalCost", product.price)
    }    
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem("totalCost")
    if(cartItems && productContainer){
        // console.log('running')
        productContainer.innerHTML = '';
        Object.values(cartItems).map( item => {
            productContainer.innerHTML += `
                <div class="product">
                
                    <ion-icon name="close-circle-outline"></ion-icon>
                    <img src="./homeImage/${item.name}.jpg">
                    <span>${item.name}</span>
                
                    <div class="price">
                        $${item.price},00
                    </div>
                    <div class="quantity">
                        <ion-icon name="add-outline"></ion-icon>
                        <span>${item.inCart}</span>
                        <ion-icon name="remove-outline"></ion-icon>
                    </div>
                        $${item.inCart * item.price},00
                    <div class='total'></div>   
                </div>
            `
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h5 class="basketTotalTitle">Total Amount</h5>
                <h5 class="basketTotal">$${cartCost},00</h5>
            </div>
        `
    }
}
onLoadCartNumbers()
displayCart()