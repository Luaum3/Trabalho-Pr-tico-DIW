function createProductElement(product) {
    var productContainer = document.createElement("div");
    productContainer.className = "grid-item";
    var img = document.createElement("img");
    img.src = product.image;
    img.className = "product-image"
    var productDetails = document.createElement("div");
    var title = document.createElement("h4");
    var link = document.createElement("a");
    link.href = `detalhes.html?id=${product.id}`;
    link.textContent = product.title;
  
    
    var price = document.createElement("p");
    price.textContent = "R$" + product.price;
    var description = document.createElement("span");
    description.textContent = product.description;

    title.appendChild(link);
    productDetails.appendChild(title);
    productDetails.appendChild(price);
    productDetails.appendChild(description);
    productContainer.appendChild(img);
    productContainer.appendChild(productDetails);

    document.getElementById("products").appendChild(productContainer);
}

function categoryButton(category) {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "category-button";
  button.textContent = category;
  button.onclick = () => {
    var products = document.getElementById("products")
    products.innerHTML = "";
    if(category === "All") {
      fetchAllProducts();
    } else {
      filterByCategory(category);
    }
  }
  document.getElementById("category-buttons").appendChild(button);
}

function searchButton() {
  var button = document.createElement("button");
  button.className = "header-search-button"
  button.textContent = "Buscar"
  button.onclick = () => {
    var searchBar = document.getElementById("search-bar")
    searchProducts(searchBar.value)
  }
  document.getElementById("search-container").appendChild(button)
  var searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchProducts(searchBar.value);
    }
  });
}
searchButton()
fetchAllProducts();

fetch('https://fakestoreapi.com/products/categories')
  .then((res) => res.json())
  .then((data) => {
    categoryButton("All")
    data.forEach((category) => {
      categoryButton(category);
    });
  })

function fetchAllProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach((product) => {
            createProductElement(product);
        });
    })
}

function searchProducts(search) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      var products = document.getElementById("products")
      products.innerHTML = "";
      var filteredItems = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
         filteredItems.forEach((product) => {
             createProductElement(product);
         });
    })
}

function filterByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) =>res.json())
      .then((data) => {
        data.forEach((product) => {
            createProductElement(product);
        });
      })
}
