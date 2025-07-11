const loader = document.querySelector(".loader");
const button = document.querySelector("button");
const productCodeBlockElement = document.getElementById("product-code-block");
const toast = document.querySelector(".toast");
const content = document.querySelector(".content");

const getProducts = async () => {
  const url = "http://localhost:3000/products"; // REMEMBER TO CHANGE FOR PRODUCTION!

  try {
    const { data } = await axios.get(url);

    if (data.success) {
      productCodeBlockElement.textContent = data.html;

      hljs.highlightElement(productCodeBlockElement);
    }
  } catch (error) {}
};

// Call the function to fetch and display the code
getProducts();

let intervalId;

intervalId = setInterval(() => {
  if (productCodeBlockElement.textContent === "") {
    getProducts();
  } else {
    loader.style.display = "none";
    content.style.display = "grid";

    clearInterval(intervalId);
  }
}, 1000);

// Copy the code to the clipboard.
let timeoutId;

const handleCopy = () => {
  navigator.clipboard.writeText(productCodeBlockElement.textContent);

  toast.style.display = "flex";

  clearTimeout(intervalId);

  timeoutId = setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
};

button.addEventListener("click", handleCopy);
