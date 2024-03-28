var submitButton = document.querySelector('button');
var input = document.querySelector('input');
var form = document.querySelector('form');
var arrow = document.querySelector('.icon-arrow');
var close = document.querySelector('.icon-error');
var check = document.querySelector('.icon-success');
var checkPath = document.querySelector('.icon-success path');

console.log(checkPath.getTotalLength());
submitButton.addEventListener('click', function (e) {
  e.preventDefault();
  if (form.dataset.state != "typing") {
    TweenMax.to(close, 0.5, {
      opacity: 0,
      rotation: 0 });

    TweenMax.fromTo(check, 0.5, {
      rotation: 360 * 3 },
    {
      rotation: 0 });

    TweenMax.to(checkPath, 0.5, {
      strokeDashoffset: 175 });

    form.dataset.state = "typing";
    TweenMax.fromTo(arrow, 0.45, {
      rotation: 0,
      x: '-60px',
      opacity: '0' },
    {
      rotation: 0,
      x: '0',
      opacity: '1' });

    return;
  }

  TweenMax.to(arrow, 1, {
    rotation: 360 * 5,
    transformOrigin: "50% 50%",
    opacity: 0 });


  setTimeout(function () {
    if (input.value != 'yes') {
      form.dataset.state = "error";
      TweenMax.to(close, 0.5, {
        rotation: 360 * 3,
        opacity: 1 });

    } else {
      form.dataset.state = "success";
      TweenMax.to(checkPath, 0.65, {
        strokeDashoffset: 0 });

    }
  }, 500);
});