let currentUrl = window.location.href;
let url = new URL(currentUrl);
let id = url.searchParams.get("id");
console.log(id);

fillSection()

async function getProduct() {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return await response.json();
}

async function fillSection() {
  let result = await getProduct()
    .then(function (product) {

      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.src = product.imageUrl;
      productImg.alt = product.altTxt;

      let productName = document.querySelector("#title");
      productName.innerHTML = product.name;

      let productPrice = document.querySelector("#price");
      productPrice.innerHTML = product.price;

      let productDescription = document.querySelector("#description");
      productDescription.innerHTML = product.description;

      for (let color of product.colors) {
        let productColor = document.createElement("option");
        document.querySelector("#colors").appendChild(productColor);
        productColor.innerHTML = color;
        console.log(productColor);
      }
    }) 
};

// On récupère la valeur de la quantité
let quantityPicked = null;
let inputQuantity = document.querySelector("#quantity");
inputQuantity.addEventListener('change', (event) => {
  quantityPicked = parseInt(event.target.value);
});

// On récupère la valeur de la couleur
let colorPicked = null;
let inputColor = document.querySelector("#colors");
inputColor.addEventListener("change", (event) => {
  colorPicked = event.target.value;
});


// On récupère le bouton
const btnAddToCart = document.querySelector("#addToCart");



// On crée une fonction pour stocker les données dans le panier
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("products")) || [];
  let item = cart.find((item) => item.idProduct === product.idProduct && item.colorProduct === product.colorProduct);
  if(item) { 
    item.quantityProduct += product.quantityProduct;
  } else {
    cart.push(product);
  }
  localStorage.setItem("products", JSON.stringify(cart));
}

// On appelle l'event click sur le bouton
btnAddToCart.addEventListener('click', function (event) {
  // Si la couleur n'est pas choisie, on renvoie une alerte a l'utilisateur, pareil pour la quantité, sinon on execute le code
      if (colorPicked === null) {
      alert("Veuillez choisir une couleur");
    } else if (quantityPicked < 1 || quantityPicked > 100) {
      alert("Veuillez choisir une quantité comprise entre 1 et 100");
    } else {
      // On récupère le nom et le prix de l'article
      let productName = document.querySelector("#title").innerHTML;
      let productPrice = parseFloat(document.querySelector("#price").innerHTML);
      let productImg = document.querySelector(".item__img > img");
      let productImgSrc = productImg.getAttribute("src");
      let productImgAlt = productImg.getAttribute("alt");

      let product = {
        idProduct: id,
        srcImg: productImgSrc,
        altImg: productImgAlt,
        colorProduct: colorPicked,
        quantityProduct: quantityPicked,
        nameProduct: productName,
        priceProduct: productPrice,
      };
      // On appelle la fonction qui stocke les données dans le panier
      addToCart(product);
    }
});




