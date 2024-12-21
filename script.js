let lastClickTime = 0;  // Temps du dernier clic
let clickCount = 0;     // Nombre de clics
let animationSpeed = 0.5;  // Vitesse de base de l'animation
let rotationIntensity = 5; // Intensité de rotation par défaut

document.getElementById('ouvrir').addEventListener('click', function() {
    const carre = document.getElementById('carre');
    const body = document.body;
    const currentTime = Date.now();
    
    // Calculer l'intervalle entre deux clics
    const timeDifference = currentTime - lastClickTime;
    
    // Si le clic est rapide (moins de 300ms), accélérer l'animation
    if (timeDifference < 300) {
        clickCount++;
        animationSpeed = Math.max(0.1, 0.5 - clickCount * 0.05);  // Rendre l'animation plus rapide à chaque clic
        rotationIntensity = Math.min(40, 5 + clickCount * 2);     // Rendre la rotation plus intense à chaque clic
    } else {
        // Si le clic est plus lent, revenir aux valeurs par défaut
        animationSpeed = 0.5;
        rotationIntensity = 5;
        clickCount = 1; // Réinitialiser le compteur de clics
    }

    // Changer la couleur du carré de manière aléatoire
    const randomColor = getRandomColor();
    carre.style.backgroundColor = randomColor;

    // Ajouter les classes d'animation avec la vitesse et l'intensité ajustées
    carre.style.animation = `giggle ${animationSpeed}s ease-in-out`;

    // Appliquer l'intensité de la rotation
    carre.style.transform = `rotate(${rotationIntensity}deg)`;

    // Retirer l'animation après l'exécution
    setTimeout(function() {
        carre.style.transform = 'rotate(0deg)';  // Réinitialiser la rotation
    }, animationSpeed * 1000);

    if (clickCount === 5) {
        const cercleNoir = document.createElement('div');
        cercleNoir.classList.add('cercle-noir');
        document.body.appendChild(cercleNoir);

        cercleNoir.addEventListener('animationend', function() {
            // Enlever le cercle noir, le bouton et le carré
            document.body.removeChild(cercleNoir);
            document.getElementById('carre').remove();
            document.getElementById('ouvrir').remove();
            // Changer le fond en vert
            document.body.style.backgroundColor = 'black';
        
            // Faire apparaître le triangle
            const triangle = document.getElementById('triangle');
            triangle.style.animation = 'slideUp 1s forwards';
            triangle.style.opacity = 1;

            // Afficher le conteneur des triangles
            const triangleContainer = document.querySelector('.triangle-container');
            triangleContainer.style.display = 'block';
            // Forcer le reflow pour appliquer les animations
            triangleContainer.offsetHeight; // Force reflow
            triangleContainer.querySelectorAll('.triangle').forEach((triangle, index) => {
                triangle.style.animationPlayState = 'running';
            });
        });
        
        clickCount = 0;
    }
    
    lastClickTime = currentTime;
});

function getRandomColor() {
    // Génère une couleur hexadécimale aléatoire
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Gestion des clics sur les triangles
document.querySelectorAll('.triangle-container .triangle').forEach((triangle, index, triangles) => {
    triangle.addEventListener('click', function() {
        triangle.style.animation = 'fadeUp 0.5s forwards';
        triangle.addEventListener('animationend', function() {
            triangle.style.display = 'none';
            if (index === 0) {
                // Afficher le bouton "Suivant" lorsque le dernier triangle a disparu
                console.log('Dernier triangle');
                document.getElementById('suivant').style.display = 'block';
            }
        });
    });
});

// Gestion du clic sur le bouton "Suivant"
document.getElementById('suivant').addEventListener('click', function() {
    // Rediriger vers la page inventaire.html
    window.location.href = 'inventaire.html';
});