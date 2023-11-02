
async function fetcheg(){
    const container = document.querySelector('.product-container');    
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    console.log(data.products)

    const prodArr=data.products;
    prodArr.map((ele)=>{
        const disprice = ele.price-(ele.price*ele.discountPercentage/100)
        
        function ratingToStars(rating, maxRating) {
            // Calculate the percentage
            const percentage = (rating / maxRating) * 100;
          
            // Calculate the number of full stars and a possible half star
            const fullStars = Math.floor(percentage / 20);
            const hasHalfStar = Math.floor((percentage % 20) / 10);
          
            // Create the star rating representation
            let starRating = '';
          
            for (let i = 0; i < fullStars; i++) {
              starRating += '★'; // Full star character
            }
          
            if (hasHalfStar === 1) {
              starRating += '½'; // Half star character
            }
          
            return starRating;
          }
          
          const rating = ele.rating;
          const maxRating = 5;
          const starRepresentation = ratingToStars(rating, maxRating);
        // //console.log(ele)
             container.innerHTML+= `
             <div class="product-card">
                   <div class="product-image">
                       <img src="${ele.images[0]}" height="200"
                           alt="Product Image">
                           <!-- <div class="add-to-cart">
                               <i class="fas fa-heart"></i>
                           </div> -->
                       <div class="hover-actions">
                           <span class="quick-view">Quick View</span>
                           
                       </div>
                   </div>
                   <div class="product-details">
                       <div class="brand-with-icon">
                           <p class="brand">${ele.brand}</p>
                           <div class="wishlist-icon">
                               <i class="fas fa-heart"></i>
                           </div>
                       </div>
                       <p class="title">${ele.title}</p>
                       <div class="ratings">
                           <!-- You can use icons or other rating representations here -->
                          ${starRepresentation}
                       </div>
                       <p class="disprice">$ ${disprice.toFixed(2)} <span class="price"> $ ${ele.price}</span></p>
                       <button class="btnb" onclick ="clickme(${ele.id})")>Show Product</button>
                   </div>
               </div>
             `
    

   

    })
    
    const searchbtn = document.getElementById("searchbtn");
    searchbtn.addEventListener('click', function(event){
        const search = document.getElementById("searchtext").value ;
        let found= false;
        container.innerHTML="";
       const filteredProducts = prodArr.filter(product => {
        if((search.toLowerCase() ===product.brand.toLowerCase())||(search.toLowerCase()===product.title.toLowerCase())||(search.toLowerCase()===product.category.toLowerCase()))
        {
        found=true;
         return search;
        }
        if(!found){
            
            container.innerHTML=' <h1 style="text-align: center">NO PRODUCT FOUND</h1>';
        }
       })

       filteredProducts.map((ele1)=>{
        const disprice = ele1.price-(ele1.price*ele1.discountPercentage/100)
        
        function ratingToStars(rating, maxRating) {
            // Calculate the percentage
            const percentage = (rating / maxRating) * 100;
          
            // Calculate the number of full stars and a possible half star
            const fullStars = Math.floor(percentage / 20);
            const hasHalfStar = Math.floor((percentage % 20) / 10);
          
            // Create the star rating representation
            let starRating = '';
          
            for (let i = 0; i < fullStars; i++) {
              starRating += '★'; // Full star character
            }
          
            if (hasHalfStar === 1) {
              starRating += '½'; // Half star character
            }
          
            return starRating;
          }
          
          const rating = ele1.rating;
          const maxRating = 5;
          const starRepresentation = ratingToStars(rating, maxRating);
        // //console.log(ele1)
             container.innerHTML+= `
             <div class="product-card">
                   <div class="product-image">
                       <img src="${ele1.images[0]}" height="200"
                           alt="Product Image">
                           <!-- <div class="add-to-cart">
                               <i class="fas fa-heart"></i>
                           </div> -->
                       <div class="hover-actions">
                           <span class="quick-view">Quick View</span>
                           
                       </div>
                   </div>
                   <div class="product-details">
                       <div class="brand-with-icon">
                           <p class="brand">${ele1.brand}</p>
                           <div class="wishlist-icon">
                               <i class="fas fa-heart"></i>
                           </div>
                       </div>
                       <p class="title">${ele1.title}</p>
                       <div class="ratings">
                           <!-- You can use icons or other rating representations here -->
                          ${starRepresentation}
                       </div>
                       <p class="disprice">$ ${disprice.toFixed(2)} <span class="price"> $ ${ele1.price}</span></p>
                       <button class="btnb" onclick ="clickme(${ele1.id})")>Show Product</button>
                   </div>
               </div>
             `
    

   

    }) 

    })
}
function clickme(id){
   const ids=id;
// Redirect to the second page with data as a query parameter
window.location.href = "productDetails.html?data=" + encodeURIComponent(ids);
}


fetcheg();