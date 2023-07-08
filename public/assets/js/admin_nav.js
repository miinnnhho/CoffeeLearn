fetch('../views/admin_nav.html')
.then(function(response) {
  if (response.ok) {
    return response.text();
  }
  throw new Error('Network response was not ok.');
})
.then(function(navContent) {
  const navElement = document.querySelector('.left-nav');
  navElement.innerHTML = navContent;
})
.catch(function(error) {
  console.log('Error:', error);
});