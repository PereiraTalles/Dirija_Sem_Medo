document.querySelector('.login-btn').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'none';
});

document.getElementById('loginModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = 'cliente.html';
        } else {
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        document.getElementById('error-message').style.display = 'block';
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('loginModal').style.display === 'flex') {
        document.getElementById('loginModal').style.display = 'none';
    }
});
