fillSection();

async function getProduct() {
  const response = await fetch("http://localhost:3000/api/products");
  return await response.json();
}

async function fillSection() {
  let result = await getProduct()
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      console.log(articles);
    });
}