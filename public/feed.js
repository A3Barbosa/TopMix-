const sortForm = document.querySelector('#sortForm')
const radioButtons = document.getElementsByClassName('buttonOne')
const array = Array.from(radioButtons);

console.log(radioButtons)

array.forEach((radioButton) => {
  radioButton.addEventListener("click", () => {
    sortForm.submit();
    console.log(radioButtons)
  });
});