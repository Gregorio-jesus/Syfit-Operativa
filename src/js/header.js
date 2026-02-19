document.addEventListener("DOMContentLoaded", () => {
    fetch('../views/header.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
            initHeaderLogic();
        });
});

async function initHeaderLogic() {
    const trigger = document.getElementById('profile-trigger');
    const modal = document.getElementById('profile-modal');
    const closeBtn = document.getElementById('close-profile');

    try {
        const user = await window.api.getUserInfo();
        const roleNames = {
            'master': 'Master',
            'admin': 'Administrador',
            'gerente': 'Gerente',
            'recepcionista': 'Recepción',
            'usuario': 'Usuario'
        };

        document.getElementById('modal-name').textContent = user.username || 'Usuario';
        document.getElementById('modal-role').textContent = roleNames[user.permission] || 'Usuario';
    } catch (err) {
        console.error("Error al cargar datos del header:", err);
    }

    trigger.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    document.getElementById('btn-logout').addEventListener('click', () => {
        window.api.logout();
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
        window.location.href = '#';
    });

    document.getElementById('btn-help').addEventListener('click', () => {
        window.location.href = '#';
    });

}