document.addEventListener('DOMContentLoaded', () => {

    const routes = {
        'button-clientes': '#',
        'button-membresias': '#',
        'button-visitas': '#',
        'button-ventas': '#',
        'button-pagos': '#',
        'button-ajustes': '#'
    };

    Object.keys(routes).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.href = routes[id];
            });
        }
    });

});