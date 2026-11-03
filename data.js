/**
 * Base de datos completa y actualizada de Malls y Locales de Comida en Santiago de Chile
 * Incluye restaurantes, terrazas, mercados gastronómicos, comida rápida, cafeterías,
 * heladerías y bares con calificaciones de Uber Eats, Google Maps y reseñas de redes sociales.
 * Sin íconos ni emojis.
 */

window.MALLS_DATA = [
  {
    id: "all",
    name: "Todos los Malls (Santiago)",
    shortName: "Todos los Malls",
    comuna: "Gran Santiago",
    zones: ["Todas las zonas"],
    badge: "Catálogo Completo",
    gradient: "from-rose-500 via-fuchsia-500 to-indigo-500",
    description: "Explora o sortea entre absolutamente todas las marcas y locales gastronómicos de los principales centros comerciales de Santiago."
  },
  {
    id: "costanera-center",
    name: "Cenco Costanera (Costanera Center)",
    shortName: "Costanera Center",
    comuna: "Providencia",
    address: "Av. Andrés Bello 2425, Providencia",
    zones: ["QINTO (Nivel 5)", "Patio de Comidas (Nivel 5)", "Sky 300 (Piso 62)", "Niveles 1 al 4 (Cafés y Dulces)"],
    badge: "QINTO · Sky 300 · Patio Nivel 5",
    gradient: "from-pink-500 to-rose-600",
    description: "El ícono de Providencia con su renovado universo gastronómico QINTO en el quinto nivel, barras de coctelería, gran patio de comidas y mirador a 300 metros."
  },
  {
    id: "parque-arauco",
    name: "Parque Arauco",
    shortName: "Parque Arauco",
    comuna: "Las Condes",
    address: "Av. Presidente Kennedy 5413, Las Condes",
    zones: ["Boulevard (Exterior)", "Bazar Gourmet (Piso 3)", "Santiago Open Gourmet", "Patio de Comidas (Nivel 2)"],
    badge: "Boulevard · Bazar Gourmet · SOG",
    gradient: "from-amber-500 to-orange-600",
    description: "El polo gastronómico más completo del sector oriente: terrazas al aire libre en el Boulevard, propuestas internacionales en Bazar Gourmet y Santiago Open Gourmet."
  },
  {
    id: "mut",
    name: "MUT (Mercado Urbano Tobalaba)",
    shortName: "MUT Tobalaba",
    comuna: "Las Condes / Providencia",
    address: "Av. Apoquindo 2730 (Metro Tobalaba)",
    zones: ["Piso 5 (El Puente)", "Piso 4 (La Terraza)", "Piso 3 (El Jardín)", "Nivel -2 (El Mercado)", "Nivel -3 (La Estación)"],
    badge: "Cocinerías de Autor · Jardín · Mercado",
    gradient: "from-emerald-500 to-teal-600",
    description: "El mercado urbano de tendencia en Santiago: jardines interiores, pizzerías de masa madre, bistrós, cocinerías del mundo en el Nivel -2 y pastelería de autor."
  },
  {
    id: "alto-las-condes",
    name: "Cenco Alto Las Condes",
    shortName: "Alto Las Condes",
    comuna: "Las Condes",
    address: "Av. Presidente Kennedy 9001, Las Condes",
    zones: ["Mirador del Alto (Nivel 3)", "Patio de Comidas", "Cafeterías Interior"],
    badge: "Mirador del Alto · Terrazas",
    gradient: "from-violet-500 to-purple-600",
    description: "Destaca por el Mirador del Alto en el tercer nivel con terrazas abiertas, restaurantes de mantel largo, parrillas, tapas españolas y patio de comidas."
  },
  {
    id: "plaza-vespucio",
    name: "Mallplaza Vespucio",
    shortName: "Plaza Vespucio",
    comuna: "La Florida",
    address: "Av. Vicuña Mackenna Oriente 7110, La Florida",
    zones: ["Mercado del 14", "Las Terrazas", "Patio de Comidas", "Interior y Dulces"],
    badge: "Mercado del 14 · Las Terrazas",
    gradient: "from-cyan-500 to-blue-600",
    description: "Con su bulevar gastronómico Mercado del 14 y Las Terrazas, reúne cervecerías artesanales, picadas chilenas históricas, restaurantes familiares y comida rápida."
  },
  {
    id: "plaza-egana",
    name: "Mallplaza Egaña",
    shortName: "Plaza Egaña",
    comuna: "La Reina / Ñuñoa",
    address: "Av. Larraín 5862, La Reina",
    zones: ["Azotea Urbana (Nivel 4)", "Patio de Comidas (Nivel 4)", "Niveles Interiores"],
    badge: "Azotea Urbana Nivel 4",
    gradient: "from-fuchsia-500 to-pink-600",
    description: "Su Azotea Urbana al aire libre en el cuarto piso concentra parrillas argentinas, fuentes de soda clásicas, trattorias italianas, hamburgueserías y bares."
  },
  {
    id: "cenco-florida",
    name: "Cenco Florida (Florida Center)",
    shortName: "Cenco Florida",
    comuna: "La Florida",
    address: "Av. Vicuña Mackenna Oriente 6100, La Florida",
    zones: ["Mirador Florida", "Patio de Comidas (Nivel 3)", "Cafeterías"],
    badge: "Mirador Florida · Patio Nivel 3",
    gradient: "from-sky-500 to-indigo-600",
    description: "Renovado con el sector gastronómico Mirador Florida de más de 3.700 m², sumando cocina peruana, japonesa, parrillas, pizzerías y un completo patio de comidas."
  },
  {
    id: "plaza-oeste",
    name: "Mallplaza Oeste",
    shortName: "Plaza Oeste",
    comuna: "Cerrillos / Maipú",
    address: "Av. Américo Vespucio 1501, Cerrillos",
    zones: ["Las Terrazas (Laguna)", "Ruta Gastronómica", "Patio de Comidas (Nivel 3)", "Cafés y Postres"],
    badge: "Las Terrazas · Laguna · Ruta Gastronómica",
    gradient: "from-orange-500 to-red-600",
    description: "Un paseo al aire libre junto a su laguna central en Las Terrazas y su Ruta Gastronómica, ideal para almuerzos al sol, cenas, gastrobares y postres."
  }
];

const BRAND_CATALOG = [
  // ================= RESTAURANTES, TERRAZAS Y POLOS GASTRONÓMICOS =================
  {
    id: "fogo-de-chao",
    name: "Fogo de Chão",
    cuisine: "Rodizio Brasileño y Carnes a la Espada",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$$",
    avgPriceCLP: "$28.000 - $42.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.7,
    googleRating: 4.8,
    socialHandle: "@fogodechaochile",
    socialHighlight: "El debut más comentado de QINTO en Cenco Costanera con su sistema de carnes a la espada y su gran Mesa de Mercado.",
    description: "Prestigioso steakhouse brasileño donde los maestros parrilleros sirven en tu mesa cortes nobles asados a la espada como Picanha, Alcatra y Cordero, junto a una barra gourmet ilimitada.",
    mustTry: ["Picanha a la Espada", "Fraldinha", "Mesa de Mercado Gourmet", "Pão de Queijo Tibio", "Caipirinha de Maracuyá"],
    vibe: "Experiencia de alto nivel en QINTO, ideal para celebrar aniversarios o una ocasión especial.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Cristóbal M.", rating: 5, text: "La calidad de la picanha y la atención con el semáforo verde y rojo en la mesa es de primer nivel." },
      { source: "Instagram", user: "@comino.cl", rating: 4.8, text: "El pan de queso recién horneado y la barra de quesos e ibéricos valen totalmente la visita." }
    ]
  },
  {
    id: "la-birra-bar",
    name: "La Birra Bar",
    cuisine: "Smash Burgers Artesanales y Cervecería",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@labirrabar.cl",
    socialHighlight: "Premiada internacionalmente en Miami y Buenos Aires por su pan nube de receta propia y su medallón de carne jugoso.",
    description: "Famosa hamburguesería de origen argentino que aterrizó en QINTO con más de 15 variedades de hamburguesas artesanales en pan brioche nube, papas crujientes y cervezas.",
    mustTry: ["Golden Burger", "Crispy Onion Burger", "Doble Cuarto La Birra", "Papas con Cheddar y Bacon"],
    vibe: "Ambiente urbano y moderno para comer una de las hamburguesas más famosas del continente.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Matías V.", rating: 4.9, text: "El pan es literalmente una nube y el punto de la carne smash con cheddar derretido es perfecto." }
    ]
  },
  {
    id: "enrique-tomas",
    name: "Enrique Tomás",
    cuisine: "Jamón Ibérico, Tapas Españolas y Vinos",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $25.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@enriquetomas.cl",
    socialHighlight: "Referente mundial del jamón ibérico de bellota recién cortado a cuchillo, bocatines calientes y sangría española.",
    description: "Taberna y tienda gastronómica española especializada en tablas de jamón ibérico, quesos manchegos, croquetas cremosas, tortilla española, pulpo a la gallega y cava.",
    mustTry: ["Tabla Degustación Jamón Ibérico", "Croquetas de Jamón", "Bocata de Bellota", "Huevos Rotos con Ibérico", "Sangría de Cava"],
    vibe: "Perfecto para compartir una tabla española con dos copas de vino o sangría en terraza.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Alejandra P.", rating: 4.8, text: "Las croquetas de jamón ibérico y la tabla degustación con pan con tomate son un viaje directo a Barcelona." }
    ]
  },
  {
    id: "margo",
    name: "Margó",
    cuisine: "Cocina Mediterránea, Carnes y Autor",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$17.000 - $25.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@margo_cl",
    socialHighlight: "Terrazas luminosas y decoración elegante con una carta versátil que va desde tártaros y pastas hasta cortes a las brasas.",
    description: "Restaurante de cocina de autor y espíritu casero sofisticado. Ofrece entradas para compartir, risottos, pescados grillados, carnes premium y pastelería propia.",
    mustTry: ["Filete Margó con Risotto de Setas", "Tártaro de Salmón y Palta", "Gnocchi Gratinados", "Torta Caluga"],
    vibe: "Uno de los espacios más acogedores y estéticos para una cena o almuerzo tranquilo en pareja.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Consuelo R.", rating: 4.7, text: "La decoración es preciosa y todos los platos llegan con una presentación impecable. Muy recomendado." }
    ]
  },
  {
    id: "udon",
    name: "UDON Asian Food",
    cuisine: "Noodles Artesanales, Ramen y Izakaya",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $20.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@udon_chile",
    socialHighlight: "Cadena líder en fideos asiáticos hechos a diario: udon gruesos salteados al wok, ramen y gyozas crujientes.",
    description: "Especialistas en gastronomía asiática inspirada en las tabernas japonesas de noodles. Cuentan con fideos Udon, Soba y Ramen preparados al momento con ingredientes frescos.",
    mustTry: ["Corral Chicken Yaki Udon", "Tantanmen Ramen", "Gyozas de Cerdo y Cebollín", "Takoyaki", "Mochi deTé Verde"],
    vibe: "Moderno, ágil y sabroso para fanáticos de la comida japonesa y asiática caliente.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Nicolás D.", rating: 4.8, text: "La textura de los fideos udon salteados no tiene comparación, y las gyozas vienen con costra crocante." }
    ]
  },
  {
    id: "la-perla-del-pacifico",
    name: "La Perla del Pacífico",
    cuisine: "Marisquería, Pescados y Sabores del Mar",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $27.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.6,
    socialHandle: "@laperladelpacifico.cl",
    socialHighlight: "Cocina marina chilena e internacional en QINTO con ostiones parmesanos, ceviches, congrio y locos.",
    description: "Restaurante especializado en productos frescos de las costas del Pacífico: machas a la parmesana, jardín de mariscos, caldillos reconfortantes y pescados a la plancha.",
    mustTry: ["Machas a la Parmesana", "Congrio Frito o Grillado", "Chupe de Jaiba Gratinado", "Ceviche del Pacífico"],
    vibe: "Excelente alternativa para disfrutar mariscos frescos y vino blanco helado.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Hernán L.", rating: 4.6, text: "El chupe de jaiba llega hirviendo en paila de greda y las machas estaban súper tiernas." }
    ]
  },
  {
    id: "frida-kahlo",
    name: "Frida Kahlo",
    cuisine: "Cocina Mexicana de Autor y Coctelería",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$15.000 - $23.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@fridakahlorestaurant",
    socialHighlight: "Ambientación mexicana llena de arte y color con guacamole preparado en molcajete, tacos de birria y margaritas de autor.",
    description: "Restaurante y bar temático mexicano que combina recetas tradicionales como cochinita pibil, tacos al pastor, enchiladas y quesadillas con una barra festiva de tequilas y mezcales.",
    mustTry: ["Tacos de Birria con Consomé", "Guacamole en Molcajete", "Fajitas Frida", "Margarita de Maracuyá Merkén"],
    vibe: "Colorido, alegre y con buena música para una cita entretenida con tragos.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Camila B.", rating: 4.6, text: "Hermosa decoración en el quinto piso del Costanera, los tacos de birria y los margaritas son 10/10." }
    ]
  },
  {
    id: "luna-bar",
    name: "Luna Bar (QINTO)",
    cuisine: "Coctelería de Autor, Tapas y Picoteo",
    category: "restaurante",
    mealTypes: ["cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$15.000 - $24.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.6,
    googleRating: 4.7,
    socialHandle: "@lunabar.cl",
    socialHighlight: "La gran barra central del quinto piso de Cenco Costanera para tomar cócteles de autor y picotear de noche.",
    description: "Espacio nocturno y barra de mixología contemporánea ubicada en QINTO, pensada para compartir tapas gourmet, sliders, tiraditos y cócteles creativos con música.",
    mustTry: ["Cócteles de Autor Luna", "Sliders de Wagyu", "Tiradito Cítrico", "Papas Trufadas"],
    vibe: "Onda nocturna sofisticada para ir por unos tragos en pareja.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Sebastián V.", rating: 4.7, text: "Gran ambiente de noche en QINTO, la barra es preciosa y la coctelería muy bien lograda." }
    ]
  },
  {
    id: "barra-chalaca",
    name: "Barra Chalaca",
    cuisine: "Peruana y Cebichería Callejera",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $24.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@barrachalacachile",
    socialHighlight: "Viral en TikTok e Instagram por su Ceviche Carretillero con calamares crujientes y su Pisco Sour Catedral.",
    description: "Cebichería callejera peruana creada por el chef Gastón Acurio. Porciones generosas, leche de tigre potente, causas, chaufas marinos y ambiente festivo de puerto.",
    mustTry: ["Ceviche Chalaco", "Chaufa Aeropuerto", "Leche de Tigre", "Sour Catedral"],
    vibe: "Ideal para una cita alegre con piscos sour y platos para picar al centro.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-vespucio", zone: "Mercado del 14" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Camila V.", rating: 5, text: "El ceviche llega súper fresco y la porción alcanza perfecto para compartir si piden un chaufa aparte." },
      { source: "Google Maps", user: "Rodrigo M.", rating: 5, text: "Fuimos con mi polola el viernes en la tarde, los pisco sour 10/10 y la atención rapidísima." }
    ]
  },
  {
    id: "tanta",
    name: "Tanta",
    cuisine: "Peruana Casera y Autor",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $26.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@tantachile",
    socialHighlight: "Top #1 en favoritos familiares y citas por su Lomo Saltado, Ají de Gallina y vitrina de postres gigantes.",
    description: "Restaurante peruano de Gastón Acurio que celebra la gastronomía casera limeña con toques modernos, terraza acogedora, coctelería de autor y repostería tentadora.",
    mustTry: ["Lomo Saltado Tradicional", "Ají de Gallina", "Piqueo Tanta", "Tres Leches de Lúcuma"],
    vibe: "Cita segura: elegante pero relajado, platos abundantes y postres increíbles.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Mirador Florida" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Valentina S.", rating: 4.9, text: "El ají de gallina y los tequeños con salsa de palta son de otro planeta. Siempre llega calentito." },
      { source: "Google Maps", user: "Felipe A.", rating: 4.7, text: "Nuestro lugar favorito de aniversario. Pedimos el Piqueo Criollo para los dos y quedamos felices." }
    ]
  },
  {
    id: "madame-tusan",
    name: "Madame Tusan",
    cuisine: "Chifa Peruano-Chino y Dim Sum",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $27.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@madametusancl",
    socialHighlight: "El templo de la cocina Chifa en el Boulevard del Parque Arauco: pato asado, chaufas al wok y baos artesanales.",
    description: "Propuesta de fusión chino-peruana creada por Gastón Acurio. Salón imponente con dragón rojo, especializado en arroces chaufa, tallarines saltados, carnes al wok y dim sum.",
    mustTry: ["Arroz Chaufa Char Siu", "Wantanes Rellenos Madame Tusan", "Pollo Tipakay", "Aeropuerto Tusan"],
    vibe: "Ideal para pedir tres platos al centro y compartir distintos sabores dulces y salados.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Bárbara H.", rating: 4.7, text: "Los wantanes y el chaufa de cerdo asado son adictivos.Las porciones son pensadas para compartir." }
    ]
  },
  {
    id: "tony-romas",
    name: "Tony Roma's",
    cuisine: "Costillares Baby Back Ribs y Grill Americano",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $26.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@tonyromaschile",
    socialHighlight: "Clásico del Boulevard de Parque Arauco famoso mundialmente por sus costillas de cerdo bañadas en salsa BBQ original.",
    description: "Restaurante estadounidense especialista en Baby Back Ribs tiernas cocinadas a fuego lento, su icónica hogaza de aros de cebolla (Onion Loaf), carnes y cócteles.",
    mustTry: ["The Original Baby Back Ribs", "Onion Loaf con Salsa BBQ", "Filete con Camarones Grillados", "Skillet Cookie Sundae"],
    vibe: "Tradicional y sabroso en pleno Boulevard para amantes de las costillas BBQ.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Ricardo S.", rating: 4.7, text: "La carne de las costillas se despega sola del hueso y el pan de aros de cebolla es único." }
    ]
  },
  {
    id: "trattoria-rita",
    name: "Trattoria Rita",
    cuisine: "Cocina Italiana, Pizzas Napolitanas y Pastas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $24.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@ritatrattoria",
    socialHighlight: "Terrazas de inspiración italiana con pastas hechas en casa, pizzas al horno de piedra y spritz.",
    description: "Trattoria moderna que rinde tributo a las recetas familiares de Italia con ingredientes frescos: burratas, carpaccios, pastas artesanales, risottos y tiramisú.",
    mustTry: ["Fettuccine Tartufati", "Pizza Burrata y Crudo", "Lasagna della Nonna", "Tiramisú della Casa"],
    vibe: "Ambiente cálido y romántico para una velada italiana en el Boulevard o terraza.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Josefina T.", rating: 4.7, text: "La pasta con salsa de trufa y champiñones estaba increíble, muy bonita terraza." }
    ]
  },
  {
    id: "la-panera-rosa",
    name: "La Panera Rosa",
    cuisine: "Brunch Todo el Día, Waffles, Crepes y Bistró",
    category: "dulce",
    mealTypes: ["almuerzo", "cena", "dulce", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $18.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@lapanerarosacl",
    socialHighlight: "Estética 100% rosada muy fotografiada en Instagram, con carta de brunch todo el día, tostadas francesas y tortas altas.",
    description: "Bistró y salón de té de origen argentino con decoración íntegramente rosada. Ofrece desayunos y brunch a cualquier hora, huevos benedictinos, sándwiches, pastas y pastelería.",
    mustTry: ["Brunch Rosa para Dos", "Waffle con Dulce de Leche y Frutillas", "Tostón de Palta y Huevo Pochado", "Chocotorta"],
    vibe: "Súper fotogénico y dulce para ir a tomar once o brunch en pareja.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Instagram", user: "@brunchsantiago", rating: 4.6, text: "El lugar es soñado para fotos y las porciones de tortas y waffles son enormes." }
    ]
  },
  {
    id: "pf-changs",
    name: "P.F. Chang's",
    cuisine: "Fusión Asiática y Wok Bistró",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$$",
    avgPriceCLP: "$22.000 - $32.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@pfchangschile",
    socialHighlight: "El Dynamite Shrimp y los Lettuce Wraps son los platos más pedidos en citas nocturnas.",
    description: "Cocina bistró asiática preparada al wok a alta temperatura. Iluminación cálida e íntima, coctelería exótica de autor y platos pensados para compartir en pareja.",
    mustTry: ["Dynamite Shrimp", "Chang's Lettuce Wraps", "Mongolian Beef", "Great Wall of Chocolate"],
    vibe: "Ambiente nocturno sofisticado, luces bajas y tragos espectaculares para una cita especial.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Martín L.", rating: 4.8, text: "El Mongolian Beef y el arroz frito rinden muchísimo. Los camarones dinamita son adictivos." },
      { source: "Google Maps", user: "Daniela R.", rating: 4.7, text: "La iluminación y la terraza climatizada son perfectas para ir en pareja. La muralla de chocolate es gigante." }
    ]
  },
  {
    id: "uncle-fletch",
    name: "Uncle Fletch",
    cuisine: "Hamburguesas Artesanales y Cerveza",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$12.500 - $17.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@unclefletchburger",
    socialHighlight: "Pioneros de las hamburguesas gourmet en Chile con recetas inspiradas en el creador original de la hamburguesa en Texas.",
    description: "Hamburguesería artesanal con carnes molidas a diario, tocino ahumado, quesos madurados, aros de cebolla en batido de cerveza y papas rústicas.",
    mustTry: ["Original Fletch Burger", "Blue Cheese & Bacon Burger", "Onion Rings al Batido de Cerveza", "Papas Fletch"],
    vibe: "Estilo industrial relajado en el Bazar Gourmet de Parque Arauco.",
    locations: [
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" },
      { mallId: "plaza-vespucio", zone: "Mercado del 14" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Pedro M.", rating: 4.7, text: "Sabor a carne de verdad y los aros de cebolla son de los mejores de Santiago." }
    ]
  },
  {
    id: "pho-banh-mi",
    name: "Phò & Bánh Mì (Vietnam Discovery)",
    cuisine: "Comida Callejera Vietnamita",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.7,
    socialHandle: "@phobanhmi.cl",
    socialHighlight: "De los creadores de Vietnam Discovery: sopas Phò aromáticas y baguettes vietnamitas crujientes en Bazar Gourmet.",
    description: "Propuesta de street food vietnamita auténtica con caldos cocinados por horas con especias orientales, rollitos frescos de papel de arroz y sándwiches Bánh Mì.",
    mustTry: ["Sopa Phò Bo de Res", "Bánh Mì de Cerdo Lemongrass", "Nem (Rollitos Vietnamitas Fritos)", "Café Helado Vietnamita"],
    vibe: "Ideal para probar sabores exóticos, frescos y reconfortantes en el Piso Diseño.",
    locations: [
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Laura G.", rating: 4.8, text: "El caldo de la sopa Phò es maravilloso y el café vietnamita con leche condensada es imperdible." }
    ]
  },
  {
    id: "lulupok",
    name: "Lulupok",
    cuisine: "Poke Bowls Hawaianos y Nikkei",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$10.500 - $14.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@lulupokcl",
    socialHighlight: "Tazones de poke súper frescos con salmón, atún, camarón furai, palta y salsas acevichadas o trufadas.",
    description: "Especialistas en Poke Bowls personalizados o de autor con base de arroz de sushi, quinoa o mix verde, proteínas marinas frescas y toppings crujientes.",
    mustTry: ["Poke Acevichado Salmón", "Poke Crispy Furai", "Gyozas al Vapor"],
    vibe: "Fresco, liviano y sabroso en el Bazar Gourmet.",
    locations: [
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Antonia V.", rating: 4.8, text: "Ingredientes siempre frescos, harta palta y las salsas son exquisitas." }
    ]
  },
  {
    id: "el-bodegon-de-lima",
    name: "El Bodegón de Lima",
    cuisine: "Taberna Criolla Peruana",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$15.000 - $22.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@santiagoopengourmet",
    socialHighlight: "Parte del polo Santiago Open Gourmet junto a Parque Arauco con platos clásicos de las tabernas limeñas.",
    description: "Cocina criolla peruana de espíritu generoso: tríos marinos, seco de cordero, tallarines a la huancaína con lomo saltado y coctelería tradicional.",
    mustTry: ["Fetuccini a la Huancaína con Lomo", "Trío Marino", "Suspiro de Limeña"],
    vibe: "Sabores intensos y porciones abundantes en Santiago Open Gourmet.",
    locations: [
      { mallId: "parque-arauco", zone: "Santiago Open Gourmet" }
    ],
    reviews: [
      { source: "Google Maps", user: "Marcelo C.", rating: 4.6, text: "Excelente opción en el sector Open Gourmet, menos fila y atención muy cordial." }
    ]
  },
  {
    id: "siete-cortes",
    name: "Siete Cortes",
    cuisine: "Parrilla y Carnes Premium",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $26.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.6,
    socialHandle: "@sietecortescl",
    socialHighlight: "Especialistas en siete cortes seleccionados de vacuno a la parrilla en Santiago Open Gourmet.",
    description: "Propuesta parrillera enfocada en dominar los mejores cortes de carne asados al punto exacto, acompañados de papas suflé, vegetales grillados y vinos.",
    mustTry: ["Bife Chorizo 350g", "Entraña a la Parrilla", "Provoleta Fundida"],
    vibe: "Ideal para un almuerzo o cena de carnes en terraza.",
    locations: [
      { mallId: "parque-arauco", zone: "Santiago Open Gourmet" }
    ],
    reviews: [
      { source: "Google Maps", user: "Rodrigo P.", rating: 4.6, text: "El bife chorizo salió exactamente a punto como lo pedí." }
    ]
  },
  {
    id: "ambrosia-bistro",
    name: "Ambrosía Bistró",
    cuisine: "Bistró Contemporáneo de Autor",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$$",
    avgPriceCLP: "$25.000 - $38.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.8,
    socialHandle: "@ambrosiabistro",
    socialHighlight: "Liderado por la chef Carolina Bazán (elegida Mejor Chef de Latinoamérica), ahora en el Piso 4 del MUT.",
    description: "Cocina de mercado fresca, creativa y desenfadada con sello de alta gastronomía. Carta estacional pensada para compartir, vinos naturales y coctelería de primer nivel.",
    mustTry: ["Ramen de la China", "Tártaro de Filete con Papas Fritas", "Pesca del Día", "Profiteroles con Helado"],
    vibe: "La cita gastronómica más premiada y sofisticada en La Terraza del MUT.",
    locations: [
      { mallId: "mut", zone: "Piso 4 (La Terraza)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Isidora M.", rating: 4.9, text: "Cada plato es una explosión de sabor. Sentarse en la barra viendo la cocina abierta es un gran panorama." }
    ]
  },
  {
    id: "toni-lautaro",
    name: "Toni Lautaro",
    cuisine: "Pizzería de Masa Madre y Antipasti",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $24.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.8,
    socialHandle: "@tonilautaro",
    socialHighlight: "Elegida en redes como una de las mejores pizzas de larga fermentación y milanesas de Santiago.",
    description: "Pizzería italo-chilena con masa de fermentación lenta, ingredientes de pequeños productores locales, milanesas crujientes, vermut y platillos mediterráneos ('AntoniPasti').",
    mustTry: ["Pizza Stracciatella y Mortadela Pistacho", "Milanesa a la Napolitana", "Tiramisú Clásico", "Vermut de la Casa"],
    vibe: "Súper ondero y moderno en la terraza del cuarto piso del MUT; ideal para compartir pizza y vermut.",
    locations: [
      { mallId: "mut", zone: "Piso 4 (La Terraza)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Ignacio P.", rating: 5, text: "La masa tiene un borde aireado perfecto y la pizza con burrata y pistacho es insuperable." }
    ]
  },
  {
    id: "les-dix-vins",
    name: "Les Dix Vins",
    cuisine: "Wine Bar Francés, Quesos y Charcutería",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $25.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.7,
    googleRating: 4.8,
    socialHandle: "@lesdixvins.cl",
    socialHighlight: "Bar de vinos franceses y chilenos por copa junto a una vitrina de quesos europeos importados en El Jardín del MUT.",
    description: "Rincón francés en el Piso 3 del MUT donde puedes armar tu tabla de quesos madurados (Comté, Brie trufado, Roquefort) y charcutería artesanal maridada con vinos por copa.",
    mustTry: ["Tabla de 5 Quesos Franceses y Charcutería", "Camembert Horneado con Miel", "Boeuf Bourguignon", "Copa de Pinot Noir"],
    vibe: "Cita íntima y europea para conversar con una tabla de quesos y buen vino.",
    locations: [
      { mallId: "mut", zone: "Piso 3 (El Jardín)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Tomás E.", rating: 4.9, text: "Te asesoran increíble para elegir los quesos y el vino. El brie trufado es de otro mundo." }
    ]
  },
  {
    id: "casa-asa",
    name: "Casa Asa",
    cuisine: "Fuegos, Brasas y Platos para Compartir",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $27.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.6,
    googleRating: 4.7,
    socialHandle: "@casa.asa.mut",
    socialHighlight: "En pleno jardín del Piso 3 del MUT, famoso por sus vegetales y cortes al fuego para poner al centro.",
    description: "Cocina honesta centrada en el fuego y las brasas. Carnes seleccionadas, pescados y vegetales asados con acompañamientos creativos rodeados de vegetación natural.",
    mustTry: ["Entraña a las Brasas", "Coliflor Asada con Tahini", "Papas Nativas Crujientes", "Vinos de Autor"],
    vibe: "Cita rodeada de plantas y luz natural en El Jardín del MUT.",
    locations: [
      { mallId: "mut", zone: "Piso 3 (El Jardín)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Francisca G.", rating: 4.8, text: "Nos encantó pedir tres platillos para compartir al centro. El ambiente en el jardín es precioso." }
    ]
  },
  {
    id: "meli-melo",
    name: "Meli Meló Bistró",
    cuisine: "Bistró Francés, Brunch y Café",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $22.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@melimelo.mut",
    socialHighlight: "Favorito para brunch en pareja, huevos benedictinos, croque madame y coctelería de tarde.",
    description: "Bistró de formato all-day con inspiración mediterránea y técnica francesa. Desde café de especialidad y bollería en la mañana hasta platillos y vinos por la noche.",
    mustTry: ["Croque Madame Trufado", "Huevos Benedictinos", "Tartar de Res", "Pain au Chocolat"],
    vibe: "Romántico estilo bistró parisino en medio del jardín interior.",
    locations: [
      { mallId: "mut", zone: "Piso 3 (El Jardín)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Antonia M.", rating: 4.7, text: "Fuimos a tomar brunch el domingo, el café y los huevos pochados estaban exquisitos." }
    ]
  },
  {
    id: "diablo-vino-y-fuego",
    name: "Diablo Vino y Fuego",
    cuisine: "Carnes al Fuego y Wine Bar",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$$",
    avgPriceCLP: "$22.000 - $32.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.7,
    googleRating: 4.8,
    socialHandle: "@diablovinoyfuego",
    socialHighlight: "Vistas en el Piso 5 del MUT con maridajes de vinos y cortes a las brasas.",
    description: "Propuesta gastronómica en la terraza superior del MUT enfocada en preparaciones al fuego y una cava curada de vinos y coctelería de autor.",
    mustTry: ["Lomo Vetado al Fuego", "Tabla de Quesos y Charcutería", "Vuelo de Vinos", "Volcán de Dulce de Leche"],
    vibe: "Ideal para una cita de noche con copa de vino en la terraza.",
    locations: [
      { mallId: "mut", zone: "Piso 5 (El Puente)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Cristián B.", rating: 4.8, text: "Excelente atención del sommelier, nos recomendó un ensamblaje perfecto para la carne." }
    ]
  },
  {
    id: "antigua-fuente",
    name: "Antigua Fuente (Ex Fuente Alemana)",
    cuisine: "Sandwichería Patrimonial Chilena",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $15.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.7,
    socialHandle: "@antiguafuente",
    socialHighlight: "La legendaria sanguchería de Plaza Italia ahora en el MUT con sus lomitos y rumanos preparados en la plancha a la vista.",
    description: "Uno de los mayores templos del sándwich chileno desde 1954. Lomitos de cerdo macerados en su propio caldo, churrascos, rumanos y mayonesa casera.",
    mustTry: ["Lomito Italiano Tradicional", "Rumano Completo", "Churrasco Chacarero", "Schop Helado"],
    vibe: "Para sentarse en la barra como en la clásica fuente de soda y comer un lomito histórico.",
    locations: [
      { mallId: "mut", zone: "Nivel -3 (La Estación)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Álvaro G.", rating: 4.9, text: "Exactamente el mismo sabor legendario de Plaza Baquedano pero con la comodidad del MUT." }
    ]
  },
  {
    id: "sushilab-mut",
    name: "Sushilab",
    cuisine: "Sushi de Autor y Barra Japonesa",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $21.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@sushilab_cl",
    socialHighlight: "Propuesta de sushi contemporáneo, nigiris flameados y handrolls recién armados en el Nivel -2 del MUT.",
    description: "Laboratorio de cocina japonesa moderna enfocado en cortes de pescado fresco, nigiris de autor, handrolls en alga nori crujiente y rolls con toques trufados y cítricos.",
    mustTry: ["Set de Handrolls", "Nigiris Flameados con Trufa", "Roll Acevichado Nikkei"],
    vibe: "Barra japonesa dinámica e ideal para amantes del buen sushi en el mercado.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Valentina D.", rating: 4.7, text: "El alga de los handrolls está súper crujiente y el salmón fresquísimo." }
    ]
  },
  {
    id: "je-suis-raclette",
    name: "Je Suis Raclette",
    cuisine: "Queso Raclette Fundido y Papas Rústicas",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$10.500 - $14.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.7,
    googleRating: 4.8,
    socialHandle: "@jesuisraclette",
    socialHighlight: "Famoso en redes por raspar frente a ti una cascada de queso suizo Raclette derretido sobre papas y jamón serrano.",
    description: "Especialidad alpina franco-suiza en el Nivel -2 del MUT: ruedas de queso Raclette fundidas al calor y servidas al momento sobre papas nativas, charcutería, pepinillos y sándwiches.",
    mustTry: ["Plato Raclette con Jamón Serrano y Papas", "Sándwich Raclette Fundido", "Raclette con Champiñones Salteados"],
    vibe: "Imposible resistirse a ver cómo cae la capa de queso derretido caliente.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "TikTok", user: "@quesoloverscl", rating: 4.9, text: "Ver cómo raspan el queso derretido encima de las papas y el prosciutto es hipnótico y delicioso." }
    ]
  },
  {
    id: "bibimpop",
    name: "Bibimpop (MUT)",
    cuisine: "Street Food Coreana, Bibimbap y Corn Dogs",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$9.500 - $13.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.7,
    socialHandle: "@bibimpop.cl",
    socialHighlight: "Comida callejera coreana en el Nivel -2 del MUT: Bibimbap, Tteokbokki y pollo frito coreano.",
    description: "Cocinería coreana moderna que ofrece los platos más populares de Seúl: tazones de arroz Bibimbap con vegetales y carne, pastelillos de arroz picantes y pollo glaseado.",
    mustTry: ["Bibimbap de Bulgogi", "Korean Fried Chicken Dulce Picante", "Tteokbokki con Queso", "Kimchi Casero"],
    vibe: "Perfecto para parejas fanáticas de la cultura y gastronomía coreana.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Daniela K.", rating: 4.7, text: "El pollo coreano glaseado y el bibimbap son súper contundentes y sabrosos." }
    ]
  },
  {
    id: "loca-pasta",
    name: "Loca Pasta (MUT)",
    cuisine: "Pastas Frescas Artesanales al Minuto",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$9.500 - $13.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.7,
    socialHandle: "@locapasta.cl",
    socialHighlight: "Eliges tu pasta fresca amasada en el local y tu salsa favorita lista en pocos minutos.",
    description: "Barra de pastas artesanales en el mercado del MUT donde puedes combinar fettuccine, rigatoni, gnocchi o ravioles recién hechos con salsas pomodoro, pesto, trufa o boloñesa.",
    mustTry: ["Rigatoni al Pesto con Stracciatella", "Gnocchi Cuatro Quesos", "Fettuccine Boloñesa Lenta"],
    vibe: "Pasta fresca de calidad restaurante pero en formato rápido de mercado.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Franco B.", rating: 4.7, text: "La pasta sale al dente perfecto y ponerle stracciatella arriba cambia todo." }
    ]
  },
  {
    id: "crepes-and-waffles",
    name: "Crepes & Waffles",
    cuisine: "Crepes Salados, Waffles y Heladería Artesanal",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce"],
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $17.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.7,
    socialHandle: "@crepesywaffleschile",
    socialHighlight: "El clásico infalible de las parejas: pitas, crepes rellenos y copas de helado artesanal a precios súper justos.",
    description: "Famosa cadena enfocada en crepes salados gourmet (pollo, champiñones, camarones al curry, lomo), panecillos pitas, ensaladas y una inmensa carta de waffles y helados.",
    mustTry: ["Crepe Pollo, Queso y Champiñón", "Sombrero Vueltiao", "Waffle de Nutella y Plátano", "Copa Tentación"],
    vibe: "Cálido, acogedor y con la mejor relación precio-calidad para comer rico y terminar con un postre soñado.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Javiera P.", rating: 4.9, text: "El crepe de camarones al curry y el waffle con helado de vainilla old fashioned nunca fallan." },
      { source: "Google Maps", user: "Sebastián T.", rating: 4.8, text: "Siempre venimos con mi pareja porque comes plato de fondo más postre increíble sin gastar una fortuna." }
    ]
  },
  {
    id: "muu-steak",
    name: "Muu Steak & Grill",
    cuisine: "Parrilla y Carnes Premium",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$19.000 - $28.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@muusteakchile",
    socialHighlight: "Especialistas en cortes Angus certificados, provoletas derretidas y tablas parrilleras para dos.",
    description: "Steakhouse moderno con cortes de carne de raza Angus a la parrilla, hamburguesas artesanales, pastas rellenas y coctelería clásica en terraza.",
    mustTry: ["Entraña Angus", "Provoleta Muu al Orégano", "Parrillada para Dos", "Cheesecake de Maracuyá"],
    vibe: "Perfecto para parejas amantes de un buen corte de carne a punto y una copa de tinto.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-vespucio", zone: "Mercado del 14" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Gonzalo H.", rating: 4.6, text: "Pedimos la tabla para compartir entre dos y sobró comida. La provoleta de entrada es obligatoria." }
    ]
  },
  {
    id: "santa-brasa",
    name: "Santa Brasa",
    cuisine: "Carnes a las Brasas y Parrilla",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$$",
    avgPriceCLP: "$21.000 - $30.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@santabrasachile",
    socialHighlight: "Carnes maduradas a las brasas, empanadas de carne cortada a cuchillo y ambiente elegante.",
    description: "Parrilla gourmet que selecciona cortes nacionales e importados cocinados a las brasas de carbón y leña, acompañados de una extensa carta de vinos chilenos.",
    mustTry: ["Ojo de Bife", "Empanadas Cortadas a Cuchillo", "Espinacas a la Crema", "Panqueque Celestino"],
    vibe: "Cena romántica de corte clásico con excelente servicio a la mesa.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Eduardo K.", rating: 4.7, text: "Excelente atención y las carnes tienen ese sabor ahumado real de parrilla. Muy recomendado para ir en pareja." }
    ]
  },
  {
    id: "la-cabrera-al-paso",
    name: "La Cabrera Al Paso",
    cuisine: "Parrilla Argentina y Sándwiches de Carne",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $24.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@lacabrerachile",
    socialHighlight: "El formato casual de la famosa parrilla de Palermo (Buenos Aires) con cortes argentinos y guarniciones.",
    description: "Versión ágil de la reconocida casa de carnes argentina La Cabrera, ofreciendo bife de chorizo, ojo de bife, choripanes gourmet, provoletas y papas fritas con chimichurri.",
    mustTry: ["Bife de Chorizo con Guarniciones", "Choripán La Cabrera", "Provoleta Grillada", "Flan Casero con Dulce de Leche"],
    vibe: "Toda la sazón de una parrilla de Buenos Aires en terraza de mall.",
    locations: [
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Mirador Florida" }
    ],
    reviews: [
      { source: "Google Maps", user: "Luciano R.", rating: 4.6, text: "Los cortes mantienen la calidad de La Cabrera pero en un formato más rápido y accesible." }
    ]
  },
  {
    id: "la-argentina-pizzeria",
    name: "La Argentina Pizzería",
    cuisine: "Pizzas al Molde Estilo Buenos Aires y Fugazzeta",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@laargentinapizzeria",
    socialHighlight: "Famosa por su Fugazzeta Rellena desbordante de queso mozzarella, fainá y empanadas argentinas.",
    description: "Pizzería inspirada en las clásicas pizzerías de Avenida Corrientes en Buenos Aires: masa esponjosa al molde, abundante muzzarella hasta los bordes, empanadas y vermut.",
    mustTry: ["Fugazzeta Rellena de Queso y Jamón", "Pizza Napolitana al Molde", "Empanadas de Carne Cortada a Cuchillo", "Porción de Fainá"],
    vibe: "Ideal para fanáticos del queso derretido en cantidades industriales.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Mercado del 14" },
      { mallId: "cenco-florida", zone: "Mirador Florida" }
    ],
    reviews: [
      { source: "TikTok", user: "@datoslaflorida", rating: 4.8, text: "La cantidad de queso que trae la Fugazzeta Rellena es impresionante, con una pizza comen dos o tres." }
    ]
  },
  {
    id: "kairos-garden",
    name: "Kairos Garden / Bar",
    cuisine: "Gastrobar, Cerveza Artesanal, Burgers y Sushi",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $18.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@kairosgarden",
    socialHighlight: "Uno de los bares más animados del Mercado del 14 en Plaza Vespucio con schops artesanales y tablas.",
    description: "Restobar con amplia terraza en el Mercado del 14, carta variada de hamburguesas, sushi rolls, chorrillanas, ceviches, cervezas artesanales y coctelería de autor.",
    mustTry: ["Tabla Kairos para Compartir", "Rolls Acevichados", "Burger de la Casa", "Mojito Maracuyá"],
    vibe: "Ambiente joven, música y terraza perfecta para ir de tarde-noche.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Mercado del 14" }
    ],
    reviews: [
      { source: "Google Maps", user: "Nicolás A.", rating: 4.6, text: "Muy buen ambiente en el Mercado del 14, los tragos son ricos y las tablas contundentes." }
    ]
  },
  {
    id: "chinga-tu-taco",
    name: "Chinga Tu Taco",
    cuisine: "Taquería Mexicana Auténtica y Margaritas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@chingatutacocl",
    socialHighlight: "Tacos callejeros mexicanos en tortillas de maíz hechas a mano, birria, pastor y salsas picantes.",
    description: "Taquería de inspiración mexicana callejera donde destacan los tacos al pastor con piña asada, suadero, carnitas, quesabirrias con consomé y nachos con guacamole.",
    mustTry: ["Quesabirrias con Consomé", "Tacos al Pastor", "Totopos con Guacamole Fresco", "Margarita Frozen"],
    vibe: "Relajado, sabroso y con toda la onda mexicana en el Mercado del 14.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Mercado del 14" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Fabiola R.", rating: 4.8, text: "Las quesabirrias untadas en el caldito son las mejores de La Florida." }
    ]
  },
  {
    id: "bar-buena-barra",
    name: "Bar Buena Barra",
    cuisine: "Gastrobar, Carnes, Burgers y Coctelería",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$13.000 - $19.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@barbuenabarra",
    socialHighlight: "Terraza cervecera y coctelería en la Azotea Urbana de Mallplaza Egaña con música y picoteos.",
    description: "Bar y restaurante enfocado en la buena mesa casual: chorrillanas, hamburguesas al grill, alitas BBQ, quesadillas, líneas de schop y cócteles de autor.",
    mustTry: ["Chorrillana Buena Barra", "Smash Burger Doble", "Tabla de Picoteo Caliente", "Gin Tonic Botánico"],
    vibe: "Ideal para ver el atardecer desde el cuarto piso de Plaza Egaña con unos tragos.",
    locations: [
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Felipe M.", rating: 4.6, text: "Buena terraza en el cuarto piso, atienden rápido y las promociones de tragos convienen mucho." }
    ]
  },
  {
    id: "huentelauquen",
    name: "Huentelauquen (Azotea Egaña)",
    cuisine: "Empanadas de Queso Históricas y Pizzas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$10.000 - $15.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@huentelauquenchile",
    socialHighlight: "Las famosas empanadas fritas rellenas con el auténtico queso de Huentelauquen (Cuarta Región) y jugo de papaya.",
    description: "Restaurante y empanadería tradicional famosa en todo Chile por su masa delgada y crujiente rellena de abundante queso mantecoso de Huentelauquen, además de pizzas y schops.",
    mustTry: ["Empanada de Queso Huentelauquen", "Empanada Queso Camarón", "Jugo Natural de Papaya", "Pizza Huentelauquen"],
    vibe: "Para darse un gusto con las empanadas de queso más famosas de la Ruta 5 sin salir de Santiago.",
    locations: [
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Carolina V.", rating: 4.8, text: "El queso Huentelauquen derretido con un jugo de papaya helado es insuperable." }
    ]
  },
  {
    id: "chilis",
    name: "Chili's Grill & Bar",
    cuisine: "Tex-Mex, Burgers y Ribs",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $21.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@chilischile",
    socialHighlight: "Famoso por su Triple Dipper viral en TikTok, sus Baby Back Ribs y los Presidente Margarita.",
    description: "Restaurante casual estilo Tex-Mex estadounidense famoso por sus costillares bañados en salsa BBQ, fajitas humeantes, hamburguesas gigantes y margaritas.",
    mustTry: ["Triple Dipper (Mozzarella Sticks, Boneless, Rolls)", "Baby Back Ribs", "Molten Chocolate Cake", "Presidente Margarita"],
    vibe: "Súper entretenido y relajado para compartir picoteos gigantes y tomar margaritas.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" }
    ],
    reviews: [
      { source: "TikTok", user: "@antojos.cl", rating: 4.9, text: "El Triple Dipper con los sticks de mozzarella gigantes es lo mejor que pueden pedir para compartir." },
      { source: "Uber Eats", user: "Nicolás F.", rating: 4.7, text: "Las costillitas se deshacen solas y el Molten Cake con helado es el cierre perfecto." }
    ]
  },
  {
    id: "johnny-rockets",
    name: "Johnny Rockets",
    cuisine: "Diner Americano, Burgers y Milkshakes",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce"],
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@johnnyrocketscl",
    socialHighlight: "Ambientación años 50 donde los meseros bailan, hamburguesas smash y los mejores milkshakes de Oreo.",
    description: "Clásico diner estadounidense de los años 50 con rockola, sillones rojos, hamburguesas jugosas hechas a la plancha, papas con cheddar y tocino, y malteadas espesas.",
    mustTry: ["Smoke House Burger", "Bacon Cheddar Fries", "Oreo Cookies & Cream Shake", "Onion Rings"],
    vibe: "Cita retro y divertida estilo película americana, ideal para compartir una malteada.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Matías C.", rating: 4.7, text: "El milkshake de Oreo con crema batida es insuperable y la Smoke House con aros de cebolla adentro es un 10." }
    ]
  },
  {
    id: "la-sanguchera-del-barrio",
    name: "La Sanguchera del Barrio",
    cuisine: "Sándwiches Gourmet y Picoteo Chileno",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@lasangucheradelbarrio",
    socialHighlight: "Sándwiches de mechada, plateada y pescado frito con schops bien helados.",
    description: "Propuesta de sanguchería chilena contemporánea con recetas de barrio llevadas a nivel gourmet: plateadas al horno, mechadas caseras, chorrillanas y cervezas artesanales.",
    mustTry: ["El Mechada Nacional", "El Merluzo (Pescado Frito)", "Chorrillana del Barrio", "Borgoña / Schop Artesanal"],
    vibe: "Relajado y bien chileno para comer un sándwich contundente con papas rústicas.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Jorge D.", rating: 4.6, text: "El pan brioche aguanta todo el jugo de la mechada y las papas vienen con cáscara bien crujientes." }
    ]
  },
  {
    id: "el-hoyo",
    name: "El Hoyo (Mercado del 14)",
    cuisine: "Cocina Tradicional Chilena y Picada",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $18.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@elhoyochile",
    socialHighlight: "La histórica picada centenaria de Santiago ahora en el Mercado del 14 con sus terremotos y perniles.",
    description: "Versión moderna de la legendaria picada santiaguina fundada en 1912. Pernil, arrollado huaso, lengua, sánguches patrimoniales, prietas y el clásico Terremoto.",
    mustTry: ["Sánguche de Pernil Especial", "Pichanga Caliente", "Costillar al Horno", "Terremoto Tradicional"],
    vibe: "Para parejas que disfrutan la cocina criolla auténtica con una jarra de pipeño o terremoto.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Mercado del 14" }
    ],
    reviews: [
      { source: "Google Maps", user: "Patricio V.", rating: 4.6, text: "Increíble poder comer el pernil clásico de El Hoyo en una terraza bonita y segura en La Florida." }
    ]
  },
  {
    id: "barra-kunstmann",
    name: "Barra Kunstmann / Kneipe",
    cuisine: "Cervecería Artesanal, Crudos y Tablas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$13.000 - $19.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@kunstmannchile",
    socialHighlight: "Más de 15 variedades de schop valdiviano tirado en frío junto al famoso Crudo Valdiviano.",
    description: "Bar cervecero originario de Valdivia con líneas de schop artesanal experimental y clásico, acompañado de crudos alemanes, pizzas a la piedra, salchichas y tablas.",
    mustTry: ["Crudo Valdiviano", "Tabla Alemana", "Flight Degustación de 4 Cervezas", "Strudel de Manzana"],
    vibe: "El mejor plan cervecero en pareja para probar distintos estilos de cerveza y picotear.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Mercado del 14" },
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Catalina N.", rating: 4.7, text: "Pedimos la paleta de degustación de cervezas y el crudo valdiviano, todo un 10." }
    ]
  },
  {
    id: "chicken-love-you",
    name: "Chicken Love You",
    cuisine: "Sándwiches de Pollo Frito Gourmet",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$9.500 - $13.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@chickenloveyou.cl",
    socialHighlight: "Pollo frito ultra crujiente marinado por 24 horas con salsas caseras adictivas.",
    description: "Marca chilena especialista en sándwiches y tenders de pollo frito crispy en pan de papa artesanal, con combinaciones dulces, picantes y ahumadas.",
    mustTry: ["El Clasicón", "Korean Fried Chicken Burger", "Papas con Queso Fundido y Tocino", "Chicken Tenders"],
    vibe: "Casual, indulgente y perfecto para comer el mejor pollo crispy.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Mercado del 14" },
      { mallId: "parque-arauco", zone: "Santiago Open Gourmet" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Tomás R.", rating: 4.8, text: "El pollo suena cuando lo muerdes de lo crujiente que es. La salsa cheddar tocino es brutal." }
    ]
  },
  {
    id: "niu-sushi",
    name: "Niu Sushi",
    cuisine: "Sushi Nikkei, Rolls y Gohan",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $18.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@niusushichile",
    socialHighlight: "Uno de los sushis con mejor puntaje en Uber Eats Chile por sus rolls acevichados y tempuras.",
    description: "Especialistas en sushi californiano y fusión nikkei con amplia variedad de rolls sin arroz, tempuras calientes, gyozas, gohan y coctelería en salón.",
    mustTry: ["Acevichado Roll", "Tori Furai Roll", "Gyozas de Cerdo", "Gohan Especial Salmón Palta"],
    vibe: "Noche de sushi y cócteles en pareja con carta enorme para todos los gustos.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "cenco-florida", zone: "Mirador Florida" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Fernanda O.", rating: 4.9, text: "El Acevichado Roll y el Almond Roll son mis favoritos de la vida. Nunca decepciona." }
    ]
  },
  {
    id: "el-japones",
    name: "El Japonés",
    cuisine: "Izakaya, Ramen, Sushi y Coctelería",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $21.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@eljapones_cl",
    socialHighlight: "Neones japoneses, ramen humeante, baos esponjosos y rolls creativos a precios muy convenientes.",
    description: "Taberna japonesa moderna (Izakaya) con decoración de callejón de Tokio, carta de ramen artesanal, baos, sushi fusión, brochetas yakitori y cócteles de autor.",
    mustTry: ["Tonkotsu Ramen", "Bao de Cerdo Glaseado", "Roll El Japonés", "Cóctel Tokyo Mule"],
    vibe: "Estética japonesa con luces de neón, ideal para probar varios platillos al centro.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Santiago Open Gourmet" },
      { mallId: "cenco-florida", zone: "Mirador Florida" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Instagram", user: "@santiagosecreto", rating: 4.8, text: "El ambiente con cerezos y neones es hermoso para una cita, y los baos son una nube." }
    ]
  },
  {
    id: "fuente-chilena",
    name: "Fuente Chilena",
    cuisine: "Sandwichería Tradicional Gourmet",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@fuentechilena",
    socialHighlight: "Famosa por su mayonesa casera de receta secreta, lomitos en pan amasado y crudos.",
    description: "Homenaje a las fuentes de soda clásicas de Chile con ingredientes de primera calidad: lomitos de cerdo, churrascos en frica artesanal, lengua y schops helados.",
    mustTry: ["Lomito Italiano con Mayo Casera", "Chacarero en Frica", "Crudo Clásico", "Empanaditas de Queso"],
    vibe: "Para darse un gusto bien chileno con sánguches generosos y mayo casera.",
    locations: [
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" },
      { mallId: "cenco-florida", zone: "Mirador Florida" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Andrés C.", rating: 4.8, text: "El lomito italiano tiene una cantidad de palta y carne impresionante. Top 3 de Santiago." }
    ]
  },
  {
    id: "fuente-suiza",
    name: "Fuente Suiza",
    cuisine: "Fuente de Soda Histórica y Sánguches",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@fuentesuiza",
    socialHighlight: "Tradición ñuñoína desde 1954: empanadas de queso gigantes y churrascos legendarios.",
    description: "Sucursal de la mítica fuente de soda de Irarrázaval en la Azotea Urbana de Plaza Egaña, manteniendo intactas sus recetas de empanadas fritas de queso, crudos y churrascos.",
    mustTry: ["Empanada de Queso Frita", "Churrasco Suizo", "Pernil Palta Mayo", "Schop Kunstmann"],
    vibe: "Clásico absoluto del sector oriente con terraza al aire libre.",
    locations: [
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Rodrigo Z.", rating: 4.7, text: "Las empanadas de queso siguen siendo las mejores de Santiago, llenas de queso derretido." }
    ]
  },
  {
    id: "texas-ribs",
    name: "Texas Ribs",
    cuisine: "Costillares BBQ, Carnes y Tex-Mex",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$15.000 - $22.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@texasribschile",
    socialHighlight: "Costillares ahumados lentamente con salsa barbecue original y aros de cebolla.",
    description: "Steakhouse al estilo texano especializado en costillares de cerdo y vacuno bañados en BBQ, alitas picantes, hamburguesas al grill y jarras de cerveza.",
    mustTry: ["Full Rack Baby Back Ribs", "Texas Sampler Combo", "Pulled Pork Burger", "Brownie con Helado"],
    vibe: "Abundante y sabroso, ideal cuando ambos van con mucha hambre.",
    locations: [
      { mallId: "cenco-florida", zone: "Mirador Florida" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Claudio P.", rating: 4.6, text: "El combo para compartir trae costillas, alitas y papas suficientes para dos personas de buen comer." }
    ]
  },
  {
    id: "rosso-italiano",
    name: "Rosso Italiano / Vendetta",
    cuisine: "Pastas Frescas, Risottos y Pizzas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$15.000 - $22.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@rossoitaliano.cl",
    socialHighlight: "Pastas artesanales hechas en casa, fettuccine en rueda de queso y Aperol Spritz en terraza.",
    description: "Trattoria italiana contemporánea dedicada a las pastas rellenas hechas a mano, lasañas al horno de barro, pizzas de masa delgada crujiente y antipastos.",
    mustTry: ["Sorrentinos de Jamón y Mozzarella", "Fettuccine Frutti di Mare", "Pizza Prosciutto e Rucola", "Panna Cotta Frutos Rojos"],
    vibe: "Clásica cita romántica italiana con pastas y spritz.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Macarena J.", rating: 4.6, text: "Los ravioles de espinaca con salsa cuatro quesos son exquisitos y el pan focaccia de entrada llega calentito." }
    ]
  },
  {
    id: "juicy-lucy",
    name: "Juicy Lucy",
    cuisine: "Smash y Stuffed Burgers Artesanales",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@juicylucychile",
    socialHighlight: "Hamburguesas rellenas de queso fundido en el centro de la carne al estilo Minneapolis.",
    description: "Hamburguesería artesanal famosa por sus 'Juicy Lucy' rellenas de queso cheddar derretido por dentro de la carne, además de opciones smash y papas trufadas.",
    mustTry: ["Classic Juicy Lucy (Rellena de Queso)", "Truffle Mushroom Burger", "Papas Fritas con Parmesano y Trufa", "Cheesecake"],
    vibe: "Hamburguesas gourmet de primer nivel con buena música y cervezas.",
    locations: [
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Diego S.", rating: 4.7, text: "Cuando cortas la hamburguesa a la mitad y sale todo el queso derretido entiendes la fama que tienen." }
    ]
  },
  {
    id: "mamut",
    name: "Mamut Restaurant",
    cuisine: "Costillares, Burgers y Casual Bar",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.4,
    uberEatsRating: 4.5,
    googleRating: 4.4,
    socialHandle: "@mamutrestaurant",
    socialHighlight: "Promociones 2x1 en cócteles y tablas gigantes para compartir.",
    description: "Casual dining muy popular por sus tablas de picoteo, costillares BBQ, fajitas para armar en la mesa y promociones de happy hour todos los días.",
    mustTry: ["Tabla Mamut", "Costillar BBQ con Papas", "Fajitas Mixtas", "Mojito Frambuesa XXL"],
    vibe: "Ambiente distendido y económico para picotear y tomar algo en pareja.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Ruta Gastronómica" }
    ],
    reviews: [
      { source: "Google Maps", user: "Karla V.", rating: 4.5, text: "Siempre salvador para ir por unas fajitas y aprovechar el happy hour después de recorrer el mall." }
    ]
  },
  {
    id: "el-valenciano",
    name: "El Valenciano (MUT)",
    cuisine: "Paellas, Tapas y Bocatas Españolas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$10.000 - $15.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.7,
    socialHandle: "@elvalenciano.cl",
    socialHighlight: "Paellas gigantes cocinadas a la vista en el Nivel -2 del MUT y bocatas de calamares.",
    description: "Rincón español en el corazón del Mercado Urbano Tobalaba donde preparan a diario paellas valencianas, de mariscos y negras, además de tortillas de papas y tapas.",
    mustTry: ["Paella de Mariscos", "Arroz Negro con Calamares", "Tortilla Española Jugosa", "Bocata de Jamón Serrano"],
    vibe: "Experiencia de mercado europeo auténtico, viendo cómo sirven la paella recién hecha.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Javier M.", rating: 4.8, text: "El socarrat de la paella les queda espectacular y el plato es súper contundente." }
    ]
  },
  {
    id: "donde-naresh",
    name: "Donde Naresh (MUT)",
    cuisine: "Comida India Tradicional y Currys",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$9.500 - $13.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.8,
    socialHandle: "@dondenaresh",
    socialHighlight: "Uno de los locales más aplaudidos del MUT por su Butter Chicken con pan Naan recién horneado.",
    description: "Cocina india auténtica en formato ágil de mercado. Pollo Tikka Masala, Butter Chicken, opciones vegetarianas con garbanzos y lentejas, arroz basmati y pan naan al ajo.",
    mustTry: ["Butter Chicken", "Chicken Tikka Masala", "Garlic Naan", "Samosas de Verduras"],
    vibe: "Ideal si quieren probar sabores intensos y aromáticos distintos a lo de siempre.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "TikTok", user: "@probando.scl", rating: 4.9, text: "El Garlic Naan untado en la salsa del Butter Chicken de Donde Naresh es una experiencia única." }
    ]
  },
  {
    id: "tonny-pizzeria",
    name: "Tonny Pizzería",
    cuisine: "Pizza Estilo Neoyorquino y Al Paso",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.500 - $10.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.7,
    socialHandle: "@tonnypizzeria",
    socialHighlight: "Slices gigantes crujientes y pizzas individuales listas en minutos en el Nivel -2 del MUT.",
    description: "Pizzería urbana de estilo neoyorquino e italiano al corte o individual, con masa crujiente, pepperoni crocante, pesto y salsas para untar los bordes.",
    mustTry: ["Pizza Pepperoni y Hot Honey", "Pizza Pesto Stracciatella", "Dip de Ajo Tostado"],
    vibe: "Rápido, ondero y delicioso para comer algo rico sin esperar mesa.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Vicente L.", rating: 4.7, text: "La de pepperoni con toque de miel picante es adictiva." }
    ]
  },
  {
    id: "sky-300-bar",
    name: "Sky 300 Bar & Coffee (Sky Costanera)",
    cuisine: "Tapas, Coctelería de Autor y Cafetería en Altura",
    category: "restaurante",
    mealTypes: ["dulce", "tragos", "cena"],
    priceRange: "$$$$",
    avgPriceCLP: "$18.000 - $28.000 p/p (más entrada mirador)",
    stars: 4.8,
    uberEatsRating: 4.7,
    googleRating: 4.8,
    socialHandle: "@skycostanera",
    socialHighlight: "A 300 metros de altura en el piso 62: la vista 360 grados más romántica de todo Santiago al atardecer.",
    description: "Ubicado en la cima de la Gran Torre Costanera, ofrece coctelería de autor, vinos, tablas para compartir, sándwiches gourmet y pastelería frente a la cordillera.",
    mustTry: ["Cóctel Sunset 300", "Tabla Cordillera para Dos", "Torta Ópera", "Espumante Rosé"],
    vibe: "La cita más inolvidable de Santiago viendo cómo se ilumina toda la ciudad desde el piso 62.",
    locations: [
      { mallId: "costanera-center", zone: "Sky 300 (Piso 62)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Valentina y Diego", rating: 5, text: "Subimos justo una hora antes del atardecer y tomamos unos cócteles mirando la cordillera rosada. Inolvidable." }
    ]
  },
  {
    id: "la-piccola-italia",
    name: "La Piccola Italia",
    cuisine: "Pastas Abundantes y Comida Italiana",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$10.000 - $15.000 p/p",
    stars: 4.2,
    uberEatsRating: 4.3,
    googleRating: 4.1,
    socialHandle: "@lapiccolaitaliachile",
    socialHighlight: "Conocido por sus platos gigantes de pastas con salsas cremosas y pan con ajo.",
    description: "Clásico restaurante familiar italiano en Chile famoso por el tamaño monumental de sus porciones de fetuccini, ñoquis, ravioles y escalopas.",
    mustTry: ["Fetuccini con Salsa Alfredo y Pollo", "Lasaña Boloñesa", "Pan con Mantequilla al Ajo", "Torta Tres Leches"],
    vibe: "Para comer pastas en porciones enormes y quedar completamente satisfechos.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Camilo A.", rating: 4.3, text: "Con un plato de fetuccini y una lasaña comen fácil dos personas con mucha hambre." }
    ]
  },
  {
    id: "el-quincho-del-cacho",
    name: "El Quincho del Cacho",
    cuisine: "Parrilla Argentina, Carnes y Tragos",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $23.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.6,
    socialHandle: "@elquinchodelcacho",
    socialHighlight: "Favorito de Las Terrazas de Mallplaza Oeste por sus parrilladas y vista a la laguna.",
    description: "Parrilla y restaurante con terraza junto a la laguna de Plaza Oeste, especializado en carnes a las brasas, tablas calientes y coctelería de autor.",
    mustTry: ["Parrillada El Quincho", "Lomo Vetado con Papas Provenzal", "Choripán Artesanal", "Sangría de la Casa"],
    vibe: "Terraza soleada de día y muy animada de noche frente al agua.",
    locations: [
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Fabián R.", rating: 4.6, text: "Excelente ambiente en la terraza de Plaza Oeste, la carne llegó calentita en brasero." }
    ]
  },
  {
    id: "tres-barriles",
    name: "Tres Barriles Restobar",
    cuisine: "Gastrobar, Picoteos y Cervezas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $17.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.5,
    googleRating: 4.5,
    socialHandle: "@tresbarrilescl",
    socialHighlight: "Buena música, chorrillanas, pizzas y jarras de cerveza o sangría en Las Terrazas.",
    description: "Restobar pensado para compartir tablas, chorrillanas, hamburguesas y coctelería con ambiente musical entretenido frente a la laguna.",
    mustTry: ["Chorrillana Tres Barriles", "Tabla Mar y Tierra", "Mojito Corona", "Quesadillas de Pollo"],
    vibe: "Ideal para una cita de tarde-noche con tragos y picoteo al aire libre.",
    locations: [
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Daniela S.", rating: 4.5, text: "Las tablas son gigantes y la atención en la terraza fue súper amable." }
    ]
  },
  {
    id: "bariloche-restaurant",
    name: "Bariloche Restaurant",
    cuisine: "Carnes, Tablas, Pizzas y Coctelería",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $18.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.5,
    googleRating: 4.4,
    socialHandle: "@barilocherestaurant",
    socialHighlight: "Restaurante de inspiración patagónica con tablas calientes, carnes y coctelería en Las Terrazas.",
    description: "Espacio cálido con madera y terrazas, carta de carnes a la plancha, chorrillanas patagónicas, pizzas artesanales, pastas y tragos en formato XL.",
    mustTry: ["Tabla Bariloche", "Lomo a lo Pobre", "Pizza Patagónica", "Calafate Sour"],
    vibe: "Acogedor y variado para almorzar o tomar algo en la tarde.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Mauricio T.", rating: 4.5, text: "Buenas porciones y excelente ubicación en el sector de terrazas." }
    ]
  },

  // ================= COMIDA RÁPIDA, BURGERS Y PATIO DE COMIDAS =================
  {
    id: "carls-jr",
    name: "Carl's Jr.",
    cuisine: "Hamburguesas Charbroiled y Tenders",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$$",
    avgPriceCLP: "$8.900 - $12.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@carlsjrchile",
    socialHighlight: "Elegida por muchos en redes como la mejor hamburguesa de cadena por su carne a la parrilla y refill de bebida.",
    description: "Cadena californiana de hamburguesas 100% carne de vacuno asadas al fuego (charbroiled), famosas por la Western Bacon Cheeseburger, sus Crisscut Fries y tenders empanizados a mano.",
    mustTry: ["Double Western Bacon Cheeseburger", "The Big Carl", "Crisscut Fries (Papas Rejilla)", "Hand-Breaded Chicken Tenders"],
    vibe: "Cuando quieren una hamburguesa rápida pero con sabor real a parrilla y bebida recargable.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Benjamín T.", rating: 4.8, text: "La Double Western Bacon con aros de cebolla y salsa BBQ no tiene competencia en comida rápida." }
    ]
  },
  {
    id: "wendys",
    name: "Wendy's",
    cuisine: "Hamburguesas Cuadradas, Baconator y Frosty",
    category: "rapida",
    mealTypes: ["almuerzo", "cena", "dulce"],
    priceRange: "$",
    avgPriceCLP: "$7.200 - $10.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@wendyschile",
    socialHighlight: "Famosa por su Baconator cargada de tocino ahumado, papas con cheddar y tocino, y el postre helado Frosty.",
    description: "Cadena estadounidense de hamburguesas de carne fresca cuadrada con abundante queso cheddar fundido, tocino crujiente, nuggets picantes y batidos Frosty.",
    mustTry: ["Baconator Doble", "Dave's Single", "Papas Baconator", "Frosty de Chocolate o Vainilla"],
    vibe: "Ideal para untar las papas fritas calientes en un Frosty helado.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Martín S.", rating: 4.6, text: "La Baconator y las papas con queso y tocino son una bomba de sabor." }
    ]
  },
  {
    id: "mcdonalds",
    name: "McDonald's & McCafé",
    cuisine: "Hamburguesas Clásicas, Nuggets y McFlurry",
    category: "rapida",
    mealTypes: ["almuerzo", "cena", "dulce"],
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@mcdonalds_cl",
    socialHighlight: "Las papas fritas más icónicas del mundo, McNuggets para compartir y McFlurry de postre.",
    description: "El clásico infalible de comida rápida con la línea Signature gourmet, Cuarto de Libra, Big Mac, cajas de 20 McNuggets para compartir en pareja y postres helados.",
    mustTry: ["Cuarto de Libra Doble", "Caja 20 McNuggets con Salsa Agridulce", "Club House Signature", "McFlurry Oreo con Manjar"],
    vibe: "Rápido, salvador y perfecto para compartir nuggets y helado.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Constanza R.", rating: 4.6, text: "Nuestro ritual después del cine: 20 nuggets para los dos y dos McFlurry." }
    ]
  },
  {
    id: "burger-king",
    name: "Burger King",
    cuisine: "Hamburguesas a la Parrilla y Whopper",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.900 p/p",
    stars: 4.4,
    uberEatsRating: 4.5,
    googleRating: 4.3,
    socialHandle: "@burgerking_chile",
    socialHighlight: "El sabor ahumado del Whopper y la línea Stacker con mucho tocino y salsa especial.",
    description: "Especialistas en hamburguesas a la parrilla desde 1954. Destacan su clásico Whopper, la línea King Selection, aros de cebolla crujientes y baldes de nuggets.",
    mustTry: ["Whopper Doble", "Stacker Triple", "Aros de Cebolla con Salsa BK", "Cono Relleno Manjar"],
    vibe: "Ideal para un antojo de carne a la parrilla rápida y cupones para dos.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Pablo G.", rating: 4.5, text: "La Stacker con salsa especial y tocino nunca falla." }
    ]
  },
  {
    id: "kfc",
    name: "KFC (Kentucky Fried Chicken)",
    cuisine: "Buckets de Pollo Frito Crispy y Twister",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.3,
    socialHandle: "@kfcchile",
    socialHighlight: "El Bucket de Strips y PopCorn Chicken para compartir de a dos es favorito en patios de comida.",
    description: "El pollo frito más famoso con la receta secreta del Coronel Sanders o versión Crispy picante, acompañado de puré con salsa gravy, ensalada coleslaw y biscuits.",
    mustTry: ["Bucket Dúo Crispy", "Mega Box 5 en 1", "Popcorn Chicken Grande", "Twister Americano"],
    vibe: "Para compartir un bucket de pollo crujiente entre los dos.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Esteban M.", rating: 4.6, text: "Los crispy strips con salsa garlic y el puré con gravy son adictivos." }
    ]
  },
  {
    id: "domino",
    name: "Dominó Fuente de Soda",
    cuisine: "Completos, Vienesa Italiana y Churrascos",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@dominofds",
    socialHighlight: "El completo chileno por excelencia desde 1952: palta recién molida y vienesa de receta propia.",
    description: "La fuente de soda más emblemática de Chile para comer completos, dinámicos, ases, churrascos y empanadas de queso con jugo natural recién exprimido.",
    mustTry: ["Vienesa Dominó (Dinámico)", "Vienesa Italiana", "As Italiano en Pan Lengua", "Jugo Natural de Frambuesa"],
    vibe: "Clásico chileno infalible para compartir unos completos italianos con harta palta.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Gabriel A.", rating: 4.8, text: "La calidad de la vienesa y la palta del Dominó siempre está un escalón arriba." }
    ]
  },
  {
    id: "doggis",
    name: "Doggis",
    cuisine: "Hot Dogs, Papas con Salsa de Queso y Empanadas",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$5.200 - $7.800 p/p",
    stars: 4.3,
    uberEatsRating: 4.4,
    googleRating: 4.2,
    socialHandle: "@doggischile",
    socialHighlight: "Famoso por sus papas fritas bañadas en salsa de queso caliente, nuggets y completos económicos.",
    description: "Cadena chilena de hot dogs y snacks rápidos muy popular por su salsa de queso cheddar tibia, completos italianos, crispers y helados.",
    mustTry: ["Combo Hot Dog Italiano", "Papas Fritas con Salsa de Queso y Tocino", "Empanaditas de Queso"],
    vibe: "Económico y salvador para un antojo de papas con salsa de queso.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Kevin R.", rating: 4.4, text: "La salsa de queso caliente del Doggis es un clásico de toda la vida." }
    ]
  },
  {
    id: "juan-maestro",
    name: "Juan Maestro",
    cuisine: "Sándwiches a la Plancha, Barros Luco y Lomitos",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.800 - $9.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@juanmaestrochile",
    socialHighlight: "Los Maestros Sangucheros: Barros Luco con queso fundido en la plancha y pan recién horneado.",
    description: "Especialistas en sándwiches chilenos preparados al minuto en plancha caliente: churrascos, barros luco, lomitos, pechuga de pollo y empanadas de queso.",
    mustTry: ["Churrasco Italiano", "Barros Luco Doble Queso", "Lomito Chacarero", "Papas Supremas"],
    vibe: "Rápido, calentito y recién salido de la plancha.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Lorena P.", rating: 4.6, text: "El Barros Luco en pan ciabatta es mi perdición cada vez que vamos al mall." }
    ]
  },
  {
    id: "taco-bell",
    name: "Taco Bell",
    cuisine: "Tacos, Burritos, Quesadillas y Nachos",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.200 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@tacobellchile",
    socialHighlight: "El Crunchwrap Supreme y las papas Supreme con queso caliente son los más pedidos.",
    description: "Comida rápida de inspiración mexicana famosa por su Crunchwrap Supreme, Quesarito, Chalupas, Nachos BellGrande y sus icónicas salsas Fire y Mild.",
    mustTry: ["Crunchwrap Supreme", "Quesadilla de Pollo", "Fiesta Potatoes / Nachos Supreme", "Cinnamon Twists"],
    vibe: "Diferente a la típica hamburguesa, súper sabroso y con combos armados.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Renata V.", rating: 4.7, text: "La Big Bell Box trae de todo y alcanza increíble. Las papas con queso y crema ácida son un vicio." }
    ]
  },
  {
    id: "tommy-beans",
    name: "Tommy Beans",
    cuisine: "Burritos y Bowls Tex-Mex a tu Medida",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$7.200 - $9.800 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@tommybeanschile",
    socialHighlight: "Armas tu burrito o bowl paso a paso eligiendo proteínas, arroz cilantro, frijoles, guacamole y salsas.",
    description: "Fast-casual donde personalizas tu burrito gigante, taco o bowl saludable con ingredientes frescos a la vista: carne mechada, pollo grill, cerdo BBQ, guacamole y crema ácida.",
    mustTry: ["Burrito Mechada Guacamole", "Mexican Bowl Saludable", "Nachos con Queso Cheddar y Palta"],
    vibe: "Perfecto cuando quieren comer algo contundente pero fresco y personalizado al gusto de cada uno.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Francisca L.", rating: 4.7, text: "El bowl con arroz al cilantro, pollo, porotos negros y guacamole salva cualquier almuerzo." }
    ]
  },
  {
    id: "subway",
    name: "Subway",
    cuisine: "Subs Personalizados, Wraps y Galletas",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.200 - $8.900 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@subwaychile",
    socialHighlight: "Además de los Subs en pan parmesano orégano, sus galletas recién horneadas son famosas en TikTok.",
    description: "Sándwiches submarinos hechos al momento en pan recién horneado con vegetales a elección, salsas como Cebolla Dulce o Chipotle, y galletas suaves de macadamia o chocolate.",
    mustTry: ["Sub Pollo Teriyaki (30 cm para compartir)", "Sub B.M.T. Italiano", "Galleta de Chocolate Blanco y Macadamia"],
    vibe: "Fresco, liviano y no se olviden de llevarse dos galletas tibias de postre.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Simón K.", rating: 4.6, text: "El Pollo Teriyaki en pan parmesano orégano con salsa cebolla dulce es combinación ganadora." }
    ]
  },
  {
    id: "china-wok",
    name: "China Wok",
    cuisine: "Comida China al Wok y Chapsui",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.800 - $9.500 p/p",
    stars: 4.4,
    uberEatsRating: 4.5,
    googleRating: 4.3,
    socialHandle: "@chinawokchile",
    socialHighlight: "Arroz chaufa, pollo mongoliano, arrollados primavera y wantanes crujientes.",
    description: "Especialidades chinas salteadas al wok frente a ti: combinaciones de arroz chaufa o tallarines con carne mongoliana, pollo arverjado, cerdo agridulce y wantanes.",
    mustTry: ["Combo Chaufa más Carne Mongoliana más Pollo Agridulce", "Arrollados Primavera", "Wantanes Fritos"],
    vibe: "Contundente y sabroso cuando tienen antojo de comida china.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Rodrigo F.", rating: 4.5, text: "Las bandejas combinadas traen muchísima comida y los arrollados primavera siempre están crujientes." }
    ]
  },
  {
    id: "papa-johns-pizza-hut",
    name: "Papa John's / Pizza Hut",
    cuisine: "Pizzas Americanas, Garlic Knots y Palitos de Ajo",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@papajohnschile",
    socialHighlight: "Pizzas individuales o familiares recién salidas del horno con salsa de mantequilla de ajo y ají.",
    description: "Las cadenas de pizzerías americanas favoritas de los patios de comida, con opciones como Todas las Carnes, Super Pepperoni, Pollo BBQ y bordes rellenos de queso.",
    mustTry: ["Pizza Todas las Carnes", "Pizza Pollo BBQ", "Palitos de Ajo con Salsa Garlic", "Rollos de Canela"],
    vibe: "Ideal para compartir una pizza mediana recién horneada entre los dos.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Ignacia M.", rating: 4.7, text: "La salsa de ajo de Papa John's con los bordes de la pizza es adictiva." }
    ]
  },
  {
    id: "taranna-saboress",
    name: "Saboress / Tarragona",
    cuisine: "Pollo Crispy, Pizzas y Papas Fritas",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    priceRange: "$",
    avgPriceCLP: "$5.900 - $8.500 p/p",
    stars: 4.3,
    uberEatsRating: 4.4,
    googleRating: 4.2,
    socialHandle: "@tarragonachile",
    socialHighlight: "Combos económicos de pollo apanado, empanaditas de queso y papas fritas.",
    description: "Clásico de los patios de comida chilenos con recetas de pollo crujiente, sándwiches de filete de pollo, cajas de nuggets y empanadas de queso fritas.",
    mustTry: ["Balde de Filetillos Crispy", "Sándwich Pollo Italiano", "Empanaditas de Queso"],
    vibe: "Económico y rápido para salir del paso en el patio de comidas.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "cenco-florida", zone: "Patio de Comidas (Nivel 3)" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Marco P.", rating: 4.4, text: "Los filetillos de pollo con papas son súper salvadores y baratos." }
    ]
  },

  // ================= CAFETERÍAS, HELADERÍAS, DULCES Y POSTRES =================
  {
    id: "brussels-heart-of-chocolate",
    name: "Brussels Heart of Chocolate",
    cuisine: "Chocolatería Belga, Fondue y Waffles",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$$",
    avgPriceCLP: "$8.500 - $13.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.7,
    socialHandle: "@brusselschocolates",
    socialHighlight: "El lugar número 1 de citas dulces en Santiago: Fondue de chocolate belga derretido con frutas, marshmallows y waffles.",
    description: "Templo del chocolate belga real (leche, bitter y blanco). Su plato estrella para parejas es el Fondue con mechero, acompañado de frutillas, plátano, brownies y waffles belgas.",
    mustTry: ["Fondue de Chocolate Belga para Dos", "Waffle de Lieja con Helado y Chocolate", "Submarino de Chocolate Real", "Frutillas Bañadas"],
    vibe: "100% romántico: compartir un fondue de chocolate tibio entre los dos es éxito garantizado.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "TikTok", user: "@citasensantiago", rating: 5, text: "Si quieres sorprender a tu pareja, llévala por el Fondue para dos en Brussels. El chocolate belga es real." }
    ]
  },
  {
    id: "krispy-kreme",
    name: "Krispy Kreme",
    cuisine: "Doughnuts Glaseadas Calientes y Café",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$",
    avgPriceCLP: "$4.200 - $7.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@krispykremechile",
    socialHighlight: "Sus Original Glazed que se deshacen en la boca y las cajas de docena para compartir.",
    description: "Famosa cadena internacional de doughnuts de masa ultra suave y aireada, destacando la Original Glazed, versiones rellenas de Nutella, dulce de leche y brownies.",
    mustTry: ["Original Glazed Doughnut", "Doughnut Rellena de Nutella", "Media Docena Surtida", "Iced Caramel Latte"],
    vibe: "Antojo dulce rápido y suave para acompañar con un café helado.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior y Dulces" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Daniela V.", rating: 4.8, text: "La masa de la glaseada original es tan liviana que te puedes comer tres sin darte cuenta." }
    ]
  },
  {
    id: "fiol-dulceria",
    name: "Fiol Dulcería (MUT)",
    cuisine: "Pastelería de Autor, Tartas y Café de Especialidad",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$$",
    avgPriceCLP: "$6.500 - $10.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.8,
    socialHandle: "@fioldulceria",
    socialHighlight: "Repostería fina de la pastelera Camila Fiol en el Nivel -2 del MUT: tartas estacionales, galletas y dulces.",
    description: "Dulcería artesanal contemporánea reconocida por trabajar con frutas de estación, chocolates de origen, frutos secos tostados y texturas crujientes.",
    mustTry: ["Tarta de Pistacho y Frambuesa", "Galleta Rellena de Gianduja", "Cheesecake Vasco Cremoso", "Flat White"],
    vibe: "Parada obligatoria en el MUT para parejas amantes de la alta pastelería de autor.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Florencia M.", rating: 4.9, text: "Todo lo que hace Camila Fiol es de otro nivel, el equilibrio de dulzor y acidez es perfecto." }
    ]
  },
  {
    id: "buffalo-waffles",
    name: "Buffalo Waffles",
    cuisine: "Bubble Waffles Dulces y Salados",
    category: "dulce",
    mealTypes: ["dulce", "almuerzo"],
    priceRange: "$",
    avgPriceCLP: "$5.800 - $8.200 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@buffalowaffles",
    socialHighlight: "Waffles con burbujas estilo Hong Kong rellenos de helado, Nutella, Oreo, frutillas o versiones saladas.",
    description: "Famosos por sus waffles de burbujas enrollados en forma de cono, crujientes por fuera y esponjosos por dentro, rellenos de crema, helado, salsas y toppings.",
    mustTry: ["Sweet Oreo Nutella Waffle", "Berrylicious (Frutilla, Plátano y Manjar)", "Salty Cheddar Bacon Waffle"],
    vibe: "Perfecto para comer caminando por el mall o sentarse a compartir algo dulce.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "plaza-vespucio", zone: "Interior y Dulces" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Josefa M.", rating: 4.8, text: "La masa tibia con el helado frío adentro y harta Nutella es lo más rico del mundo." }
    ]
  },
  {
    id: "emporio-la-rosa",
    name: "Emporio La Rosa",
    cuisine: "Heladería Artesanal Chilena y Cafetería",
    category: "dulce",
    mealTypes: ["dulce", "almuerzo"],
    priceRange: "$$",
    avgPriceCLP: "$5.500 - $11.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@emporiolarosa",
    socialHighlight: "Elegida entre las 25 mejores heladerías del mundo por su sabor Rosa, Miel de Ulmo y Chocolate Araucano.",
    description: "Heladería tradicional chilena con sabores únicos como pétalos de rosa, manjar blanco, menta chips y chocolate araucano, además de cafetería, quiches y tortas.",
    mustTry: ["Helado de Rosa más Chocolate Araucano", "Dulce de Leche Emporio", "Affogato al Café", "Torta Amor"],
    vibe: "Un clásico santiaguino para tomar un helado artesanal o un café con pastel.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-egana", zone: "Niveles Interiores" },
      { mallId: "mut", zone: "Piso 3 (El Jardín)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Magdalena S.", rating: 4.7, text: "El helado de Chocolate Araucano y el de Miel de Ulmo son sabores que solo encuentras acá." }
    ]
  },
  {
    id: "freddo",
    name: "Heladería Freddo",
    cuisine: "Gelato Argentino y Dulce de Leche",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$$",
    avgPriceCLP: "$5.200 - $8.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@freddochile",
    socialHighlight: "Más de 5 variedades distintas de helado de Dulce de Leche artesanal argentino.",
    description: "Tradicional heladería argentina famosa por la cremosidad de sus gelatos de Dulce de Leche Tentación, Granizado, con Brownie o Vauquita, además de batidos y cafés.",
    mustTry: ["Dulce de Leche Tentación", "Chocolate Freddo con Almendras", "Sundae Dulce de Leche", "Batido Cremoso"],
    vibe: "Parada obligatoria si son fanáticos del manjar y el dulce de leche.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior y Dulces" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Nicolás R.", rating: 4.8, text: "El Dulce de Leche Tentación trae cucharadas enteras de dulce de leche real entremedio." }
    ]
  },
  {
    id: "starbucks",
    name: "Starbucks Coffee",
    cuisine: "Cafetería, Frappuccinos y Pastelería",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$$",
    avgPriceCLP: "$5.500 - $9.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@starbuckschile",
    socialHighlight: "Caramel Macchiato, Frappuccinos, Matcha Latte y paninis calientes para una pausa en el mall.",
    description: "Cafetería ideal para descansar de las compras con bebidas frías o calientes personalizadas, galletas, muffins, medialunas rellenas y sándwiches calientes.",
    mustTry: ["Iced Caramel Macchiato", "Java Chip Frappuccino", "Iced Matcha Latte", "Medialuna Jamón Queso"],
    vibe: "Para sentarse a conversar tranquilos con un café helado y algo rico.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior y Dulces" },
      { mallId: "plaza-egana", zone: "Niveles Interiores" },
      { mallId: "cenco-florida", zone: "Cafeterías" },
      { mallId: "plaza-oeste", zone: "Cafés y Postres" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Trinidad G.", rating: 4.7, text: "El Iced White Mocha y el cake pop nunca fallan para recargar energías." }
    ]
  },
  {
    id: "juan-valdez",
    name: "Juan Valdez Café",
    cuisine: "Café 100% Colombiano, Nevados y Pastelería",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$$",
    avgPriceCLP: "$5.500 - $9.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@juanvaldezcafechile",
    socialHighlight: "Sus Nevados de Arequipe (manjar) y Oreo, junto con los almojábanas y pandebonos colombianos.",
    description: "Café premium 100% colombiano de origen con una carta destacada de bebidas frías ('Nevados'), lattes con arequipe, tortas húmedas y panadería típica colombiana.",
    mustTry: ["Nevado de Arequipe", "Latte Arequipe Caliente", "Pandebono Tibio", "Torta de Zanahoria"],
    vibe: "Café con aroma increíble y dulces colombianos para compartir a media tarde.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior y Dulces" },
      { mallId: "plaza-egana", zone: "Niveles Interiores" },
      { mallId: "cenco-florida", zone: "Cafeterías" }
    ],
    reviews: [
      { source: "Google Maps", user: "Natalia P.", rating: 4.7, text: "El Nevado de Brownie y los pandebonos calentitos son un 10/10." }
    ]
  },
  {
    id: "dunkin",
    name: "Dunkin'",
    cuisine: "Donuts Rellenas, Café Helado y Munchkins",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$",
    avgPriceCLP: "$4.000 - $7.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@dunkinchile",
    socialHighlight: "La donut Boston Manjar y la caja de 6 donuts a elección son el antojo dulce favorito.",
    description: "Especialistas en donuts glaseadas y rellenas de manjar, crema pastelera, frambuesa o chocolate, además de bolitas Munchkins, bagels y iced coffees.",
    mustTry: ["Boston Manjar", "Smiley Rellena Crema Bavariana", "Caja de 25 Munchkins", "Iced Latte Vainilla"],
    vibe: "Colorido y dulce para elegir media docena de donuts entre los dos.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior y Dulces" },
      { mallId: "plaza-egana", zone: "Niveles Interiores" },
      { mallId: "cenco-florida", zone: "Cafeterías" },
      { mallId: "plaza-oeste", zone: "Cafés y Postres" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Pía M.", rating: 4.8, text: "La Boston Manjar sigue siendo la reina indiscutida de las donuts en Chile." }
    ]
  },
  {
    id: "cinnabon",
    name: "Cinnabon",
    cuisine: "Rollos de Canela Recién Horneados y Frosting",
    category: "dulce",
    mealTypes: ["dulce"],
    priceRange: "$",
    avgPriceCLP: "$4.500 - $7.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.7,
    socialHandle: "@cinnabonchile",
    socialHighlight: "El aroma a canela Makara recién horneada con glaseado de queso crema que se siente por todo el piso.",
    description: "Famosos mundialmente por sus rollos de canela tibios cubiertos con abundante frosting de queso crema derretido, versiones con nueces pecanas y caramelo (Caramel PecanBon).",
    mustTry: ["Cinnabon Classic Tibio", "Caramel PecanBon", "BonBites (Bocados para compartir)", "Chillatta de Oreo"],
    vibe: "Imposible pasar por afuera sin tentarse por el olor a canela recién salido del horno.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés y Dulces)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Interior y Dulces" }
    ],
    reviews: [
      { source: "TikTok", user: "@dulces.scl", rating: 4.9, text: "Pídanlo con porción extra de frosting tibio y compártanlo de a dos, es pura felicidad." }
    ]
  }
];

window.RESTAURANTS_DATA = [];

BRAND_CATALOG.forEach((brand) => {
  brand.locations.forEach((loc, idx) => {
    const mallObj = window.MALLS_DATA.find((m) => m.id === loc.mallId);
    window.RESTAURANTS_DATA.push({
      uid: `${brand.id}__${loc.mallId}`,
      brandId: brand.id,
      name: brand.name,
      mallId: loc.mallId,
      mallName: mallObj ? mallObj.shortName : loc.mallId,
      mallFullName: mallObj ? mallObj.name : loc.mallId,
      zone: loc.zone,
      cuisine: brand.cuisine,
      category: brand.category,
      mealTypes: brand.mealTypes,
      priceRange: brand.priceRange,
      avgPriceCLP: brand.avgPriceCLP,
      stars: brand.stars,
      uberEatsRating: brand.uberEatsRating,
      googleRating: brand.googleRating,
      socialHandle: brand.socialHandle,
      socialHighlight: brand.socialHighlight,
      description: brand.description,
      mustTry: brand.mustTry,
      vibe: brand.vibe,
      reviews: brand.reviews,
      isPrimaryBranch: idx === 0
    });
  });
});
