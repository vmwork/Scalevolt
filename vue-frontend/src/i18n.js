// src/i18n/index.js
import { createI18n } from 'vue-i18n';

// Import all locale files
import ukLocale from './locales/uk.json';
import plLocale from './locales/pl.json';

// Merge delivery, warranty and returns content for each locale
const ukDeliveryContent = {
  "delivery": {
    "pageTitle": "Доставка, Гарантія та Повернення",
    "deliveryTitle": "Доставка",
    "standardDelivery": "Стандартна доставка",
    "standardDeliveryDesc": "Ми здійснюємо доставку по всій території України через надійних партнерів: Нова Пошта, Укрпошта та Meest Express. Усі замовлення обробляються протягом 24 годин у робочі дні.",
    "expressDelivery": "Експрес-доставка",
    "expressDeliveryDesc": "Для термінових замовлень доступна експрес-доставка з прискореним терміном доставки. Ця послуга доступна не у всіх регіонах - перевірте доступність під час оформлення замовлення.",
    "bulkOrders": "Оптові замовлення",
    "bulkOrdersDesc": "Для великих або комерційних замовлень (понад 10 кВт сонячних панелей або більше 5 акумуляторів) ми пропонуємо спеціальні умови доставки. Будь ласка, <a href='/contact'>зв'яжіться з нашим відділом продажів</a> для отримання детальної інформації.",
    "deliveryTimeTable": "Терміни доставки",
    "region": "Регіон",
    "standardTime": "Стандартний час",
    "expressTime": "Експрес час",
    "cost": "Вартість",
    "days": "днів",
    "day": "день",
    "majorCities": "Великі міста (Київ, Львів, Одеса, Харків, Дніпро)",
    "majorCitiesCost": "Безкоштовно від 10,000₴<br>150₴ для менших замовлень",
    "otherRegions": "Інші обласні центри та міста",
    "otherRegionsCost": "Безкоштовно від 15,000₴<br>200₴ для менших замовлень",
    "remoteAreas": "Віддалені райони",
    "remoteAreasCost": "Розраховується індивідуально",
    "trackingTitle": "Відстеження замовлення",
    "trackingDesc": "Після відправлення замовлення ви отримаєте електронний лист з номером для відстеження. Ви також можете перевірити статус вашого замовлення в <a href='/account'>особистому кабінеті</a>."
  },
  "warranty": {
    "warrantyTitle": "Гарантія",
    "standardWarranty": "Стандартна гарантія",
    "standardWarrantyDesc": "Компанія SCALEVOLT надає гарантію на всі продукти згідно з українським законодавством. Додаткова розширена гарантія доступна для реєстрованих клієнтів.",
    "warrantyPeriodTable": "Гарантійні терміни",
    "productCategory": "Категорія продукту",
    "warrantyPeriod": "Гарантійний термін",
    "solarPanels": "Сонячні панелі",
    "solarPanelsWarranty": "10 років стандартної гарантії, 25 років на продуктивність",
    "batteries": "Акумулятори",
    "batteriesWarranty": "5 років",
    "inverters": "Інвертори",
    "invertersWarranty": "5 років",
    "accessories": "Аксесуари та дрібні компоненти",
    "accessoriesWarranty": "1 рік",
    "warrantyExclusions": "Гарантія не поширюється на",
    "exclusion1": "Пошкодження, спричинені неправильним встановленням або використанням",
    "exclusion2": "Звичайний знос або косметичні дефекти, які не впливають на функціональність",
    "exclusion3": "Пошкодження через стихійні лиха, блискавки або перенапругу в мережі",
    "exclusion4": "Модифікації або ремонт, виконаний неавторизованими особами",
    "warrantyProcess": "Процес гарантійного обслуговування",
    "warrantyProcessDesc": "Щоб подати гарантійну вимогу, будь ласка, <a href='/contact'>зв'яжіться з нашою службою підтримки</a> або заповніть форму гарантійної заявки в своєму особистому кабінеті. Після перевірки вашої заявки ми організуємо ремонт або заміну відповідно до наших гарантійних умов."
  },
  "returns": {
    "returnsTitle": "Повернення",
    "returnPolicy": "Політика повернення",
    "returnPolicyDesc": "Згідно з Законом України 'Про захист прав споживачів', ви маєте право повернути товар належної якості протягом 14 днів з моменту отримання, якщо він не був у використанні і зберіг всі споживчі властивості, заводське пакування та комплектацію.",
    "returnProcess": "Процес повернення",
    "step1": "Заповніть заявку на повернення в особистому кабінеті або зв'яжіться з нашою службою підтримки.",
    "step2": "Отримайте підтвердження заявки та інструкції щодо повернення продукту.",
    "step3": "Надійно запакуйте товар у оригінальну упаковку із усіма аксесуарами та документацією.",
    "step4": "Відправте товар за вказаною адресою або замовте курʼєрський забір (залежно від вартості замовлення).",
    "step5": "Після отримання та перевірки товару, ми обробимо повернення коштів на ваш рахунок протягом 5-7 робочих днів.",
    "nonReturnable": "Товари, що не підлягають поверненню",
    "nonReturnable1": "Персоналізовані або індивідуально сконфігуровані системи",
    "nonReturnable2": "Програмне забезпечення з порушеними цифровими пломбами",
    "nonReturnable3": "Товари з явними слідами використання або пошкоджень",
    "note": "Важливо зауважити",
    "noteDesc": "Вартість доставки при поверненні товару належної якості сплачує покупець. У випадку повернення товару неналежної якості, доставка здійснюється за рахунок компанії SCALEVOLT."
  },
  "legal": {
    "legalInformation": "Юридична інформація",
    "legalDesc": "Наша політика доставки, гарантії та повернення відповідає законодавству України, включаючи Закон України 'Про захист прав споживачів' та інші відповідні нормативні акти.",
    "contactInfo": "З юридичних питань, будь ласка, звертайтеся за адресою: <a href='mailto:legal@scalevolt.ua'>legal@scalevolt.ua</a>."
  }
};

const plDeliveryContent = {
  "delivery": {
    "pageTitle": "Dostawa, Gwarancja i Zwroty",
    "deliveryTitle": "Dostawa",
    "standardDelivery": "Standardowa dostawa",
    "standardDeliveryDesc": "Realizujemy dostawy na terenie całej Polski za pośrednictwem zaufanych partnerów: InPost, DPD i Pocztex. Wszystkie zamówienia są przetwarzane w ciągu 24 godzin w dni robocze.",
    "expressDelivery": "Dostawa ekspresowa",
    "expressDeliveryDesc": "Dla pilnych zamówień dostępna jest dostawa ekspresowa z przyspieszonym czasem dostawy. Ta usługa nie jest dostępna we wszystkich regionach - sprawdź dostępność podczas składania zamówienia.",
    "bulkOrders": "Zamówienia hurtowe",
    "bulkOrdersDesc": "W przypadku dużych lub komercyjnych zamówień (powyżej 10 kW paneli słonecznych lub więcej niż 5 akumulatorów) oferujemy specjalne warunki dostawy. Prosimy o <a href='/contact'>kontakt z naszym działem sprzedaży</a> w celu uzyskania szczegółowych informacji.",
    "deliveryTimeTable": "Czas dostawy",
    "region": "Region",
    "standardTime": "Czas standardowy",
    "expressTime": "Czas ekspresowy",
    "cost": "Koszt",
    "days": "dni",
    "day": "dzień",
    "majorCities": "Duże miasta (Warszawa, Kraków, Wrocław, Poznań, Gdańsk)",
    "majorCitiesCost": "Bezpłatnie od 2000 zł<br>30 zł dla mniejszych zamówień",
    "otherRegions": "Inne miasta wojewódzkie i powiatowe",
    "otherRegionsCost": "Bezpłatnie od 3000 zł<br>40 zł dla mniejszych zamówień",
    "remoteAreas": "Obszary odległe",
    "remoteAreasCost": "Wyceniane indywidualnie",
    "trackingTitle": "Śledzenie zamówienia",
    "trackingDesc": "Po wysyłce zamówienia otrzymasz e-mail z numerem do śledzenia. Możesz również sprawdzić status swojego zamówienia w <a href='/account'>panelu klienta</a>."
  },
  "warranty": {
    "warrantyTitle": "Gwarancja",
    "standardWarranty": "Standardowa gwarancja",
    "standardWarrantyDesc": "Firma SCALEVOLT udziela gwarancji na wszystkie produkty zgodnie z polskim prawem. Dodatkowa rozszerzona gwarancja jest dostępna dla zarejestrowanych klientów.",
    "warrantyPeriodTable": "Okresy gwarancyjne",
    "productCategory": "Kategoria produktu",
    "warrantyPeriod": "Okres gwarancji",
    "solarPanels": "Panele słoneczne",
    "solarPanelsWarranty": "10 lat standardowej gwarancji, 25 lat na wydajność",
    "batteries": "Akumulatory",
    "batteriesWarranty": "5 lat",
    "inverters": "Falowniki",
    "invertersWarranty": "5 lat",
    "accessories": "Akcesoria i drobne komponenty",
    "accessoriesWarranty": "1 rok",
    "warrantyExclusions": "Gwarancja nie obejmuje",
    "exclusion1": "Uszkodzeń spowodowanych nieprawidłową instalacją lub użytkowaniem",
    "exclusion2": "Normalnego zużycia lub defektów kosmetycznych, które nie wpływają na funkcjonalność",
    "exclusion3": "Uszkodzeń spowodowanych klęskami żywiołowymi, wyładowaniami atmosferycznymi lub przepięciami",
    "exclusion4": "Modyfikacji lub napraw wykonanych przez nieautoryzowane osoby",
    "warrantyProcess": "Proces obsługi gwarancyjnej",
    "warrantyProcessDesc": "Aby złożyć reklamację gwarancyjną, prosimy o <a href='/contact'>kontakt z naszym działem obsługi klienta</a> lub wypełnienie formularza reklamacyjnego w panelu klienta. Po weryfikacji Twojego zgłoszenia zorganizujemy naprawę lub wymianę zgodnie z naszymi warunkami gwarancyjnymi."
  },
  "returns": {
    "returnsTitle": "Zwroty",
    "returnPolicy": "Polityka zwrotów",
    "returnPolicyDesc": "Zgodnie z polskim prawem konsumenckim, masz prawo do zwrotu towaru pełnowartościowego w ciągu 14 dni od otrzymania, jeśli nie był używany i zachował wszystkie właściwości konsumenckie, oryginalne opakowanie i kompletność.",
    "returnProcess": "Proces zwrotu",
    "step1": "Wypełnij wniosek o zwrot w panelu klienta lub skontaktuj się z naszym działem obsługi klienta.",
    "step2": "Otrzymaj potwierdzenie wniosku i instrukcje dotyczące zwrotu produktu.",
    "step3": "Zabezpiecz produkt w oryginalnym opakowaniu ze wszystkimi akcesoriami i dokumentacją.",
    "step4": "Wyślij produkt na wskazany adres lub zamów odbiór kurierski (w zależności od wartości zamówienia).",
    "step5": "Po otrzymaniu i weryfikacji produktu, przetworzymy zwrot środków na Twoje konto w ciągu 5-7 dni roboczych.",
    "nonReturnable": "Produkty niepodlegające zwrotowi",
    "nonReturnable1": "Spersonalizowane lub indywidualnie skonfigurowane systemy",
    "nonReturnable2": "Oprogramowanie z naruszonymi pieczęciami cyfrowymi",
    "nonReturnable3": "Towary z widocznymi śladami użytkowania lub uszkodzeniami",
    "note": "Ważna uwaga",
    "noteDesc": "Koszt dostawy przy zwrocie towaru pełnowartościowego ponosi kupujący. W przypadku zwrotu towaru wadliwego, dostawa jest realizowana na koszt firmy SCALEVOLT."
  },
  "legal": {
    "legalInformation": "Informacje prawne",
    "legalDesc": "Nasza polityka dostawy, gwarancji i zwrotów jest zgodna z prawodawstwem Polski, w tym z Ustawą o prawach konsumenta i innymi odpowiednimi przepisami prawnymi.",
    "contactInfo": "W kwestiach prawnych prosimy o kontakt pod adresem: <a href='mailto:legal@scalevolt.pl'>legal@scalevolt.pl</a>."
  }
};

// Merge locale content
const ukMessages = { ...ukLocale, ...ukDeliveryContent };
const plMessages = { ...plLocale, ...plDeliveryContent };

// Get user's saved locale or use browser language as fallback
const savedLocale = localStorage.getItem('userLocale');
const browserLang = navigator.language.split('-')[0];
const defaultLocale = savedLocale || (browserLang === 'pl' ? 'pl' : 'uk');

// Create i18n instance
export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: defaultLocale,
  fallbackLocale: 'uk',
  messages: {
    uk: ukMessages,
    pl: plMessages
  },
  numberFormats: {
    'uk': {
      currency: {
        style: 'currency',
        currency: 'UAH',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    },
    'pl': {
      currency: {
        style: 'currency', 
        currency: 'PLN',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    }
  },
  datetimeFormats: {
    'uk': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'pl': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }
});

// Set document language attribute
document.documentElement.setAttribute('lang', defaultLocale);

export default i18n;