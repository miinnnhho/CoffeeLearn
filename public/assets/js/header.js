fetch("../assets/headerfooter/header.html")
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }
    throw new Error("Network response was not ok.");
  })
  .then(function (headerContent) {
    const headerElement = document.querySelector("header");
    headerElement.innerHTML = headerContent;
  })
  .catch(function (error) {
    console.log("Error:", error);
  });
