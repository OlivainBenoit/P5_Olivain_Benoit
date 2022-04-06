let product = JSON.parse(localStorage.getItem("products"));

console.log(product)

for (var i = 0; i < product.length; i++) {
  fillSectionCart()
}

function fillSectionCart() {
  let cartArticle = document.createElement("article");
  document.getElementById("cart__items").appendChild(cartArticle);
  cartArticle.classList.add("cart__item");
  cartArticle.setAttribute("data-id", product[i].idProduct);
  cartArticle.setAttribute("data-color", product[i].colorProduct);

  let cartDivImg = document.createElement("div");
  cartArticle.appendChild(cartDivImg);
  cartDivImg.classList.add("cart__item__img");

  let cartProductImg = document.createElement("img");
  cartDivImg.appendChild(cartProductImg);
  cartProductImg.src = product[i].srcImg;
  cartProductImg.alt = product[i].altImg;


  let cartItemContent = document.createElement("div");
  cartArticle.appendChild(cartItemContent);
  cartItemContent.classList.add("cart__item__content");

  let cartItemContentDescription = document.createElement("div");
  cartItemContent.appendChild(cartItemContentDescription);
  cartItemContentDescription.classList.add("cart__item__content__description");

  let cartProductName = document.createElement("h2");
  cartItemContentDescription.appendChild(cartProductName);
  cartProductName.innerHTML = product[i].nameProduct;

  let cartProductColor = document.createElement("p");
  cartItemContentDescription.appendChild(cartProductColor);
  cartProductColor.innerHTML = "Couleur : " + product[i].colorProduct;

  let cartProductPrice = document.createElement("p");
  cartItemContentDescription.appendChild(cartProductPrice);
  cartProductPrice.innerHTML = "Prix : " + product[i].priceProduct + " €";

  let cartItemContentSetting = document.createElement("div");
  cartItemContent.appendChild(cartItemContentSetting);
  cartItemContentSetting.classList.add("cart__item__content__setting");

  let cartItemContentSettingQuantity = document.createElement("div");
  cartItemContentSetting.appendChild(cartItemContentSettingQuantity);
  cartItemContentSettingQuantity.classList.add("cart__item__content__setting__quantity");
  cartItemContentSettingQuantity.style = "display: flex; align-items: center; gap: 1rem; height: 30px;";
  let cartProductQuantity = document.createElement("p");
  cartItemContentSettingQuantity.appendChild(cartProductQuantity);
  cartProductQuantity.innerHTML = "Quantité : ";

  let cartProductQuantityInput = document.createElement("input");
  cartItemContentSettingQuantity.appendChild(cartProductQuantityInput);
  cartProductQuantityInput.classList.add("itemQuantity");
  cartProductQuantityInput.type = "number";
  cartProductQuantityInput.name = "itemQuantity";
  cartProductQuantityInput.value = product[i].quantityProduct;
  
  cartProductQuantityInput.addEventListener("change", (event) => {
    let cartProductQuantityInputPicked = parseInt(event.target.value);
    let productFind = product.find((item) => item.idProduct === cartArticle.getAttribute("data-id") && item.colorProduct === cartArticle.getAttribute("data-color"));
    if (cartProductQuantityInputPicked > 0 && cartProductQuantityInputPicked < 101 && productFind) {
        productFind.quantityProduct = cartProductQuantityInputPicked;
      localStorage.setItem("products", JSON.stringify(product));
      location.reload();
    }
    else {
      alert("Veuillez choisir une quantité comprise entre 1 et 100");
      cartProductQuantity.innerHTML = "Quantité : " + "Erreur";
    }
  });
  
  let cartItemContentSettingDelete = document.createElement("div");
  cartItemContentSetting.appendChild(cartItemContentSettingDelete);
  cartItemContentSettingDelete.classList.add("cart__item__content__setting");

  let cartDeleteItem = document.createElement("button");
  cartItemContentSettingDelete.appendChild(cartDeleteItem);
  cartDeleteItem.classList.add("deleteItem");
  cartDeleteItem.style = "margin-top: 10px";
  cartDeleteItem.innerHTML = "Supprimer";

  cartItemContentSettingDelete.addEventListener("click", (event) => {
    let productFind = product.find((item) => item.idProduct === cartArticle.getAttribute("data-id") && item.colorProduct === cartArticle.getAttribute("data-color"));
    product = product.filter((item) => item !== productFind);
    localStorage.setItem("products", JSON.stringify(product));
    alert(`Le produit ${productFind.nameProduct} de couleur ${productFind.colorProduct} a été supprimé du panier`);
    location.reload();
  });
}


function getTotal() {
  let totalQuantity = 0;
  let totalQuantityHtml = document.querySelector("#totalQuantity");

  for (var k = 0; k < product.length; k++){
    totalQuantity += product[k].quantityProduct;
  }

  totalQuantityHtml.innerHTML = totalQuantity;
  
  let totalPrice = 0;
  let totalPriceHtml = document.querySelector("#totalPrice");

  for (let l = 0; l < product.length; l++){
    totalPrice += (product[l].priceProduct * product[l].quantityProduct);
  }
  
  totalPriceHtml.innerHTML = totalPrice;

};

getTotal() 