const settings = {
  isCelsius: true,
  geoPosition: null,
  geoPositionData: null,
  cityName: 'Moscow',
  countryName: 'RU',
  latitude: 50,
  longitude: 50,
  language: 'en-US',
  weatherData: null,
  timeZone: 'Europe/Moscow',
  interface: {
    search: {
      'en-US': 'Search',
      'ru-RU': 'Поиск',
      'be-BY': 'Пошук',
    },
    searchPlaceholder: {
      'en-US': 'Search city or ZIP',
      'ru-RU': 'Искать город или ZIP ',
      'be-BY': 'Шукаць горад ці ZIP',
    },
    latitude: {
      'en-US': 'Latitude',
      'ru-RU': 'Широта',
      'be-BY': 'Шырата',
    },
    longitude: {
      'en-US': 'Longitude',
      'ru-RU': 'Долгота',
      'be-BY': 'Даўгата',
    },
    feelsLike: {
      'en-US': 'Feels like',
      'ru-RU': 'По ощущению',
      'be-BY': 'Па адчуванні',
    },
    wind: {
      'en-US': 'Wind',
      'ru-RU': 'Ветер',
      'be-BY': 'Вецер',
    },
    windSpeed: {
      'en-US': 'm/s',
      'ru-RU': 'м/с',
      'be-BY': 'м/с',
    },
    humidity: {
      'en-US': 'Humidity',
      'ru-RU': 'Влажность',
      'be-BY': 'Вільготнасць',
    },
    weekDay: {
      'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'ru-RU': ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      'be-BY': ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацьвер', 'Пятніца', 'Субота'],
    },
    weekDayShort: {
      'en-US': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      'ru-RU': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      'be-BY': ['Нд', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'],
    },
    month: {
      'en-US': [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      'ru-RU': [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      'be-BY': [
        'Студзень',
        'Лютага',
        'Сакавік',
        'Красавік',
        'Май',
        'Чэрвень',
        'Ліпеня',
        'Жнівень',
        'Верасень',
        'Кастрычніка',
        'Лістапада',
        'Снежні',
      ],
    },
  },
};

module.exports = settings;
