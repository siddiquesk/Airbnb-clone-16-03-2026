 console.log("hello");

  const form = document.getElementById("listingForm");

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const locationInput = document.getElementById("location"); // ✅ FIX
  const country = document.getElementById("country");

  const urlRegex = /^(https?:\/\/.*\.(png|jpg|jpeg|webp))$/i;

  function showError(input, message) {
    input.classList.add("input-error");
    document.getElementById(input.id + "Error").innerText = message;
  }

  function clearError(input) {
    input.classList.remove("input-error");
    document.getElementById(input.id + "Error").innerText = "";
  }

  form.addEventListener("submit", function (e) {
    let isValid = true;

    if (title.value.trim() === "") {
      showError(title, "Title is required");
      isValid = false;
    } else clearError(title);

    if (description.value.trim().length < 10) {
      showError(description, "Minimum 10 characters required");
      isValid = false;
    } else clearError(description);


    if (price.value <= 0) {
      showError(price, "Price must be greater than 0");
      isValid = false;
    } else clearError(price);

    if (locationInput.value.trim() === "") {
      showError(locationInput, "Location is required");
      isValid = false;
    } else clearError(locationInput);

    if (country.value.trim() === "") {
      showError(country, "Country is required");
      isValid = false;
    } else clearError(country);

    if (!isValid) e.preventDefault();
  });