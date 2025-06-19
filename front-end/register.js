document.querySelector('.login-btn').addEventListener('click', () => {
  document.getElementById('loginModal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('loginModal').style.display = 'none';
});

document.getElementById('loginModal').addEventListener('click', e => {
  if (e.target === document.getElementById('loginModal')) {
    document.getElementById('loginModal').style.display = 'none';
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('loginModal').style.display === 'flex') {
    document.getElementById('loginModal').style.display = 'none';
  }
});

document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();


  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (password !== confirmPassword) {
    alert('As senhas não coincidem');
    return;
  }

  const formData = {
    email: document.getElementById('registerEmail').value,
    senha: password, // Alterado 'password' para 'senha' para corresponder ao que é esperado no backend
    nome: document.getElementById('fullName').value,
    telefone: document.getElementById('phone').value,
    telefoneAlternativo: document.getElementById('altPhone').value,
    endereco: document.getElementById('address').value,
    complemento: document.getElementById('addressComplement').value,
    cidade: document.getElementById('city').value,
    estado: document.getElementById('state').value,
    cep: document.getElementById('zipCode').value
  };

  console.log('Form submitted:', formData);

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      alert(data.message);

      document.getElementById('registerForm').reset();
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Ocorreu um erro. Tente novamente.');
  });
});
