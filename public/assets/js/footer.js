fetch("../assets/headerfooter/footer.html")
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }
    throw new Error("Network response was not ok.");
  })
  .then(function (footerContent) {
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = footerContent;
  })
  .catch(function (error) {
    console.log("Error:", error);
  });
