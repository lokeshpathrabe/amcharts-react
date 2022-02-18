const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Botswana',
  'Brazil',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  "Cote D'ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Denmark',
  'Djibouti',
  'Dominica',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guinea',
  'Guinea-bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakstan',
  'Kenya',
  'Kiribati',
  'Korea',
  'Korea',
  ' Republic Of',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Latvia',
  'Lebanon',
  'Togo',
  'Tokelau',
  'Tonga',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Viet Nam',
  'Virgin Islands',
  ' British',
  'Virgin Islands',
  ' U.s.',
  'Wallis And Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

export const countryData = countries.map(c => ({
  country: c,
  visits: Math.random() * (600 - 100) + 100,
}));

export const clickableColumnData = countries.slice(1, 90).map(c => ({
  country: c,
  visits: Math.random() * (600 - 100) + 100,
}));

export const getLiveEditData = countries.slice(1, 15).map(c => ({
  country: c,
  visits: Math.random() * (600 - 100) + 100,
}));

export const getCategoryAxisData = count => {
  count = count > 120 ? 120 : count;
  return countries.slice(1, count).map(c => ({
    country: c,
    visits: Math.random() * (600 - 100) + 100,
  }));
};

export const getDateAxisData = (
  from,
  to,
  dateAxesKey = 'date',
  valueAxesKeys = [],
) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const result = [];

  for (
    let dateIterator = from;
    dateIterator < toDate;
    dateIterator.setDate(dateIterator.getDate() + 1)
  ) {
    const resultObj = {};
    resultObj[dateAxesKey] = dateIterator.toString();
    valueAxesKeys.forEach(key => {
      resultObj[key] = Math.round(Math.random() * (600 - 100) + 100);
    });
    result.push(resultObj);
  }
  return result;
};
