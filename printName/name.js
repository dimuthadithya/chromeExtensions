const nameInput = document.getElementById('nameInput');
const h2 = document.querySelector('h2');

nameInput.addEventListener('input', (event) => {
  const name = event.target.value;
  h2.textContent = `Hello, ${name || 'World'}!`;
});
