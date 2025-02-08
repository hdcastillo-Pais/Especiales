const pointsData = [
  {
    x: 604.88,
    y: 133.69,
    mobileX: 492.19,
    mobileY: 373.66,
    title: "San Luis II",
    image:
      "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/1.%20San%20Luis%20II.jpg",
    description:
      "Algunos andenes de la Avenida Ciudad de Cali lucen repletos de residuos voluminosos, los cuales son desechados por los ciudadanos que hacen caso omiso a los horarios en los que el camión recolector pasa por el lugar.",
  },
  {
    x: 631.88,
    y: 195.69,
    mobileX: 515.53,
    mobileY: 427.28,
    title: "Jorge Eliécer Gaitán",
    image:
      "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/2.%20Jorge%20Eliecer%20Gaitán.jpg",
    description: "La Avenida Ciudad de Cali posee tramos que no se encuentran demarcados, por tal razón, decenas de personas desacatan las normas y los límites de velocidad establecidos para transitar en la ciudad.",
  },
  {
    x: 635.88,
    y: 261.69,
    mobileX: 518.97,
    mobileY: 484.38,
    title: "Alfonso López",
    image:
      "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/3.%20Alfonso%20L%C3%B3pez.jpg",
    description: "La acumulación de basuras en los andenes de la Avenida Ciudad de Cali es otro de los asuntos que genera gran preocupación entre los transeúntes, debido a que ocupa gran parte de los andenes y separadores.",
  },
  {
    x: 612.88,
    y: 419.69,
    mobileX: 499.13,
    mobileY: 621.06,
    title: "Marroquín",
    image:
      "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/4.%20Marroqu%C3%ADn.jpg",
    description: "Algunos tramos de la Avenida Ciudad de Cali se encuentran en pésimas condiciones para el tránsito de los vehículos que circulan por la vía.",
  },
  {
    x: 561.88,
    y: 552.69,
    mobileX: 455.06,
    mobileY: 736.09,
    title: "El Vallado",
    image:
      "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/5.%20El%20Vallado.jpg",
    description: "La Avenida Ciudad de Cali en su paso por el oriente de la ciudad no se encuentra en condiciones aptas para la circulación de los automóviles.",
  },
  {
    x: 481.88,
    y: 620.69,
    mobileX: 385.94,
    mobileY: 794.91,
    title: "Ciudad 2000",
    image:
      "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/6.%20Ciudad%202000.jpg",
    description: "La Avenida Ciudad de Cali, luego del puente que comunica a los barrios Ciudad Córdoba y Ciudad 2000, se encuentra en condiciones óptimas para el tránsito de los vehículos.",
  },
  {
    x: 411.88,
    y: 746.69,
    mobileX: 325.47,
    mobileY: 903.91,
    title: "Bochalema",
    image:
      "https://hdcastillo-pais.github.io/Especiales/Interactivo/Imagenes/7.%20Bochalema.jpg",
    description: "En su paso por Bochalema, la Avenida Ciudad de Cali se distingue por contar con andenes, iluminación y vías demarcadas.",
  },
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
  height: 900,
};

const MOBILE_DIMENSIONS = {
  width: 800,
  height: 1400,
};

function calculateRelativePosition(x, y, dimensions) {
  return {
    x: (x / dimensions.width) * 100,
    y: (y / dimensions.height) * 100,
  };
}

function updateMap() {
  const isMobile = window.innerWidth <= 800;

  // Actualizar la fuente de la imagen según el tamaño de la pantalla
  map.src = isMobile
    ? "https://hdcastillo-pais.github.io/Especiales/Interactivo/Mobile-image_800x1400-Sin-puntos.jpg"
    : "https://hdcastillo-pais.github.io/Especiales/Interactivo/Desktop-image_1600x900-Sin-Puntos.jpg";

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

    pointElement.setAttribute("data-index", index);
    pointElement.addEventListener("click", () => showPopup(point));

    pointsContainer.appendChild(pointElement);
  });
}

function showPopup(point) {
  popupTitle.textContent = point.title;
  popupImage.src = point.image;
  popupDescription.textContent = point.description;
  popup.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePopup() {
  popup.classList.remove("active");
  document.body.style.overflow = "";
}

// Cerrar popup al hacer clic fuera
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

// Cerrar popup con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup();
  }
});

// Inicializar mapa y actualizar en cambios de tamaño
window.addEventListener("resize", updateMap);
window.addEventListener("load", updateMap);
