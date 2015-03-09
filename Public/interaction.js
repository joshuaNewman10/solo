$(document).ready(function() {
  $('button').on('click', function() {
    console.log('button clicked!');
    parseData($(this).html());
  });
});
