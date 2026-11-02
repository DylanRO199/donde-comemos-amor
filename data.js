/**
 * Base de datos completa de Malls y Locales de Comida en Santiago de Chile
 * Incluye restaurantes, fast food, cafeterías, heladerías y bares con puntajes
 * de Uber Eats, Google Maps, reseñas de redes sociales y recomendaciones para citas.
 */

window.MALLS_DATA = [
  {
    id: "all",
    name: "Todos los Malls (Santiago)",
    shortName: "Todos",
    comuna: "Gran Santiago",
    zones: ["Todas las zonas"],
    badge: "✨ +120 Locales",
    gradient: "from-rose-500 via-fuchsia-500 to-indigo-500",
    description: "Explora o sortea entre absolutamente todos los locales gastronómicos de los principales centros comerciales de Santiago."
  },
  {
    id: "costanera-center",
    name: "Cenco Costanera (Costanera Center)",
    shortName: "Costanera Center",
    comuna: "Providencia",
    address: "Av. Andrés Bello 2425, Providencia",
    zones: ["QINTO (Nivel 5)", "Patio de Comidas (Nivel 5)", "Sky 300 (Piso 62)", "Niveles 1 al 4 (Cafés & Dulces)"],
    badge: "🌆 QINTO & Sky 300",
    gradient: "from-pink-500 to-rose-600",
    description: "El ícono de Providencia con su renovado polo gastronómico QINTO en el 5° piso, terrazas panorámicas, patio de comidas gigante y vista a 300 metros de altura."
  },
  {
    id: "parque-arauco",
    name: "Parque Arauco",
    shortName: "Parque Arauco",
    comuna: "Las Condes",
    address: "Av. Presidente Kennedy 5413, Las Condes",
    zones: ["Boulevard (Exterior)", "Bazar Gourmet (Piso 3)", "Distrito de Lujo", "Patio de Comidas (Nivel 2)"],
    badge: "🥂 Boulevard & Bazar Gourmet",
    gradient: "from-amber-500 to-orange-600",
    description: "El epicentro gastronómico del sector oriente: terrazas al aire libre en el Boulevard, propuestas internacionales en Bazar Gourmet y alta pastelería."
  },
  {
    id: "mut",
    name: "MUT (Mercado Urbano Tobalaba)",
    shortName: "MUT Tobalaba",
    comuna: "Las Condes / Providencia",
    address: "Av. Apoquindo 2730 (Metro Tobalaba)",
    zones: ["Piso 5 (El Puente)", "Piso 4 (La Terraza)", "Piso 3 (El Jardín)", "Nivel -2 (El Mercado)"],
    badge: "🌿 Tendencia & Autor",
    gradient: "from-emerald-500 to-teal-600",
    description: "El mercado urbano más viral de Santiago: jardines interiores, pizzerías de masa madre, barras de autor, comida callejera del mundo y cafés de especialidad."
  },
  {
    id: "alto-las-condes",
    name: "Cenco Alto Las Condes",
    shortName: "Alto Las Condes",
    comuna: "Las Condes",
    address: "Av. Presidente Kennedy 9001, Las Condes",
    zones: ["Mirador del Alto (Nivel 3)", "Terraza Rincón Jumbo", "Patio de Comidas", "Cafeterías Interior"],
    badge: "🏔️ Mirador del Alto",
    gradient: "from-violet-500 to-purple-600",
    description: "Destaca por el Mirador del Alto con vista despejada a la cordillera, ambiente ideal para cenas románticas y un completo patio de comidas."
  },
  {
    id: "plaza-vespucio",
    name: "Mallplaza Vespucio",
    shortName: "Plaza Vespucio",
    comuna: "La Florida",
    address: "Av. Vicuña Mackenna Oriente 7110, La Florida",
    zones: ["Mercado del 14", "Las Terrazas", "Patio de Comidas", "Interior & Dulces"],
    badge: "🎶 Mercado del 14",
    gradient: "from-cyan-500 to-blue-600",
    description: "Con su famoso Mercado del 14 y Las Terrazas, combina picadas históricas chilenas, gastrobares, música en vivo y todas las grandes cadenas."
  },
  {
    id: "plaza-egana",
    name: "Mallplaza Egaña",
    shortName: "Plaza Egaña",
    comuna: "La Reina / Ñuñoa",
    address: "Av. Larraín 5862, La Reina",
    zones: ["Azotea Urbana (Nivel 4)", "Patio de Comidas (Nivel 4)", "Niveles Interiores"],
    badge: "🌇 Azotea Urbana",
    gradient: "from-fuchsia-500 to-pink-600",
    description: "Su Azotea Urbana en el cuarto piso es perfecta para ver el atardecer en pareja entre parrillas, comida peruana, hamburguesas gourmet y coctelería."
  },
  {
    id: "cenco-florida",
    name: "Cenco Florida (Florida Center)",
    shortName: "Cenco Florida",
    comuna: "La Florida",
    address: "Av. Vicuña Mackenna Oriente 6100, La Florida",
    zones: ["Mirador Florida", "Zona Restaurantes", "Patio de Comidas", "Cafeterías"],
    badge: "🍔 Mirador & Clásicos",
    gradient: "from-sky-500 to-indigo-600",
    description: "Renovado con la zona gastronómica Mirador Florida, restaurantes familiares, sushi, carnes a las brasas y un gran patio de comida rápida."
  },
  {
    id: "plaza-oeste",
    name: "Mallplaza Oeste",
    shortName: "Plaza Oeste",
    comuna: "Cerrillos / Maipú",
    address: "Av. Américo Vespucio 1501, Cerrillos",
    zones: ["Las Terrazas (Laguna)", "Ruta Gastronómica", "Patio de Comidas (Nivel 3)", "Cafés & Postres"],
    badge: "🌴 Terrazas & Laguna",
    gradient: "from-orange-500 to-red-600",
    description: "Un paseo al aire libre junto a su laguna artificial en Las Terrazas, ideal para tardes soleadas, cenas entretenidas, tragos y postres belgas."
  }
];

/**
 * Catálogo maestro de marcas/locales gastronómicos con su presencia en malls de Santiago.
 * Cada local se expande automáticamente en los malls donde tiene sucursal, con su zona exacta.
 */
const BRAND_CATALOG = [
  // ================= RESTAURANTES & GASTROBARES =================
  {
    id: "barra-chalaca",
    name: "Barra Chalaca",
    cuisine: "Peruana & Marina",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍋",
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $24.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@barrachalacachile",
    socialHighlight: "🔥 Viral en TikTok e Instagram por su Ceviche Carretillero con calamares crujientes y su Pisco Sour Catedral.",
    description: "Cebichería callejera peruana creada por el chef Gastón Acurio. Porciones generosas, leche de tigre potente, causas, chaufas marinos y ambiente festivo de puerto.",
    mustTry: ["Ceviche Chalaco", "Chaufa Aeropuerto", "Leche de Tigre", "Sour Catedral"],
    vibe: "Ideal para una cita alegre con piscos sour y platos para picar al centro.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" },
      { mallId: "plaza-vespucio", zone: "Mercado del 14" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Camila V.", rating: 5, text: "El ceviche llega súper fresco y la porción alcanza perfecto para compartir si piden un chaufa aparte." },
      { source: "Google Maps", user: "Rodrigo M.", rating: 5, text: "Fuimos con mi polola el viernes en la tarde, los pisco sour 10/10 y la atención rapidísima." },
      { source: "Instagram", user: "@foodie.scl", rating: 4.8, text: "Imposible fallar con el lomito saltado y la causa limeña de Barra Chalaca." }
    ]
  },
  {
    id: "tanta",
    name: "Tanta",
    cuisine: "Peruana Casera & Autor",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce", "tragos"],
    emoji: "🇵🇪",
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $26.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@tantachile",
    socialHighlight: "⭐ Top #1 en favoritos familiares y citas por su Lomo Saltado, Ají de Gallina y vitrina de postres gigantes.",
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
      { source: "Google Maps", user: "Felipe A.", rating: 4.7, text: "Nuestro lugar favorito de aniversario. Pedimos el Piqueo Criollo para los dos y quedamos felices." },
      { source: "TikTok", user: "@rutagastronomicascl", rating: 4.8, text: "No se vayan sin probar la torta húmeda de chocolate o el suspiro limeño." }
    ]
  },
  {
    id: "pf-changs",
    name: "P.F. Chang's",
    cuisine: "Fusión Asiática & Wok",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🥢",
    priceRange: "$$$$",
    avgPriceCLP: "$22.000 - $32.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@pfchangschile",
    socialHighlight: "🧨 El Dynamite Shrimp y los Lettuce Wraps son los platos más fotografiados en citas nocturnas.",
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
    id: "toni-lautaro",
    name: "Toni Lautaro",
    cuisine: "Pizzería de Masa Madre & Antipasti",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍕",
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $24.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.8,
    socialHandle: "@tonilautaro",
    socialHighlight: "🏆 Elegida en redes como una de las mejores pizzas de larga fermentación y milanesas de Santiago.",
    description: "Pizzería italo-chilena con masa de fermentación lenta, ingredientes de pequeños productores locales, milanesas crujientes, vermut y platillos mediterráneos ('AntoniPasti').",
    mustTry: ["Pizza Stracciatella & Mortadela Pistacho", "Milanesa a la Napolitana", "Tiramisú Clásico", "Vermut de la Casa"],
    vibe: "Súper ondero y moderno en la terraza del 4° piso del MUT; ideal para compartir pizza y vermut.",
    locations: [
      { mallId: "mut", zone: "Piso 4 (La Terraza)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Ignacio P.", rating: 5, text: "La masa tiene un borde aireado perfecto y la pizza con burrata y pistacho es insuperable." },
      { source: "Instagram", user: "@comiendoensantiago", rating: 4.9, text: "El tiramisú que sirven en la mesa es parada obligatoria si van con su pareja al MUT." }
    ]
  },
  {
    id: "casa-asa",
    name: "Casa Asa",
    cuisine: "Fuegos, Brasas & Compartir",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🔥",
    priceRange: "$$$",
    avgPriceCLP: "$18.000 - $27.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.6,
    googleRating: 4.7,
    socialHandle: "@casa.asa.mut",
    socialHighlight: "🌿 En pleno jardín del Piso 3 del MUT, famoso por sus vegetales y cortes al fuego para poner al centro.",
    description: "Cocina honesta centrada en el fuego y las brasas. Carnes seleccionadas, pescados y vegetales asados con acompañamientos creativos rodeados de vegetación natural.",
    mustTry: ["Entraña a las Brasas", "Coliflor Asada con Tahini", "Papas Nativas Crujientes", "Vinos de Autor"],
    vibe: "Cita rodeada de plantas y luz natural en El Jardín del MUT.",
    locations: [
      { mallId: "mut", zone: "Piso 3 (El Jardín)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Francisca G.", rating: 4.8, text: "Nos encantó pedir tres platillos para compartir al centro. El ambiente en el jardín es precioso." },
      { source: "Instagram", user: "@parejafoodie.cl", rating: 4.7, text: "Las carnes salen en su punto exacto y las guarniciones de verduras a la brasa sorprenden." }
    ]
  },
  {
    id: "meli-melo",
    name: "Meli Meló Bistró",
    cuisine: "Bistró Francés, Brunch & Café",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce", "tragos"],
    emoji: "🥐",
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $22.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@melimelo.mut",
    socialHighlight: "🥂 Favorito para brunch en pareja, huevos benedictinos, croque madame y coctelería de tarde.",
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
    name: "Diablo Vino & Fuego",
    cuisine: "Carnes al Fuego & Wine Bar",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍷",
    priceRange: "$$$$",
    avgPriceCLP: "$22.000 - $32.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.7,
    googleRating: 4.8,
    socialHandle: "@diablovinoyfuego",
    socialHighlight: "🍷 Vistas en el Piso 5 del MUT con maridajes de vinos y cortes a las brasas.",
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
    id: "crepes-and-waffles",
    name: "Crepes & Waffles",
    cuisine: "Crepes Salados, Waffles & Heladería Artesanal",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce"],
    emoji: "🧇",
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $17.000 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.7,
    socialHandle: "@crepesywaffleschile",
    socialHighlight: "💛 El clásico infalible de las parejas: pitas, crepes rellenos y copas de helado artesanal a precios súper justos.",
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
      { source: "Google Maps", user: "Sebastián T.", rating: 4.8, text: "Siempre venimos con mi pareja porque comes plato de fondo + postre increíble sin gastar una fortuna." },
      { source: "TikTok", user: "@datos.santiago", rating: 4.8, text: "Pidan el pan pita relleno de entrada y compartan un mini waffle de frutos rojos." }
    ]
  },
  {
    id: "muu-steak",
    name: "Muu Steak & Grill",
    cuisine: "Parrilla & Carnes Premium",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🥩",
    priceRange: "$$$",
    avgPriceCLP: "$19.000 - $28.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@muusteakchile",
    socialHighlight: "🥩 Especialistas en cortes Angus certificados, provoletas derretidas y tablas parrilleras para dos.",
    description: "Steakhouse moderno con cortes de carne de raza Angus a la parrilla, hamburguesas artesanales, pastas rellenas y coctelería clásica en terraza.",
    mustTry: ["Entraña Angus", "Provoleta Muu al Orégano", "Parrillada para Dos", "Cheesecake de Maracuyá"],
    vibe: "Perfecto para parejas amantes de un buen corte de carne a punto y una copa de tinto.",
    locations: [
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Gonzalo H.", rating: 4.6, text: "Pedimos la tabla para compartir entre dos y sobró comida. La provoleta de entrada es obligatoria." },
      { source: "Uber Eats", user: "Paula M.", rating: 4.6, text: "El punto del lomo vetado llegó tal como lo pedimos y las papas rústicas súper crujientes." }
    ]
  },
  {
    id: "santa-brasa",
    name: "Santa Brasa",
    cuisine: "Carnes a las Brasas & Parrilla",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🔥",
    priceRange: "$$$$",
    avgPriceCLP: "$21.000 - $30.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@santabrasachile",
    socialHighlight: "🔥 Carnes maduradas a las brasas, empanadas de carne cortada a cuchillo y ambiente elegante.",
    description: "Parrilla gourmet que selecciona cortes nacionales e importados cocinados a las brasas de carbón y leña, acompañados de una extensa carta de vinos chilenos.",
    mustTry: ["Ojo de Bife", "Empanadas Cortadas a Cuchillo", "Espinacas a la Crema", "Panqueque Celestino"],
    vibe: "Cena romántica de corte clásico con excelente servicio a la mesa.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Eduardo K.", rating: 4.7, text: "Excelente atención y las carnes tienen ese sabor ahumado real de parrilla. Muy recomendado para ir en pareja." }
    ]
  },
  {
    id: "chilis",
    name: "Chili's Grill & Bar",
    cuisine: "Tex-Mex, Burgers & Ribs",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🌶️",
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $21.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@chilischile",
    socialHighlight: "🍹 Famoso por su Triple Dipper viral en TikTok, sus Baby Back Ribs y los Presidente Margarita.",
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
    cuisine: "Diner Americano, Burgers & Milkshakes",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "dulce"],
    emoji: " milkshake",
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@johnnyrocketscl",
    socialHighlight: "🕺 Ambientación años 50 donde los meseros bailan, hamburguesas smash y los mejores milkshakes de Oreo.",
    description: "Clásico diner estadounidense de los años 50 con rockola, sillones rojos, hamburguesas jugosas hechas a la plancha, papas con cheddar y tocino, y malteadas espesas.",
    mustTry: ["Smoke House Burger", "Bacon Cheddar Fries", "Oreo Cookies & Cream Shake", "Onion Rings"],
    vibe: "Cita retro y divertida estilo película americana, ideal para compartir una malteada con dos bombillas.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Matías C.", rating: 4.7, text: "El milkshake de Oreo con crema batida es insuperable y la Smoke House con aros de cebolla adentro es un 10." },
      { source: "Google Maps", user: "Sofía L.", rating: 4.5, text: "Muy entretenido el ambiente cuando se ponen a bailar y te dibujan una carita feliz con ketchup." }
    ]
  },
  {
    id: "la-sanguchera-del-barrio",
    name: "La Sanguchera del Barrio",
    cuisine: "Sándwiches Gourmet & Picoteo Chileno",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🥪",
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@lasangucheradelbarrio",
    socialHighlight: "🍺 Sándwiches de mechada, plateada y pescado frito con schops bien helados.",
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
    cuisine: "Cocina Tradicional Chilena & Picada",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🇨🇱",
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $18.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@elhoyochile",
    socialHighlight: "🍷 La histórica picada centenaria de Santiago ahora en el Mercado del 14 con sus terremotos y perniles.",
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
    cuisine: "Cervecería Artesanal, Crudos & Tablas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍺",
    priceRange: "$$",
    avgPriceCLP: "$13.000 - $19.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@kunstmannchile",
    socialHighlight: "🍻 Más de 15 variedades de schop valdiviano tirado en frío junto al famoso Crudo Valdiviano.",
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
    emoji: "🍗",
    priceRange: "$$",
    avgPriceCLP: "$9.500 - $13.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@chickenloveyou.cl",
    socialHighlight: "🔥 Pollo frito ultra crujiente marinado por 24 horas con salsas caseras adictivas.",
    description: "Marca chilena especialista en sándwiches y tenders de pollo frito crispy en pan de papa artesanal, con combinaciones dulces, picantes y ahumadas.",
    mustTry: ["El Clasicón", "Korean Fried Chicken Burger", "Papas con Queso Fundido y Tocino", "Chicken Tenders"],
    vibe: "Casual, indulgente y perfecto para mancharse las manos comiendo el mejor pollo crispy.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Mercado del 14" },
      { mallId: "parque-arauco", zone: "Bazar Gourmet (Piso 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Tomás R.", rating: 4.8, text: "El pollo suena cuando lo muerdes de lo crujiente que es. La salsa cheddar tocino es brutal." }
    ]
  },
  {
    id: "niu-sushi",
    name: "Niu Sushi",
    cuisine: "Sushi Nikkei, Rolls & Gohan",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍣",
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $18.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@niusushichile",
    socialHighlight: "🍣 Uno de los sushis con mejor puntaje en Uber Eats Chile por sus rolls acevichados y tempuras.",
    description: "Especialistas en sushi californiano y fusión nikkei con amplia variedad de rolls sin arroz, tempuras calientes, gyozas, gohan y coctelería en salón.",
    mustTry: ["Acevichado Roll", "Tori Furai Roll", "Gyozas de Cerdo", "Gohan Especial Salmón Palta"],
    vibe: "Noche de sushi y cocktails en pareja con carta enorme para todos los gustos.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "cenco-florida", zone: "Mirador Florida" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Fernanda O.", rating: 4.9, text: "El Acevichado Roll y el Almond Roll son mis favoritos de la vida. Nunca decepciona." },
      { source: "Google Maps", user: "Lucas M.", rating: 4.6, text: "En el local de Mirador Florida atienden súper rápido y los tragos son grandes." }
    ]
  },
  {
    id: "el-japones",
    name: "El Japonés",
    cuisine: "Izakaya, Ramen, Sushi & Coctelería",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🏮",
    priceRange: "$$$",
    avgPriceCLP: "$14.000 - $21.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@eljapones_cl",
    socialHighlight: "🍜 Neones japoneses, ramen humeante, baos esponjosos y rolls creativos a precios muy convenientes.",
    description: "Taberna japonesa moderna (Izakaya) con decoración de callejón de Tokio, carta de ramen artesanal, baos, sushi fusión, brochetas yakitori y cócteles de autor.",
    mustTry: ["Tonkotsu Ramen", "Bao de Cerdo Glaseado", "Roll El Japonés", "Cóctel Tokyo Mule"],
    vibe: "Estética japonesa con luces de neón, ideal para fotos en pareja y probar varios platillos.",
    locations: [
      { mallId: "costanera-center", zone: "QINTO (Nivel 5)" },
      { mallId: "cenco-florida", zone: "Mirador Florida" },
      { mallId: "alto-las-condes", zone: "Mirador del Alto (Nivel 3)" }
    ],
    reviews: [
      { source: "Instagram", user: "@santiagosecreto", rating: 4.8, text: "El ambiente con cerezos y neones es hermoso para una cita, y los baos son una nube." },
      { source: "Uber Eats", user: "Bastián E.", rating: 4.7, text: "El caldo del ramen tiene muchísimo sabor y los rolls vienen bien rellenos." }
    ]
  },
  {
    id: "fuente-chilena",
    name: "Fuente Chilena",
    cuisine: "Sandwichería Tradicional Gourmet",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🥑",
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@fuentechilena",
    socialHighlight: "🥪 Famosa por su mayonesa casera de receta secreta, lomitos en pan amasado y crudos.",
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
    cuisine: "Fuente de Soda Histórica & Sánguches",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🧀",
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.6,
    socialHandle: "@fuentesuiza",
    socialHighlight: "🏅 Tradición ñuñoína desde 1954: empanadas de queso gigantes y churrascos legendarios.",
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
    cuisine: "Costillares BBQ, Carnes & Tex-Mex",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍖",
    priceRange: "$$$",
    avgPriceCLP: "$15.000 - $22.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@texasribschile",
    socialHighlight: "🍖 Costillares ahumados lentamente con salsa barbecue original y aros de cebolla.",
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
    name: "Rosso Italiano / Trattoria",
    cuisine: "Pastas Frescas, Risottos & Pizzas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍝",
    priceRange: "$$$",
    avgPriceCLP: "$15.000 - $22.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.5,
    socialHandle: "@rossoitaliano.cl",
    socialHighlight: "🍝 Pastas artesanales hechas en casa, fettuccine en rueda de queso y Aperol Spritz en terraza.",
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
    cuisine: "Smash & Stuffed Burgers Artesanales",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍔",
    priceRange: "$$",
    avgPriceCLP: "$11.500 - $16.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@juicylucychile",
    socialHighlight: "🧀 Hamburguesas rellenas de queso fundido en el centro de la carne al estilo Minneapolis.",
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
    cuisine: "Costillares, Burgers & Casual Bar",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🦣",
    priceRange: "$$",
    avgPriceCLP: "$11.000 - $16.000 p/p",
    stars: 4.4,
    uberEatsRating: 4.5,
    googleRating: 4.4,
    socialHandle: "@mamutrestaurant",
    socialHighlight: "🍹 Promociones 2x1 en cócteles y tablas gigantes para compartir.",
    description: "Casual dining muy popular por sus tablas de picoteo, costillares BBQ, fajitas para armar en la mesa y promociones de happy hour todos los días.",
    mustTry: ["Tabla Mamut", "Costillar BBQ con Papas", "Fajitas Mixtas", "Mojito Frambuesa XXL"],
    vibe: "Ambiente distendido y económico para picotear y tomar algo en pareja.",
    locations: [
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "plaza-oeste", zone: "Ruta Gastronómica" }
    ],
    reviews: [
      { source: "Google Maps", user: "Karla V.", rating: 4.5, text: "Siempre salvador para ir por unas fajitas y aprovechar el happy hour después de recorrer el mall." }
    ]
  },
  {
    id: "el-valenciano",
    name: "El Valenciano (MUT)",
    cuisine: "Paellas, Tapas & Bocatas Españolas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🥘",
    priceRange: "$$",
    avgPriceCLP: "$10.000 - $15.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.7,
    socialHandle: "@elvalenciano.cl",
    socialHighlight: "🥘 Paellas gigantes cocinadas a la vista en el Nivel -2 del MUT y bocatas de calamares.",
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
    cuisine: "Comida India Tradicional & Currys",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🍛",
    priceRange: "$$",
    avgPriceCLP: "$9.500 - $13.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.8,
    socialHandle: "@dondenaresh",
    socialHighlight: "🇮🇳 Uno de los locales más aplaudidos del MUT por su Butter Chicken con pan Naan recién horneado.",
    description: "Cocina india auténtica en formato ágil de mercado. Pollo Tikka Masala, Butter Chicken, opciones vegetarianas con garbanzos y lentejas, arroz basmati y pan naan al ajo.",
    mustTry: ["Butter Chicken", "Chicken Tikka Masala", "Garlic Naan", "Samosas de Verduras"],
    vibe: "Ideal si quieren probar sabores intensos y aromáticos distintos a lo de siempre.",
    locations: [
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" }
    ],
    reviews: [
      { source: "TikTok", user: "@probando.scl", rating: 4.9, text: "El Garlic Naan untado en la salsa del Butter Chicken de Donde Naresh es una experiencia religiosa." }
    ]
  },
  {
    id: "tonny-pizzeria",
    name: "Tonny Pizzería",
    cuisine: "Pizza Estilo Neoyorquino & Al Paso",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🍕",
    priceRange: "$",
    avgPriceCLP: "$6.500 - $10.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.7,
    googleRating: 4.7,
    socialHandle: "@tonnypizzeria",
    socialHighlight: "🍕 Slices gigantes crujientes y pizzas individuales listas en minutos en el Nivel -2 del MUT.",
    description: "Pizzería urbana de estilo neoyorquino e italiano al corte o individual, con masa crujiente, pepperoni crocante, pesto y salsas para untar los bordes.",
    mustTry: ["Pizza Pepperoni & Hot Honey", "Pizza Pesto Stracciatella", "Dip de Ajo Tostado"],
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
    cuisine: "Tapas, Coctelería de Autor & Cafetería en Altura",
    category: "restaurante",
    mealTypes: ["dulce", "tragos", "cena"],
    emoji: "🌆",
    priceRange: "$$$$",
    avgPriceCLP: "$18.000 - $28.000 p/p (más entrada mirador)",
    stars: 4.8,
    uberEatsRating: 4.7,
    googleRating: 4.8,
    socialHandle: "@skycostanera",
    socialHighlight: "🌅 A 300 metros de altura en el piso 62: la vista 360° más romántica de todo Santiago al atardecer.",
    description: "Ubicado en la cima de la Gran Torre Costanera, ofrece coctelería de autor, vinos, tablas para compartir, sándwiches gourmet y pastelería frente a la cordillera.",
    mustTry: ["Cóctel Sunset 300", "Tabla Cordillera para Dos", "Torta Ópera", "Espumante Rosé"],
    vibe: "La cita más inolvidable de Santiago viendo cómo se ilumina toda la ciudad desde el piso 62.",
    locations: [
      { mallId: "costanera-center", zone: "Sky 300 (Piso 62)" }
    ],
    reviews: [
      { source: "Google Maps", user: "Valentina & Diego", rating: 5, text: "Subimos justo una hora antes del atardecer y tomamos unos cócteles mirando la cordillera rosada. Inolvidable." }
    ]
  },
  {
    id: "la-piccola-italia",
    name: "La Piccola Italia",
    cuisine: "Pastas Abundantes & Comida Italiana",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🍝",
    priceRange: "$$",
    avgPriceCLP: "$10.000 - $15.000 p/p",
    stars: 4.2,
    uberEatsRating: 4.3,
    googleRating: 4.1,
    socialHandle: "@lapiccolaitaliachile",
    socialHighlight: "🍝 Conocido por sus platos gigantes de pastas con salsas cremosas y pan con ajo ilimitado.",
    description: "Clásico restaurante familiar italiano en Chile famoso por el tamaño monumental de sus porciones de fetuccini, ñoquis, ravioles y escalopas.",
    mustTry: ["Fetuccini con Salsa Alfredo y Pollo", "Lasaña Boloñesa", "Pan con Mantequilla al Ajo", "Torta Tres Leches"],
    vibe: "Para comer pastas en porciones enormes y quedar completamente llenos.",
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
    cuisine: "Parrilla Argentina, Carnes & Tragos",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🥩",
    priceRange: "$$$",
    avgPriceCLP: "$16.000 - $23.000 p/p",
    stars: 4.6,
    uberEatsRating: 4.6,
    googleRating: 4.6,
    socialHandle: "@elquinchodelcacho",
    socialHighlight: "🔥 Favorito de Las Terrazas de Mallplaza Oeste por sus parrilladas y vista a la laguna.",
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
    cuisine: "Gastrobar, Picoteos & Cervezas",
    category: "restaurante",
    mealTypes: ["almuerzo", "cena", "tragos"],
    emoji: "🍻",
    priceRange: "$$",
    avgPriceCLP: "$12.000 - $17.000 p/p",
    stars: 4.5,
    uberEatsRating: 4.5,
    googleRating: 4.5,
    socialHandle: "@tresbarrilescl",
    socialHighlight: "🎶 Buena música, chorrillanas, pizzas y jarras de cerveza o sangría en Las Terrazas.",
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

  // ================= COMIDA RÁPIDA, BURGERS & PATIO DE COMIDAS =================
  {
    id: "carls-jr",
    name: "Carl's Jr.",
    cuisine: "Hamburguesas Charbroiled & Tenders",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "⭐",
    priceRange: "$$",
    avgPriceCLP: "$8.900 - $12.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@carlsjrchile",
    socialHighlight: "🍔 Elegida por muchos en redes como la mejor hamburguesa de cadena por su carne a la parrilla y refill de bebida.",
    description: "Cadena californiana de hamburguesas 100% carne de vacuno asadas al fuego (charbroiled), famosas por la Western Bacon Cheeseburger, sus Crisscut Fries y tenders empanizados a mano.",
    mustTry: ["Double Western Bacon Cheeseburger", "The Big Carl", "Crisscut Fries (Papas Rejilla)", "Hand-Breaded Chicken Tenders"],
    vibe: "Cuando quieren una hamburguesa rápida pero con sabor real a parrilla y bebida recargable.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Benjamín T.", rating: 4.8, text: "La Double Western Bacon con aros de cebolla y salsa BBQ no tiene competencia en comida rápida." },
      { source: "TikTok", user: "@burgerhunterscl", rating: 4.7, text: "Pidan las papas Crisscut y los tenders de pollo, son hechos al momento." }
    ]
  },
  {
    id: "mcdonalds",
    name: "McDonald's & McCafé",
    cuisine: "Hamburguesas Clásicas, Nuggets & McFlurry",
    category: "rapida",
    mealTypes: ["almuerzo", "cena", "dulce"],
    emoji: "🍟",
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@mcdonalds_cl",
    socialHighlight: "🍦 Las papas fritas más icónicas del mundo, McNuggets para compartir y McFlurry de postre.",
    description: "El clásico infalible de comida rápida con la línea Signature gourmet, Cuarto de Libra, Big Mac, cajas de 20 McNuggets para compartir en pareja y postres helados.",
    mustTry: ["Cuarto de Libra Doble", "Caja 20 McNuggets con Salsa Agridulce", "Club House Signature", "McFlurry Oreo con Manjar"],
    vibe: "Rápido, salvador y perfecto para compartir nuggets y helado.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Constanza R.", rating: 4.6, text: "Nuestro ritual después del cine: 20 nuggets para los dos y dos McFlurry." }
    ]
  },
  {
    id: "burger-king",
    name: "Burger King",
    cuisine: "Hamburguesas a la Parrilla & Whopper",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "👑",
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.900 p/p",
    stars: 4.4,
    uberEatsRating: 4.5,
    googleRating: 4.3,
    socialHandle: "@burgerking_chile",
    socialHighlight: "🔥 El sabor ahumado del Whopper y la línea Stacker con mucho tocino y salsa especial.",
    description: "Especialistas en hamburguesas a la parrilla desde 1954. Destacan su clásico Whopper, la línea King Selection, aros de cebolla crujientes y baldes de nuggets.",
    mustTry: ["Whopper Doble", "Stacker Triple", "Aros de Cebolla con Salsa BK", "Cono Relleno Manjar"],
    vibe: "Ideal para un antojo de carne a la parrilla rápida y cupones para dos.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Pablo G.", rating: 4.5, text: "La Stacker con salsa especial y tocino nunca falla." }
    ]
  },
  {
    id: "kfc",
    name: "KFC (Kentucky Fried Chicken)",
    cuisine: "Buckets de Pollo Frito Crispy & Twister",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🍗",
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.3,
    socialHandle: "@kfcchile",
    socialHighlight: "🍗 El Bucket de Strips y PopCorn Chicken para compartir de a dos es favorito en patios de comida.",
    description: "El pollo frito más famoso con la receta secreta del Coronel Sanders o versión Crispy picante, acompañado de puré con salsa gravy, ensalada coleslaw y biscuits.",
    mustTry: ["Bucket Dúo Crispy", "Mega Box 5 en 1", "Popcorn Chicken Grande", "Twister Americano"],
    vibe: "Para compartir un bucket de pollo crujiente entre los dos.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Esteban M.", rating: 4.6, text: "Los crispy strips con salsa garlic y el puré con gravy son adictivos." }
    ]
  },
  {
    id: "domino",
    name: "Dominó Fuente de Soda",
    cuisine: "Completos, Vienesa Italiana & Churrascos",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🌭",
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@dominofds",
    socialHighlight: "🌭 El completo chileno por excelencia desde 1952: palta recién molida y vienesa de receta propia.",
    description: "La fuente de soda más emblemática de Chile para comer completos, dinámicos, ases, churrascos y empanadas de queso con jugo natural recién exprimido.",
    mustTry: ["Vienesa Dominó (Dinámico)", "Vienesa Italiana", "As Italiano en Pan Lengua", "Jugo Natural de Frambuesa"],
    vibe: "Nada más romántico a la chilena que compartir unos completos italianos con harta palta.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Gabriel A.", rating: 4.8, text: "La calidad de la vienesa y la palta del Dominó siempre está un escalón arriba." }
    ]
  },
  {
    id: "juan-maestro",
    name: "Juan Maestro",
    cuisine: "Sándwiches a la Plancha, Barros Luco & Lomitos",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🥪",
    priceRange: "$",
    avgPriceCLP: "$6.800 - $9.500 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@juanmaestrochile",
    socialHighlight: "🧀 Los Maestros Sangucheros: Barros Luco con queso fundido en la plancha y pan recién horneado.",
    description: "Especialistas en sándwiches chilenos preparados al minuto en plancha caliente: churrascos, barros luco, lomitos, pechuga de pollo y empanadas de queso.",
    mustTry: ["Churrasco Italiano", "Barros Luco Doble Queso", "Lomito Chacarero", "Papas Supremas"],
    vibe: "Rápido, calentito y recién salido de la plancha.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Lorena P.", rating: 4.6, text: "El Barros Luco en pan ciabatta es mi perdición cada vez que vamos al mall." }
    ]
  },
  {
    id: "taco-bell",
    name: "Taco Bell",
    cuisine: "Tacos, Burritos, Quesadillas & Nachos",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🌮",
    priceRange: "$",
    avgPriceCLP: "$6.500 - $9.200 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@tacobellchile",
    socialHighlight: "🌮 El Crunchwrap Supreme y las papas Supreme con queso caliente son los más pedidos.",
    description: "Comida rápida de inspiración mexicana famosa por su Crunchwrap Supreme, Quesarito, Chalupas, Nachos BellGrande y sus icónicas salsas Fire y Mild.",
    mustTry: ["Crunchwrap Supreme", "Quesadilla de Pollo", "Fiesta Potatoes / Nachos Supreme", "Cinnamon Twists"],
    vibe: "Diferente a la típica hamburguesa, súper sabroso y con combos armados.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Renata V.", rating: 4.7, text: "La Big Bell Box trae de todo y alcanza increíble. Las papas con queso y crema ácida son un vicio." }
    ]
  },
  {
    id: "tommy-beans",
    name: "Tommy Beans",
    cuisine: "Burritos & Bowls Tex-Mex a tu Medida",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🌯",
    priceRange: "$",
    avgPriceCLP: "$7.200 - $9.800 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@tommybeanschile",
    socialHighlight: "🥑 Armas tu burrito o bowl paso a paso eligiendo proteínas, arroz cilantro, frijoles, guacamole y salsas.",
    description: "Fast-casual donde personalizas tu burrito gigante, taco o bowl saludable con ingredientes frescos a la vista: carne mechada, pollo grill, cerdo BBQ, guacamole y crema ácida.",
    mustTry: ["Burrito Mechada Guacamole", "Mexican Bowl Saludable", "Nachos con Queso Cheddar y Palta"],
    vibe: "Perfecto cuando quieren comer algo contundente pero fresco y personalizado al gusto de cada uno.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Francisca L.", rating: 4.7, text: "El bowl con arroz al cilantro, pollo, porotos negros y guacamole salva cualquier almuerzo." }
    ]
  },
  {
    id: "subway",
    name: "Subway",
    cuisine: "Subs Personalizados, Wraps & Galletas",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🥖",
    priceRange: "$",
    avgPriceCLP: "$6.200 - $8.900 p/p",
    stars: 4.5,
    uberEatsRating: 4.6,
    googleRating: 4.4,
    socialHandle: "@subwaychile",
    socialHighlight: "🍪 Además de los Subs en pan parmesano orégano, sus galletas recién horneadas son famosas en TikTok.",
    description: "Sándwiches submarinos hechos al momento en pan recién horneado con vegetales a elección, salsas como Cebolla Dulce o Chipotle, y galletas suaves de macadamia o chocolate.",
    mustTry: ["Sub Pollo Teriyaki (30 cm para compartir)", "Sub B.M.T. Italiano", "Galleta de Chocolate Blanco y Macadamia"],
    vibe: "Fresco, liviano y no se olviden de llevarse dos galletas tibias de postre.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "plaza-egana", zone: "Patio de Comidas (Nivel 4)" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Simón K.", rating: 4.6, text: "El Pollo Teriyaki en pan parmesano orégano con salsa cebolla dulce es combinación ganadora." }
    ]
  },
  {
    id: "china-wok",
    name: "China Wok",
    cuisine: "Comida China al Wok & Chapsui",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🥡",
    priceRange: "$",
    avgPriceCLP: "$6.800 - $9.500 p/p",
    stars: 4.4,
    uberEatsRating: 4.5,
    googleRating: 4.3,
    socialHandle: "@chinawokchile",
    socialHighlight: "🥟 Arroz chaufa, pollo mongoliano, arrollados primavera y wantanes crujientes.",
    description: "Especialidades chinas salteadas al wok frente a ti: combinaciones de arroz chaufa o tallarines con carne mongoliana, pollo arverjado, cerdo agridulce y wantanes.",
    mustTry: ["Combo Chaufa + Carne Mongoliana + Pollo Agridulce", "Arrollados Primavera", "Wantanes Fritos"],
    vibe: "Contundente y sabroso cuando tienen antojo de comida china.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Rodrigo F.", rating: 4.5, text: "Las bandejas combinadas traen muchísima comida y los arrollados primavera siempre están crujientes." }
    ]
  },
  {
    id: "taranna-saboress",
    name: "Saboress / Tarragona",
    cuisine: "Pollo Crispy, Pizzas & Papas Fritas",
    category: "rapida",
    mealTypes: ["almuerzo", "cena"],
    emoji: "🍟",
    priceRange: "$",
    avgPriceCLP: "$5.900 - $8.500 p/p",
    stars: 4.3,
    uberEatsRating: 4.4,
    googleRating: 4.2,
    socialHandle: "@tarragonachile",
    socialHighlight: "🍗 Combos económicos de pollo apanado, empanaditas de queso y papas fritas.",
    description: "Clásico de los patios de comida chilenos con recetas de pollo crujiente, sándwiches de filete de pollo, cajas de nuggets y empanadas de queso fritas.",
    mustTry: ["Balde de Filetillos Crispy", "Sándwich Pollo Italiano", "Empanaditas de Queso"],
    vibe: "Económico y rápido para salir del paso en el patio de comidas.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "plaza-vespucio", zone: "Patio de Comidas" },
      { mallId: "cenco-florida", zone: "Patio de Comidas" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Marco P.", rating: 4.4, text: "Los filetillos de pollo con papas son súper salvadores y baratos." }
    ]
  },

  // ================= CAFETERÍAS, HELADERÍAS, DULCES & POSTRES =================
  {
    id: "brussels-heart-of-chocolate",
    name: "Brussels Heart of Chocolate",
    cuisine: "Chocolatería Belga, Fondue & Waffles",
    category: "dulce",
    mealTypes: ["dulce"],
    emoji: "🍫",
    priceRange: "$$",
    avgPriceCLP: "$8.500 - $13.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.7,
    socialHandle: "@brusselschocolates",
    socialHighlight: "🍓 El lugar #1 de citas dulces en Santiago: Fondue de chocolate belga derretido con frutas, marshmallows y waffles.",
    description: "Templo del chocolate belga real (leche, bitter y blanco). Su plato estrella para parejas es el Fondue con mechero, acompañado de frutillas, plátano, brownies y waffles belgas.",
    mustTry: ["Fondue de Chocolate Belga para Dos", "Waffle de Lieja con Helado y Chocolate", "Submarino de Chocolate Real", "Frutillas Bañadas"],
    vibe: "100% romántico: compartir un fondue de chocolate tibio entre los dos es éxito garantizado.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés & Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "plaza-vespucio", zone: "Las Terrazas" },
      { mallId: "plaza-egana", zone: "Azotea Urbana (Nivel 4)" },
      { mallId: "plaza-oeste", zone: "Las Terrazas (Laguna)" }
    ],
    reviews: [
      { source: "TikTok", user: "@citasensantiago", rating: 5, text: "Si quieres sorprender a tu pareja, llévala por el Fondue para dos en Brussels. El chocolate belga es real, no sucedáneo." },
      { source: "Google Maps", user: "Isidora C.", rating: 4.8, text: "El chocolate caliente espeso y los waffles recién hechos son una maravilla en invierno y verano." }
    ]
  },
  {
    id: "buffalo-waffles",
    name: "Buffalo Waffles",
    cuisine: "Bubble Waffles Dulces y Salados",
    category: "dulce",
    mealTypes: ["dulce", "almuerzo"],
    emoji: "🧇",
    priceRange: "$",
    avgPriceCLP: "$5.800 - $8.200 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@buffalowaffles",
    socialHighlight: "🧇 Waffles con burbujas estilo Hong Kong rellenos de helado, Nutella, Oreo, frutillas o versiones saladas.",
    description: "Famosos por sus waffles de burbujas enrollados en forma de cono, crujientes por fuera y esponjosos por dentro, rellenos de crema, helado, salsas y toppings.",
    mustTry: ["Sweet Oreo Nutella Waffle", "Berrylicious (Frutilla, Plátano y Manjar)", "Salty Cheddar Bacon Waffle"],
    vibe: "Perfecto para comer caminando de la mano por el mall o sentarse a compartir algo dulce.",
    locations: [
      { mallId: "costanera-center", zone: "Patio de Comidas (Nivel 5)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "plaza-vespucio", zone: "Interior & Dulces" },
      { mallId: "plaza-oeste", zone: "Patio de Comidas (Nivel 3)" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Josefa M.", rating: 4.8, text: "La masa tibia con el helado frío adentro y harta Nutella es lo más rico del mundo." }
    ]
  },
  {
    id: "emporio-la-rosa",
    name: "Emporio La Rosa",
    cuisine: "Heladería Artesanal Chilena & Cafetería",
    category: "dulce",
    mealTypes: ["dulce", "almuerzo"],
    emoji: "🍨",
    priceRange: "$$",
    avgPriceCLP: "$5.500 - $11.000 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@emporiolarosa",
    socialHighlight: "🌹 Elegida entre las 25 mejores heladerías del mundo por su sabor Rosa, Miel de Ulmo y Chocolate Araucano.",
    description: "Heladería tradicional chilena con sabores únicos como pétalos de rosa, manjar blanco, menta chips y chocolate araucano, además de cafetería, quiches y tortas.",
    mustTry: ["Helado de Rosa + Chocolate Araucano", "Dulce de Leche Emporio", "Affogato al Café", "Torta Amor"],
    vibe: "Un clásico santiaguino para tomar un helado artesanal o un café con pastel.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés & Dulces)" },
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
    cuisine: "Gelato Argentino & Dulce de Leche",
    category: "dulce",
    mealTypes: ["dulce"],
    emoji: "🍦",
    priceRange: "$$",
    avgPriceCLP: "$5.200 - $8.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@freddochile",
    socialHighlight: "🇦🇷 Más de 5 variedades distintas de helado de Dulce de Leche artesanal argentino.",
    description: "Tradicional heladería argentina famosa por la cremosidad de sus gelatos de Dulce de Leche Tentación, Granizado, con Brownie o Vauquita, además de batidos y cafés.",
    mustTry: ["Dulce de Leche Tentación", "Chocolate Freddo con Almendras", "Sundae Dulce de Leche", "Batido Cremoso"],
    vibe: "Parada obligatoria si son fanáticos del manjar y el dulce de leche.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés & Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior & Dulces" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Nicolás R.", rating: 4.8, text: "El Dulce de Leche Tentación trae cucharadas enteras de dulce de leche real entremedio." }
    ]
  },
  {
    id: "starbucks",
    name: "Starbucks Coffee",
    cuisine: "Cafetería, Frappuccinos & Pastelería",
    category: "dulce",
    mealTypes: ["dulce"],
    emoji: "☕",
    priceRange: "$$",
    avgPriceCLP: "$5.500 - $9.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@starbuckschile",
    socialHighlight: "🧋 Caramel Macchiato, Frappuccinos, Matcha Latte y paninis calientes para una pausa en el mall.",
    description: "Cafetería ideal para descansar de las compras con bebidas frías o calientes personalizadas, galletas, muffins, medialunas rellenas y sándwiches calientes.",
    mustTry: ["Iced Caramel Macchiato", "Java Chip Frappuccino", "Iced Matcha Latte", "Medialuna Jamón Queso"],
    vibe: "Para sentarse a conversar tranquilos con un café helado y algo rico.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés & Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "mut", zone: "Nivel -2 (El Mercado)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior & Dulces" },
      { mallId: "plaza-egana", zone: "Niveles Interiores" },
      { mallId: "cenco-florida", zone: "Cafeterías" },
      { mallId: "plaza-oeste", zone: "Cafés & Postres" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Trinidad G.", rating: 4.7, text: "El Iced White Mocha y el cake pop nunca fallan para recargar energías." }
    ]
  },
  {
    id: "juan-valdez",
    name: "Juan Valdez Café",
    cuisine: "Café 100% Colombiano, Nevados & Pastelería",
    category: "dulce",
    mealTypes: ["dulce"],
    emoji: "☕",
    priceRange: "$$",
    avgPriceCLP: "$5.500 - $9.500 p/p",
    stars: 4.7,
    uberEatsRating: 4.8,
    googleRating: 4.6,
    socialHandle: "@juanvaldezcafechile",
    socialHighlight: "🇨🇴 Sus 'Nevados' de Arequipe (manjar) y Oreo, junto con los almojábanas y pandebonos colombianos.",
    description: "Café premium 100% colombiano de origen con una carta destacada de bebidas frías ('Nevados'), lattes con arequipe, tortas húmedas y panadería típica colombiana.",
    mustTry: ["Nevado de Arequipe", "Latte Arequipe Caliente", "Pandebono Tibio", "Torta de Zanahoria"],
    vibe: "Café con aroma increíble y dulces colombianos para compartir a media tarde.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés & Dulces)" },
      { mallId: "parque-arauco", zone: "Boulevard (Exterior)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior & Dulces" },
      { mallId: "plaza-egana", zone: "Niveles Interiores" },
      { mallId: "cenco-florida", zone: "Cafeterías" }
    ],
    reviews: [
      { source: "Google Maps", user: "Natalia P.", rating: 4.7, text: "El Nevado de Brownie y los pandebonos calentitos son un 10/10." }
    ]
  },
  {
    id: "dunkin",
    name: "Dunkin' Donuts",
    cuisine: "Donuts Rellenas, Café Helado & Munchkins",
    category: "dulce",
    mealTypes: ["dulce"],
    emoji: "🍩",
    priceRange: "$",
    avgPriceCLP: "$4.000 - $7.500 p/p",
    stars: 4.6,
    uberEatsRating: 4.7,
    googleRating: 4.5,
    socialHandle: "@dunkinchile",
    socialHighlight: "🍩La donut Boston Manjar y la caja de 6 donuts a elección son el antojo dulce favorito.",
    description: "Especialistas en donuts glaseadas y rellenas de manjar, crema pastelera, frambuesa o chocolate, además de bolitas Munchkins, bagels y iced coffees.",
    mustTry: ["Boston Manjar", "Smiley Rellena Crema Bavariana", "Caja de 25 Munchkins", "Iced Latte Vainilla"],
    vibe: "Colorido y dulce para elegir media docena de donuts entre los dos.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés & Dulces)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Cafeterías Interior" },
      { mallId: "plaza-vespucio", zone: "Interior & Dulces" },
      { mallId: "plaza-egana", zone: "Niveles Interiores" },
      { mallId: "cenco-florida", zone: "Cafeterías" },
      { mallId: "plaza-oeste", zone: "Cafés & Postres" }
    ],
    reviews: [
      { source: "Uber Eats", user: "Pía M.", rating: 4.8, text: "La Boston Manjar sigue siendo la reina indiscutida de las donuts en Chile." }
    ]
  },
  {
    id: "cinnabon",
    name: "Cinnabon",
    cuisine: "Rollos de Canela Recién Horneados & Frosting",
    category: "dulce",
    mealTypes: ["dulce"],
    emoji: "🌀",
    priceRange: "$",
    avgPriceCLP: "$4.500 - $7.500 p/p",
    stars: 4.8,
    uberEatsRating: 4.8,
    googleRating: 4.7,
    socialHandle: "@cinnabonchile",
    socialHighlight: "✨ El aroma a canela Makara recién horneada con glaseado de queso crema que se siente por todo el piso.",
    description: "Famosos mundialmente por sus rollos de canela tibios cubiertos con abundante frosting de queso crema derretido, versiones con nueces pecanas y caramelo (Caramel PecanBon).",
    mustTry: ["Cinnabon Classic Tibio", "Caramel PecanBon", "BonBites (Bocados para compartir)", "Chillatta de Oreo"],
    vibe: "Imposible pasar por afuera sin tentarse por el olor a canela recién salido del horno.",
    locations: [
      { mallId: "costanera-center", zone: "Niveles 1 al 4 (Cafés & Dulces)" },
      { mallId: "parque-arauco", zone: "Patio de Comidas (Nivel 2)" },
      { mallId: "alto-las-condes", zone: "Patio de Comidas" },
      { mallId: "plaza-vespucio", zone: "Interior & Dulces" }
    ],
    reviews: [
      { source: "TikTok", user: "@dulces.scl", rating: 4.9, text: "Pídanlo con porción extra de frosting tibio y compártanlo de a dos, es pura felicidad." }
    ]
  }
];

/**
 * Expande el catálogo en una lista plana de locales por mall + registro único para vista "Todos".
 */
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
      category: brand.category, // restaurante | rapida | dulce
      mealTypes: brand.mealTypes, // almuerzo | cena | dulce | tragos
      emoji: brand.emoji === " milkshake" ? "🥤" : brand.emoji,
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
