// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        header.classList.toggle('menu-open');
    });
});

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animação de Fade In
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Feedback do Formulário
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simula envio do formulário
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Enviando...';
    button.disabled = true;

    setTimeout(() => {
        showMessage('Mensagem enviada com sucesso!', 'success');
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
});

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.querySelector('.contact-form').appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}


  document.getElementById("form-inscricao").addEventListener("submit", function (e) {
    e.preventDefault(); // Impede envio real
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const tipo = document.getElementById("tipo-participacao").value;

    if (nome === "" || email === "" || tipo === "") {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Simula envio
    document.getElementById("mensagem-sucesso").style.display = "block";
    this.reset();
  });

  document.addEventListener("DOMContentLoaded", function () {
    const localDiv = document.getElementById("localizacao");
    const mapaDiv = document.getElementById("mapa-localizacao");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          localDiv.innerHTML = `Sua localização aproximada: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;

          // Inicia o mapa
          const map = L.map('mapa-interativo').setView([lat, lon], 13);

          // Adiciona o tile (mapa visual)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18
          }).addTo(map);

          // Adiciona marcador
          L.marker([lat, lon]).addTo(map)
            .bindPopup('Você está aqui.')
            .openPopup();
        },
        function () {
          localDiv.innerHTML = "Não foi possível acessar a localização.";
        }
      );
    }
  });
