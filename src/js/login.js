const authForm = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('errorMsg');

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorMsg.textContent = '';

    const credentials = {
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
    };

    try {
        const response = await window.api.login(credentials);

        if (response.success) {
            console.log('Login exitoso:', response.user);
            // Redirigir a la siguiente pantalla
            window.location.href = 'index.html';
        } else {
            // Mostrar error si las credenciales fallan o hay problemas de DB
            errorMsg.textContent = response.message || 'Usuario o contraseña incorrectos';
        }
    } catch (error) {
        console.error('Error en la comunicación:', error);
        errorMsg.textContent = 'Error al conectar con el servidor.';
    }
});