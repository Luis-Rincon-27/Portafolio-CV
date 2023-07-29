window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
    // Expresión regular para validar un correo electrónico válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Expresión regular para validar que el nombre no tenga números
    const namePattern = /^[A-Za-z\s]+$/;

    // Palabras prohibidas en el mensaje (lenguaje vulgar o ofensivo)
    const forbiddenWords = ["Maldito", "Coño", "Malparido", "Malpario", "Hijo de puta", "Puta"];

    // Función para enviar el formulario
    function submitForm(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validar que todos los campos estén completos
        if (!name || !email || !message) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Validar el formato del email
        if (!emailPattern.test(email)) {
            alert("Por favor, ingrese un email válido.");
            return;
        }

        // Validar que el nombre no tenga números
        if (!namePattern.test(name)) {
            alert("Por favor, ingrese un nombre válido sin números.");
            return;
        }

        // Validar que el mensaje no contenga lenguaje vulgar o ofensivo
        for (const word of forbiddenWords) {
            if (message.toLowerCase().includes(word)) {
                alert("El mensaje contiene lenguaje ofensivo o vulgar. Por favor, modifique su comentario.");
                return;
            }
        }

        // Crear un objeto con los datos del comentario
        const comment = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString(),
        };

        // Obtener los comentarios existentes o crear un array vacío si no hay comentarios aún
        const existingComments = JSON.parse(localStorage.getItem("comments") || "[]");

        // Agregar el nuevo comentario al array
        existingComments.push(comment);

        // Guardar el array de comentarios en el Local Storage
        localStorage.setItem("comments", JSON.stringify(existingComments));

        // Mostrar los comentarios en la página
        showComments();

        // Restablecer el formulario
        document.getElementById("contactForm").reset();

        alert("Gracias por dejar tu comentario. ¡Tu opinión es importante para nosotros!");
    }

    // Función para mostrar los comentarios en la página
    function showComments() {
        const comments = JSON.parse(localStorage.getItem("comments") || "[]");
        const commentsContainer = document.getElementById("commentsContainer");

        // Limpiar el contenedor de comentarios
        commentsContainer.innerHTML = "";

        // Mostrar cada comentario en el contenedor
        comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.innerHTML = `
                <p><strong>${comment.name}</strong> (${comment.email}) - ${comment.timestamp}</p>
                <p>${comment.message}</p>
                <hr>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    // Mostrar los comentarios existentes al cargar la página
    showComments();

    // Agregar el evento para enviar el formulario cuando se haga clic en el botón "Enviar Comentario"
    document.getElementById("contactForm").addEventListener("submit", submitForm);