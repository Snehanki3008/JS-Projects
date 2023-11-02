const urlParams = new URLSearchParams(window.location.search);
// Get the value of the 'data' parameter
const id = urlParams.get('data');
//alert(decodeURIComponent(id)); // Outputs "Hello, World!"

async function fetchprdt(){
    const container = document.querySelector('.products');    
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
  //  alert(`https://dummyjson.com/products/${id}`)
    console.log(data.description)
    container.innerHTML =`
    <div class="product-containers">

            <img class="product-image1" src="${data.images[0]}" alt="Product Image">
            <div class="product-details">
                <div class="product-name">${data.title}</div>
                <div class="product-price">${data.price}</div>
                <div class="product-special-price">${data.price}</div>
                <div class="product-rating">Rating:${data.rating}</div>
                <div class="product-category">Category: ${data.category}</div>
                <div class="product-brand">Brand: ${data.brand}</div>
                <div class="product-description">${data.description}</div>
                <button class="add-to-cart-button">Add to Cart</button>
            </div>
            
        </div>
    
    
    `

    
}
fetchprdt();