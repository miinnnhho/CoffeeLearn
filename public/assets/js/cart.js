$(function () {
  /* Take Course & Cart Check All Function */
  $('.cart-item .btn-clear').click(function () {
    $(this).parents('.cart-item').hide();
  });
  $('.cart-wrap .btn-all-clear').click(function () {
    $('.cart-item').hide();
  });
  $('.cart-chk-all').click(function () {
    $('.check-status .cart-chk').prop('checked', this.checked);
    // attr('속성명')
    // attr('속성명', '값')
  });
});
