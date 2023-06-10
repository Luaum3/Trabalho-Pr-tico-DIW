function createProductElement(product) {
    var productContainer = document.createElement("div");
    productContainer.className = "grid-item";
    var img = document.createElement("img");
    img.src = product.image;
    img.className = "product-image"
    var productDetails = document.createElement("div");
    var rating = document.createElement("h4");
    rating.textContent = `Avaliação: ${product.rating.rate}/5 (${product.rating.count})`; 
    var price = document.createElement("p");
    price.textContent = "R$" + product.price;
    var description = document.createElement("span");
    description.textContent = product.description;
    var category = document.createElement("h5");
    category.textContent = "Categoria: " + product.category;

    productDetails.appendChild(rating);
    productDetails.appendChild(category);
    productDetails.appendChild(price);
    productDetails.appendChild(description);
    productContainer.appendChild(img);
    productContainer.appendChild(productDetails);

    document.getElementById("product").appendChild(productContainer);
}

function getProduct(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((product) => {
            title(product.title)
            createProductElement(product);
        })
}

function title(productTitle) {
    var title = document.createElement("h2");
    title.textContent = productTitle;
    title.className = "title"
    var container = document.getElementById("container");
    var firstChild = container.firstChild;
    container.insertBefore(title, firstChild);
}

var params = new URLSearchParams(window.location.search);
var productId = params.get('id');
getProduct(productId);