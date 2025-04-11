// src/i18n/index.js
import { createI18n } from "vue-i18n";
// import { ukLocale } from "/src/locales/uk.js";
// import { plLocale } from "/src/locales/pl.js";
// Instead of importing JSON files, define the objects directly
// Define UK locale content
const ukLocale = {
  common: {
    home: "Головна",
    products: "Товари",
    categories: "Категорії",
    cart: "Кошик",
    profile: "Профіль",
    login: "Увійти",
    logout: "Вийти",
    register: "Зареєструватися",
    search: "Пошук",
    translation_test: "Тест перекладів",
    current_locale: "Поточна мова",
    navigation: "Навігація",
    force_refresh: "Оновити сторінку",
    ukrainian: "Українська",
    polish: "Польська",
    loading: "Завантаження продуктів...",
    noProductsFound: "У цій категорії не знайдено товарів.",
    category: "Категорія",
    remove: "Видалити",
    or: "або",
    emailLabel: "Електронна пошта",
    passwordLabel: "Пароль",
    catalog: "Каталог",
    sale_delivery: "Оплата і доставка",
    garanty: "Гарантія та послуги",
    rent: "Оренда",
    stock: "Акції",
  },
  homeView: {
    residentialCommercialSolar: "Житлова та комерційна сонячна система",
    evChargersComponents: "Зарядні пристрої та компоненти для електромобілів",
    exploreNewCategories: "Досліджуйте нові категорії",
    solarPanels: "Сонячні Панелі",
    batteries: "Батареї",
    inverters: "Інвертори",
    solarSets: "Комплекти сонячних електростанцій",
    mountingSystems: "Система монтажу сонячних панелей",
    dcChargingStations: "Швидкі Зарядні Станції (DC)",
    acChargingStations: "Зарядні Станції Рівня 2 (AC)",
    portableChargingDevices: "Портативні/Мобільні Зарядні Пристрої",
    portablePowerStation: "Портативна електростанції",
    solarGenerators: "Cонячні генератори",
    portableSolarPanels: "Портативні сонячні панелі",
    cablesAndWires: "Кабелі електричні та дроти",
    generators: "Генератори",
    industrialGenerators:
      "Промислові генератори для важких навантажень (100 кВт+)",
    solarLightingTowers: "Освітлювальні вежі на сонячних батареях",
    liftsAndCranes: "Підйомники та Крани",
    rental: "Оренда",
    seeAll: "Переглянути всі",
  },
  login: {
    title: "Ласкаво просимо назад",
    subtitle: "Будь ласка, увійдіть, щоб продовжити.",
    tabLabel: "Вхід",
    googleBtn: "Продовжити з Google",
    appleBtn: "Продовжити з Apple",
    emailBtn: "Увійти за допомогою Email",
    emailPlaceholder: "Електронна пошта",
    passwordPlaceholder: "Пароль",
    forgotPassword: "Забули пароль?",
    enterEmailForReset: "Введіть вашу електронну пошту для скидання паролю",
    resetEmailSent: "Лист з інструкціями надіслано на вашу пошту",
    noAccount: "Не маєте облікового запису?",
    signUp: "Зареєструватися",
    terms: "Продовжуючи, ви погоджуєтеся з нашими",
    termsLink: "Умовами використання",
    privacyLink: "Політикою конфіденційності",
    and: "та",
  },
  register: {
    title: "Створити обліковий запис",
    subtitle: "Зареєструйтеся, щоб почати користуватися.",
    tabLabel: "Реєстрація",
    googleBtn: "Продовжити з Google",
    appleBtn: "Продовжити з Apple",
    nameLabel: "Ім'я",
    namePlaceholder: "Введіть ваше ім'я",
    confirmPasswordLabel: "Підтвердіть пароль",
    confirmPasswordPlaceholder: "Введіть пароль ще раз",
    submitBtn: "Зареєструватися",
    hasAccount: "Вже маєте обліковий запис?",
    signIn: "Увійти",
    passwordMismatch: "Паролі не співпадають",
  },
  product: {
    section_title: "Інформація про товар",
    price: "Ціна",
    quantity: "Кількість",
    available: "В наявності",
    outOfStock: "Немає в наявності",
    addToCart: "Додати в кошик",
    specifications: "Характеристики",
    description: "Опис",
    relatedProducts: "Схожі товари",
    reviews: "Відгуки",
    off: "знижки",
    taxInfo: "включаючи всі податки",
    fastDelivery: "Швидка доставка",
    daysExchange: "{days} днів на обмін",
    brand: "Бренд",
    model: "Модель",
    rent: "Орендувати",
    solarPanels: "Сонячні панелі",
    batteries: "АКБ",
    duration: {
      day: "День",
      week: "Тиждень",
      month: "Місяць",
    },
  },
  // Add header and footer sections for Ukrainian
  header: {
    menu: {
      solarSystem: "Сонячна система",
      evChargers: "Зарядні пристрої для електромобілів",
      portablePower: "Портативна енергія",
      generators: "Генератори",
      electricalComponents: "Електричні компоненти",
    },
    featured: {
      solar: "Популярні сонячні рішення",
      ev: "Топові зарядні станції",
      portable: "Портативні рішення для енергії",
      generators: "Генератори для будь-яких потреб",
      electrical: "Електричні компоненти та кабелі",
    },
    categories: {
      solarPanels: "Сонячні Панелі",
      batteries: "Аккумуляторні Батареї",
      inverters: "Інвертори",
      solarSets: "Комплекти сонячних електростанцій",
      mountingSystems: "Система монтажу сонячних панелей",
      evChargers: "Зарядні пристрої для електромобілів",
      cablesAdapters: "Кабелі та адаптери",
      chargingStations: "Зарядні станції",
      portablePowerStations: "Портативна електростанції",
      solarGenerators: "Cонячні генератори",
      portableSolarPanels: "Портативні сонячні панелі",
      industrialGenerators:
        "Промислові генератори для важких навантажень (100 кВт+)",
      solarLightingTowers: "Освітлювальні вежі на сонячних батареях",
      automaticSwitches: "Автоматичні вимикачі",
      cablesWires: "Кабелі електричні та дроти",
    },
  },
  footer: {
    company: "Компанія",
    about: "Про нас",
    contact: "Контакти",
    terms: "Умови використання",
    privacy: "Політика конфіденційності",
    copyright: "© {year} ScaleVolt. Всі права захищені.",
    cases: "Кейси клієнтів",
    products: "Продукти",
    sale: "Розпродаж",
    solarSets: "Сонячні набори",
    batteries: "Акумулятори",
    inverters: "Інвертори",
    customerSupport: "Підтримка клієнтів",
    aboutUs: "Про Нас",
    ourTeam: "Наша Команда",
    contactUs: "Зв'яжіться з нами",
    support: "Підтримка",
    faq: "Запитання й відповіді",
    career: "Кар'єра",
    jobs: "Вакансії",
    followUs: "Слідкуйте за нами",
  },
  delivery: {
    pageTitle: "Доставка, Гарантія та Повернення",
    deliveryTitle: "Доставка",
    standardDelivery: "Стандартна доставка",
    standardDeliveryDesc:
      "Ми здійснюємо доставку по всій території України через надійних партнерів: Нова Пошта, Укрпошта та Meest Express. Усі замовлення обробляються протягом 24 годин у робочі дні.",
    expressDelivery: "Експрес-доставка",
    expressDeliveryDesc:
      "Для термінових замовлень доступна експрес-доставка з прискореним терміном доставки. Ця послуга доступна не у всіх регіонах - перевірте доступність під час оформлення замовлення.",
    bulkOrders: "Оптові замовлення",
    bulkOrdersDesc:
      "Для великих або комерційних замовлень (понад 10 кВт сонячних панелей або більше 5 акумуляторів) ми пропонуємо спеціальні умови доставки. Будь ласка, <a href='/contact'>зв'яжіться з нашим відділом продажів</a> для отримання детальної інформації.",
    deliveryTimeTable: "Терміни доставки",
    region: "Регіон",
    standardTime: "Стандартний час",
    expressTime: "Експрес час",
    cost: "Вартість",
    days: "днів",
    day: "день",
    majorCities: "Великі міста (Київ, Львів, Одеса, Харків, Дніпро)",
    majorCitiesCost: "Безкоштовно від 10,000₴<br>150₴ для менших замовлень",
    otherRegions: "Інші обласні центри та міста",
    otherRegionsCost: "Безкоштовно від 15,000₴<br>200₴ для менших замовлень",
    remoteAreas: "Віддалені райони",
    remoteAreasCost: "Розраховується індивідуально",
    trackingTitle: "Відстеження замовлення",
    trackingDesc:
      "Після відправлення замовлення ви отримаєте електронний лист з номером для відстеження. Ви також можете перевірити статус вашого замовлення в <a href='/account'>особистому кабінеті</a>.",
  },
  warranty: {
    warrantyTitle: "Гарантія",
    standardWarranty: "Стандартна гарантія",
    standardWarrantyDesc:
      "Компанія SCALEVOLT надає гарантію на всі продукти згідно з українським законодавством. Додаткова розширена гарантія доступна для реєстрованих клієнтів.",
    warrantyPeriodTable: "Гарантійні терміни",
    productCategory: "Категорія продукту",
    warrantyPeriod: "Гарантійний термін",
    solarPanels: "Сонячні панелі",
    solarPanelsWarranty:
      "10 років стандартної гарантії, 25 років на продуктивність",
    batteries: "Акумулятори",
    batteriesWarranty: "5 років",
    inverters: "Інвертори",
    invertersWarranty: "5 років",
    accessories: "Аксесуари та дрібні компоненти",
    accessoriesWarranty: "1 рік",
    warrantyExclusions: "Гарантія не поширюється на",
    exclusion1:
      "Пошкодження, спричинені неправильним встановленням або використанням",
    exclusion2:
      "Звичайний знос або косметичні дефекти, які не впливають на функціональність",
    exclusion3:
      "Пошкодження через стихійні лиха, блискавки або перенапругу в мережі",
    exclusion4: "Модифікації або ремонт, виконаний неавторизованими особами",
    warrantyProcess: "Процес гарантійного обслуговування",
    warrantyProcessDesc:
      "Щоб подати гарантійну вимогу, будь ласка, <a href='/contact'>зв'яжіться з нашою службою підтримки</a> або заповніть форму гарантійної заявки в своєму особистому кабінеті. Після перевірки вашої заявки ми організуємо ремонт або заміну відповідно до наших гарантійних умов.",
  },
  returns: {
    returnsTitle: "Повернення",
    returnPolicy: "Політика повернення",
    returnPolicyDesc:
      "Згідно з Законом України 'Про захист прав споживачів', ви маєте право повернути товар належної якості протягом 14 днів з моменту отримання, якщо він не був у використанні і зберіг всі споживчі властивості, заводське пакування та комплектацію.",
    returnProcess: "Процес повернення",
    step1:
      "Заповніть заявку на повернення в особистому кабінеті або зв'яжіться з нашою службою підтримки.",
    step2:
      "Отримайте підтвердження заявки та інструкції щодо повернення продукту.",
    step3:
      "Надійно запакуйте товар у оригінальну упаковку із усіма аксесуарами та документацією.",
    step4:
      "Відправте товар за вказаною адресою або замовте курʼєрський забір (залежно від вартості замовлення).",
    step5:
      "Після отримання та перевірки товару, ми обробимо повернення коштів на ваш рахунок протягом 5-7 робочих днів.",
    nonReturnable: "Товари, що не підлягають поверненню",
    nonReturnable1: "Персоналізовані або індивідуально сконфігуровані системи",
    nonReturnable2: "Програмне забезпечення з порушеними цифровими пломбами",
    nonReturnable3: "Товари з явними слідами використання або пошкоджень",
    note: "Важливо зауважити",
    noteDesc:
      "Вартість доставки при поверненні товару належної якості сплачує покупець. У випадку повернення товару неналежної якості, доставка здійснюється за рахунок компанії SCALEVOLT.",
  },
  legal: {
    legalInformation: "Юридична інформація",
    legalDesc:
      "Наша політика доставки, гарантії та повернення відповідає законодавству України, включаючи Закон України 'Про захист прав споживачів' та інші відповідні нормативні акти.",
    contactInfo:
      "З юридичних питань, будь ласка, звертайтеся за адресою: <a href='mailto:legal@scalevolt.ua'>legal@scalevolt.ua</a>.",
  },
};
// Define PL locale content
const plLocale = {
  common: {
    home: "Strona główna",
    products: "Produkty",
    categories: "Kategorie",
    cart: "Koszyk",
    profile: "Profil",
    login: "Zaloguj się",
    logout: "Wyloguj się",
    register: "Zarejestruj się",
    search: "Szukaj",
    translation_test: "Test tłumaczeń",
    current_locale: "Aktualny język",
    navigation: "Nawigacja",
    force_refresh: "Odśwież stronę",
    ukrainian: "Ukraiński",
    polish: "Polski",
    loading: "Ładowanie produktów...",
    noProductsFound: "Nie znaleziono produktów w tej kategorii.",
    category: "Kategoria",
    remove: "Usuń",
    or: "lub",
    emailLabel: "Email",
    passwordLabel: "Hasło",
    catalog: "Katalog",
    sale_delivery: "Wyprzedaż i dostawa",
    garanty: "Gwarancja i zwroty",
    rent: "Wynajem",
    stock: "Akcje",
  },
  homeView: {
    residentialCommercialSolar: "Domowe i komercyjne systemy słoneczne",
    evChargersComponents: "Ładowarki i komponenty do pojazdów elektrycznych",
    exploreNewCategories: "Odkryj  nowe kategorie",
    solarPanels: "Panele słoneczne",
    batteries: "Akumulatory",
    inverters: "Falowniki",
    solarSets: "Zestawy elektrowni słonecznych",
    mountingSystems: "Systemy montażowe paneli słonecznych",
    dcChargingStations: "Szybkie stacje ładowania (DC)",
    acChargingStations: "Stacje ładowania poziomu 2 (AC)",
    portableChargingDevices: "Przenośne/mobilne urządzenia ładujące",
    portablePowerStation: "Przenośne elektrownie",
    solarGenerators: "Generatory słoneczne",
    portableSolarPanels: "Przenośne panele słoneczne",
    cablesAndWires: "Kable elektryczne i przewody",
    generators: "Generatory",
    industrialGenerators: "Przemysłowe generatory do dużych obciążeń (100 kW+)",
    solarLightingTowers: "Wieże oświetleniowe zasilane energią słoneczną",
    liftsAndCranes: "Podnośniki i dźwigi",
    rental: "Wynajem",
    seeAll: "Zobacz wszystko",
  },
  login: {
    title: "Witamy ponownie",
    subtitle: "Zaloguj się, aby kontynuować.",
    tabLabel: "Logowanie",
    googleBtn: "Kontynuuj z Google",
    appleBtn: "Kontynuuj z Apple",
    emailBtn: "Zaloguj się za pomocą Email",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Hasło",
    forgotPassword: "Zapomniałeś hasła?",
    enterEmailForReset: "Wprowadź swój adres email, aby zresetować hasło",
    resetEmailSent: "Email z instrukcjami został wysłany",
    noAccount: "Nie masz konta?",
    signUp: "Zarejestruj się",
    terms: "Kontynuując, zgadzasz się na nasze",
    termsLink: "Warunki korzystania z usługi",
    privacyLink: "Politykę prywatności",
    and: "i",
  },
  register: {
    title: "Utwórz konto",
    subtitle: "Zarejestruj się, aby rozpocząć korzystanie.",
    tabLabel: "Rejestracja",
    googleBtn: "Kontynuuj z Google",
    appleBtn: "Kontynuuj z Apple",
    nameLabel: "Imię",
    namePlaceholder: "Wprowadź swoje imię",
    confirmPasswordLabel: "Potwierdź hasło",
    confirmPasswordPlaceholder: "Wprowadź hasło ponownie",
    submitBtn: "Zarejestruj się",
    hasAccount: "Masz już konto?",
    signIn: "Zaloguj się",
    passwordMismatch: "Hasła nie są zgodne",
  },
  product: {
    section_title: "Informacje o produkcie",
    price: "Cena",
    quantity: "Ilość",
    available: "Dostępny",
    outOfStock: "Niedostępny",
    addToCart: "Dodaj do koszyka",
    specifications: "Specyfikacje",
    description: "Opis",
    relatedProducts: "Podobne produkty",
    reviews: "Opinie",
    off: "zniżki",
    taxInfo: "w tym wszystkie podatki",
    fastDelivery: "Szybka dostawa",
    daysExchange: "{days} dni na wymianę",
    brand: "Marka",
    model: "Model",
    rent: "Wynajmij",
    solarPanels: "Panele słoneczne",
    batteries: "Akumulatory",
    duration: {
      day: "Dzień",
      week: "Tydzień",
      month: "Miesiąc",
    },
  },
  // Add header and footer sections for Polish
  header: {
    menu: {
      solarSystem: "System solarny",
      evChargers: "Ładowarki do pojazdów elektrycznych",
      portablePower: "Przenośna energia",
      generators: "Generatory",
      electricalComponents: "Komponenty elektryczne",
    },
    featured: {
      solar: "Popularne rozwiązania solarne",
      ev: "Najlepsze stacje ładowania",
      portable: "Przenośne rozwiązania energetyczne",
      generators: "Generatory do każdych potrzeb",
      electrical: "Komponenty elektryczne i kable",
    },
    categories: {
      solarPanels: "Panele słoneczne",
      batteries: "Akumulatory",
      inverters: "Falowniki",
      solarSets: "Zestawy elektrowni słonecznych",
      mountingSystems: "Systemy montażowe paneli słonecznych",
      evChargers: "Ładowarki do pojazdów elektrycznych",
      cablesAdapters: "Kable i adaptery",
      chargingStations: "Stacje ładowania",
      portablePowerStations: "Przenośne elektrownie",
      solarGenerators: "Generatory słoneczne",
      portableSolarPanels: "Przenośne panele słoneczne",
      industrialGenerators:
        "Przemysłowe generatory do dużych obciążeń (100 kW+)",
      solarLightingTowers: "Wieże oświetleniowe zasilane energią słoneczną",
      automaticSwitches: "Wyłączniki automatyczne",
      cablesWires: "Kable elektryczne i przewody",
    },
  },
  footer: {
    company: "Firma",
    about: "O nas",
    contact: "Kontakt",
    terms: "Warunki korzystania",
    privacy: "Polityka prywatności",
    copyright: "© {year} ScaleVolt. Wszelkie prawa zastrzeżone.",
    cases: "Przypadki klientów",
    products: "Produkty",
    sale: "Wyprzedaż",
    solarSets: "Zestawy słoneczne",
    batteries: "Akumulatory",
    inverters: "Falowniki",
    customerSupport: "Obsługa klienta",
    aboutUs: "O Nas",
    ourTeam: "Nasz Zespół",
    contactUs: "Skontaktuj się z nami",
    support: "Wsparcie",
    faq: "Pytania i odpowiedzi",
    career: "Kariera",
    jobs: "Oferty pracy",
    followUs: "Obserwuj nas",
  },
  delivery: {
    pageTitle: "Dostawa, Gwarancja i Zwroty",
    deliveryTitle: "Dostawa",
    standardDelivery: "Standardowa dostawa",
    standardDeliveryDesc:
      "Realizujemy dostawy na terenie całej Polski za pośrednictwem zaufanych partnerów: InPost, DPD i Pocztex. Wszystkie zamówienia są przetwarzane w ciągu 24 godzin w dni robocze.",
    expressDelivery: "Dostawa ekspresowa",
    expressDeliveryDesc:
      "Dla pilnych zamówień dostępna jest dostawa ekspresowa z przyspieszonym czasem dostawy. Ta usługa nie jest dostępna we wszystkich regionach - sprawdź dostępność podczas składania zamówienia.",
    bulkOrders: "Zamówienia hurtowe",
    bulkOrdersDesc:
      "W przypadku dużych lub komercyjnych zamówień (powyżej 10 kW paneli słonecznych lub więcej niż 5 akumulatorów) oferujemy specjalne warunki dostawy. Prosimy o <a href='/contact'>kontakt z naszym działem sprzedaży</a> w celu uzyskania szczegółowych informacji.",
    deliveryTimeTable: "Czas dostawy",
    region: "Region",
    standardTime: "Czas standardowy",
    expressTime: "Czas ekspresowy",
    cost: "Koszt",
    days: "dni",
    day: "dzień",
    majorCities: "Duże miasta (Warszawa, Kraków, Wrocław, Poznań, Gdańsk)",
    majorCitiesCost: "Bezpłatnie od 2000 zł<br>30 zł dla mniejszych zamówień",
    otherRegions: "Inne miasta wojewódzkie i powiatowe",
    otherRegionsCost: "Bezpłatnie od 3000 zł<br>40 zł dla mniejszych zamówień",
    remoteAreas: "Obszary odległe",
    remoteAreasCost: "Wyceniane indywidualnie",
    trackingTitle: "Śledzenie zamówienia",
    trackingDesc:
      "Po wysyłce zamówienia otrzymasz e-mail z numerem do śledzenia. Możesz również sprawdzić status swojego zamówienia w <a href='/account'>panelu klienta</a>.",
  },
  warranty: {
    warrantyTitle: "Gwarancja",
    standardWarranty: "Standardowa gwarancja",
    standardWarrantyDesc:
      "Firma SCALEVOLT udziela gwarancji na wszystkie produkty zgodnie z polskim prawem. Dodatkowa rozszerzona gwarancja jest dostępna dla zarejestrowanych klientów.",
    warrantyPeriodTable: "Okresy gwarancyjne",
    productCategory: "Kategoria produktu",
    warrantyPeriod: "Okres gwarancji",
    solarPanels: "Panele słoneczne",
    solarPanelsWarranty: "10 lat standardowej gwarancji, 25 lat na wydajność",
    batteries: "Akumulatory",
    batteriesWarranty: "5 lat",
    inverters: "Falowniki",
    invertersWarranty: "5 lat",
    accessories: "Akcesoria i drobne komponenty",
    accessoriesWarranty: "1 rok",
    warrantyExclusions: "Gwarancja nie obejmuje",
    exclusion1:
      "Uszkodzeń spowodowanych nieprawidłową instalacją lub użytkowaniem",
    exclusion2:
      "Normalnego zużycia lub defektów kosmetycznych, które nie wpływają na funkcjonalność",
    exclusion3:
      "Uszkodzeń spowodowanych klęskami żywiołowymi, wyładowaniami atmosferycznymi lub przepięciami",
    exclusion4: "Modyfikacji lub napraw wykonanych przez nieautoryzowane osoby",
    warrantyProcess: "Proces obsługi gwarancyjnej",
    warrantyProcessDesc:
      "Aby złożyć reklamację gwarancyjną, prosimy o <a href='/contact'>kontakt z naszym działem obsługi klienta</a> lub wypełnienie formularza reklamacyjnego w panelu klienta. Po weryfikacji Twojego zgłoszenia zorganizujemy naprawę lub wymianę zgodnie z naszymi warunkami gwarancyjnymi.",
  },
  returns: {
    returnsTitle: "Zwroty",
    returnPolicy: "Polityka zwrotów",
    returnPolicyDesc:
      "Zgodnie z polskim prawem konsumenckim, masz prawo do zwrotu towaru pełnowartościowego w ciągu 14 dni od otrzymania, jeśli nie był używany i zachował wszystkie właściwości konsumenckie, oryginalne opakowanie i kompletność.",
    returnProcess: "Proces zwrotu",
    step1:
      "Wypełnij wniosek o zwrot w panelu klienta lub skontaktuj się z naszym działem obsługi klienta.",
    step2: "Otrzymaj potwierdzenie wniosku i instrukcje dot",
    step2:
      "Otrzymaj potwierdzenie wniosku i instrukcje dotyczące zwrotu produktu.",
    step3:
      "Zabezpiecz produkt w oryginalnym opakowaniu ze wszystkimi akcesoriami i dokumentacją.",
    step4:
      "Wyślij produkt na wskazany adres lub zamów odbiór kurierski (w zależności od wartości zamówienia).",
    step5:
      "Po otrzymaniu i weryfikacji produktu, przetworzymy zwrot środków na Twoje konto w ciągu 5-7 dni roboczych.",
    nonReturnable: "Produkty niepodlegające zwrotowi",
    nonReturnable1: "Spersonalizowane lub indywidualnie skonfigurowane systemy",
    nonReturnable2: "Oprogramowanie z naruszonymi pieczęciami cyfrowymi",
    nonReturnable3: "Towary z widocznymi śladami użytkowania lub uszkodzeniami",
    note: "Ważna uwaga",
    noteDesc:
      "Koszt dostawy przy zwrocie towaru pełnowartościowego ponosi kupujący. W przypadku zwrotu towaru wadliwego, dostawa jest realizowana na koszt firmy SCALEVOLT.",
  },
  legal: {
    legalInformation: "Informacje prawne",
    legalDesc:
      "Nasza polityka dostawy, gwarancji i zwrotów jest zgodna z prawodawstwem Polski, w tym z Ustawą o prawach konsumenta i innymi odpowiednimi przepisami prawnymi.",
    contactInfo:
      "W kwestiach prawnych prosimy o kontakt pod adresem: <a href='mailto:legal@scalevolt.pl'>legal@scalevolt.pl</a>.",
  },
};

// Merge locale content
// const ukMessages = { ...ukLocale, ...ukDeliveryContent };
// const plMessages = { ...plLocale, ...plDeliveryContent };
const ukMessages = { ...ukLocale };
const plMessages = { ...plLocale };
// Get user's saved locale or use browser language as fallback
const savedLocale = localStorage.getItem("userLocale");
const browserLang = navigator.language.split("-")[0];
const defaultLocale = savedLocale || (browserLang === "pl" ? "pl" : "uk");

// Create i18n instance
export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: defaultLocale,
  fallbackLocale: "uk",
  messages: {
    uk: ukMessages,
    pl: plMessages,
  },
  numberFormats: {
    uk: {
      currency: {
        style: "currency",
        currency: "UAH",
        notation: "standard",
      },
      decimal: {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
    pl: {
      currency: {
        style: "currency",
        currency: "PLN",
        notation: "standard",
      },
      decimal: {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
  },
  datetimeFormats: {
    uk: {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      },
    },
    pl: {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      },
    },
  },
});

// Helper function to debug i18n issues
export const debugI18n = () => {
  // console.log('i18n Configuration:');
  // console.log('Current locale:', i18n.global.locale.value);
  // console.log('Available locales:', Object.keys(i18n.global.messages.value));
  // console.log('Sample translation (UK):', i18n.global.t('login.title', [], { locale: 'uk' }));
  // console.log('Sample translation (PL):', i18n.global.t('login.title', [], { locale: 'pl' }));
  // console.log('Footer translation (UK):', i18n.global.t('footer.products', [], { locale: 'uk' }));
  // console.log('Footer translation (PL):', i18n.global.t('footer.products', [], { locale: 'pl' }));
  // console.log('Header translation (UK):', i18n.global.t('header.menu.solarSystem', [], { locale: 'uk' }));
  // console.log('Header translation (PL):', i18n.global.t('header.menu.solarSystem', [], { locale: 'pl' }));
};

// Set document language attribute
document.documentElement.setAttribute("lang", defaultLocale);

// Provide a function to switch locales
export const setLocale = (locale) => {
  if (locale !== "uk" && locale !== "pl") {
    console.error("Invalid locale:", locale);
    return;
  }

  i18n.global.locale.value = locale;
  localStorage.setItem("userLocale", locale);
  document.documentElement.setAttribute("lang", locale);

  // Dispatch an event that components can listen for
  window.dispatchEvent(
    new CustomEvent("locale-changed", {
      detail: { locale: locale },
    })
  );

  console.log("Locale switched to:", locale);
  return locale;
};

export default i18n;
