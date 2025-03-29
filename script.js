const GALLERIES_CONFIG = {
    'wedding': ['wedding1.jpg', 'wedding2.jpg', 'wedding3.jpg', 'wedding4.jpg', 'wedding5.jpg'],
    'model': ['model1.jpg', 'model2.jpg', 'model3.jpg', 'model4.jpg', 'model5.jpg'],
    'other': ['other1.jpg', 'other2.jpg', 'other3.jpg', 'other4.jpg', 'other5.jpg']
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initGalleries();
    setCurrentYear();
    checkAdminStatus();
    
    // Correction: vérifier si l'élément existe avant d'ajouter l'événement
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('footer').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

function initGalleries() {
    Object.keys(GALLERIES_CONFIG).forEach(galleryId => {
        const gallery = document.getElementById(`${galleryId}-gallery`);
        if (!gallery) return; // Si la galerie n'existe pas, passer à la suivante
        
        const mainImage = gallery.querySelector('.main-image img');
        const prevBtn = gallery.querySelector('.prev-image');
        const nextBtn = gallery.querySelector('.next-image');
        const images = GALLERIES_CONFIG[galleryId];
        let currentIndex = 0;
        
        // Définir les images de navigation
        updateNavImages();
        
        // Ajouter les événements de navigation
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateMainImage();
            updateNavImages();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateMainImage();
            updateNavImages();
        });
        
        function updateMainImage() {
            // Effet de transition
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = `images/${images[currentIndex]}`;
                mainImage.style.opacity = '1';
            }, 300);
        }
        
        function updateNavImages() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            const nextIndex = (currentIndex + 1) % images.length;
            
            prevBtn.style.backgroundImage = `url('images/${images[prevIndex]}')`;
            nextBtn.style.backgroundImage = `url('images/${images[nextIndex]}')`;
        }
    });
}

function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function checkAdminStatus() {
    if(sessionStorage.getItem('adminAuthenticated')) {
        document.querySelectorAll('.admin-link').forEach(link => {
            link.style.display = 'block';
        });
    }
}
// Code existant...

// Ajouter la fonction d'initialisation du slider
function initSlider() {
    let slide_data = [
        {
            'src': 'images/wedding1.jpg',
            'title': 'Mariage',
            'copy': 'CAPTURER LES MOMENTS PRÉCIEUX DE VOTRE JOURNÉE SPÉCIALE'
        },
        {
            'src': 'images/model1.jpg',
            'title': 'Mannequin',
            'copy': 'RÉVÉLER LA BEAUTÉ ET L\'ÉLÉGANCE DE CHAQUE MODÈLE'
        },
        {
            'src': 'images/other1.jpg',
            'title': 'Portraits',
            'copy': 'IMMORTALISER LA PERSONNALITÉ UNIQUE DE CHAQUE INDIVIDU'
        },
        {
            'src': 'images/wedding2.jpg',
            'title': 'Événements',
            'copy': 'PRÉSERVER LES SOUVENIRS DE VOS CÉLÉBRATIONS IMPORTANTES'
        }
    ];

    let slides = [],
        captions = [];

    let autoplay = setInterval(function() {
        nextSlide();
    }, 5000);

    let container = document.getElementById('container');
    let leftSlider = document.getElementById('left-slider');
    
    // Vérifier si les éléments existent
    if (!container || !leftSlider) return;
    
    let down_button = document.getElementById('down_button');

    if (down_button) {
        down_button.addEventListener('click', function(e) {
            e.preventDefault();
            clearInterval(autoplay);
            nextSlide();
            autoplay = setInterval(function() {
                nextSlide();
            }, 5000);
        });
    }

    for (let i = 0; i < slide_data.length; i++) {
        let slide = document.createElement('div'),
            caption = document.createElement('div'),
            slide_title = document.createElement('div');

        slide.classList.add('slide');
        slide.setAttribute('style', 'background:url(' + slide_data[i].src + ')');
        caption.classList.add('caption');
        slide_title.classList.add('caption-heading');
        slide_title.innerHTML = '<h1>' + slide_data[i].title + '</h1>';

        switch (i) {
            case 0:
                slide.classList.add('current');
                caption.classList.add('current-caption');
                break;
            case 1:
                slide.classList.add('next');
                caption.classList.add('next-caption');
                break;
            case slide_data.length - 1:
                slide.classList.add('previous');
                caption.classList.add('previous-caption');
                break;
            default:
                break;
        }
        
        caption.appendChild(slide_title);
        caption.insertAdjacentHTML('beforeend', '<div class="caption-subhead"><span>' + slide_data[i].copy + '</span></div>');
        slides.push(slide);
        captions.push(caption);
        leftSlider.appendChild(slide);
        container.appendChild(caption);
    }

    function nextSlide() {
        slides[0].classList.remove('current');
        slides[0].classList.add('previous', 'change');
        slides[1].classList.remove('next');
        slides[1].classList.add('current');
        slides[2].classList.add('next');
        let last = slides.length - 1;
        slides[last].classList.remove('previous');

        captions[0].classList.remove('current-caption');
        captions[0].classList.add('previous-caption', 'change');
        captions[1].classList.remove('next-caption');
        captions[1].classList.add('current-caption');
        captions[2].classList.add('next-caption');
        let last_caption = captions.length - 1;
        captions[last].classList.remove('previous-caption');

        let placeholder = slides.shift();
        let captions_placeholder = captions.shift();
        slides.push(placeholder);
        captions.push(captions_placeholder);
    }
}

// Mise à jour de l'initialisation pour inclure le slider
document.addEventListener('DOMContentLoaded', function() {
    initGalleries();
    initSlider(); // Ajout de l'initialisation du slider
    setCurrentYear();
    checkAdminStatus();
    
    // Reste du code...
});