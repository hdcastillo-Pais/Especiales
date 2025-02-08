const pointsData = [
    { 
        x: 555.88, 
        y: 133.69, 
        mobileX: 492.19, 
        mobileY: 373.66, 
        title: "Punto 1", 
        image: "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/1.%20San%20Luis%20II.jpg", 
        description: "Descripción del punto 1." 
    },
    { 
        x: 631.88, 
        y: 195.69, 
        mobileX: 515.53, 
        mobileY: 427.28, 
        title: "Punto 2", 
        image: "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/2.%20Jorge%20Eliecer%20Gaitán.jpg", 
        description: "Descripción del punto 2." 
    },
    { 
        x: 635.88, 
        y: 261.69, 
        mobileX: 518.97, 
        mobileY: 484.38, 
        title: "Punto 3", 
        image: "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/3.%20Alfonso%20L%C3%B3pez.jpg", 
        description: "Descripción del punto 3." 
    },
    { 
        x: 612.88, 
        y: 419.69, 
        mobileX: 499.13, 
        mobileY: 621.06, 
        title: "Punto 4", 
        image: "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/4.%20Marroqu%C3%ADn.jpg", 
        description: "Descripción del punto 4." 
    },
    { 
        x: 561.88, 
        y: 552.69, 
        mobileX: 455.06, 
        mobileY: 736.09, 
        title: "Punto 5", 
        image: "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/5.%20El%20Vallado.jpg", 
        description: "Descripción del punto 5." 
    },
    { 
        x: 481.88, 
        y: 620.69, 
        mobileX: 385.94, 
        mobileY: 794.91, 
        title: "Punto 6", 
        image: "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/6.%20Ciudad%202000.jpg", 
        description: "Descripción del punto 6." 
    },
    { 
        x: 411.88, 
        y: 746.69, 
        mobileX: 325.47, 
        mobileY: 903.91, 
        title: "Punto 7", 
        image: "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/7.%20Bochalema.jpg", 
        description: "Descripción del punto 7." 
    }
];

const map = document.getElementById("map");
const pointsContainer = document.getElementById("points");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupImage = document.getElementById("popup-image");
const popupDescription = document.getElementById("popup-description");

// Dimensiones originales de las imágenes
const DESKTOP_DIMENSIONS = {
    width: 1600,
    height: 900
};

const MOBILE_DIMENSIONS = {
    width: 800,
    height: 1400
};

function calculateRelativePosition(x, y, dimensions) {
    return {
        x: (x / dimensions.width) * 100,
        y: (y / dimensions.height) * 100
    };
}

function updateMap() {
    const isMobile = window.innerWidth <= 800;
    
    // Actualizar la fuente de la imagen según el tamaño de la pantalla
    map.src = isMobile 
        ? "https://hdcastillo-pais.github.io/Especiales/Interactivo/Mobile-image_800x1400.jpg" 
        : "https://hdcastillo-pais.github.io/Especiales/Interactivo/Desktop-image_1600x900.jpg";
    
    // Limpiar los puntos existentes
    pointsContainer.innerHTML = "";
    
    // Crear los nuevos puntos con las coordenadas correspondientes
    pointsData.forEach((point, index) => {
        const pointElement = document.createElement("div");
        pointElement.className = "point";
        
        // Calcular posición relativa según el modo (móvil o escritorio)
        const position = calculateRelativePosition(
            isMobile ? point.mobileX : point.x,
            isMobile ? point.mobileY : point.y,
            isMobile ? MOBILE_DIMENSIONS : DESKTOP_DIMENSIONS
        );
        
        // Aplicar posiciones relativas
        pointElement.style.left = `${position.x}%`;
        pointElement.style.top = `${position.y}%`;
        
        pointElement.setAttribute('data-index', index);
        pointElement.addEventListener("click", () => showPopup(point));
        
        pointsContainer.appendChild(pointElement);
    });
}

function showPopup(point) {
    popupTitle.textContent = point.title;
    popupImage.src = point.image;
    popupDescription.textContent = point.description;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
}

// Cerrar popup al hacer clic fuera
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        closePopup();
    }
});

// Cerrar popup con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Inicializar mapa y actualizar en cambios de tamaño
window.addEventListener("resize", updateMap);
window.addEventListener("load", updateMap);