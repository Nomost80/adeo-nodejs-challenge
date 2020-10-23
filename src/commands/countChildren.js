const countAnimalsInPersonName = (peopleAcc, person) => {
  return [
    ...peopleAcc,
    {
      ...person,
      name: `${person.name} [${person.animals.length}]`,
    },
  ];
};

const countPeopleInCountryName = (countriesAcc, country) => {
  return [
    ...countriesAcc,
    {
      ...country,
      name: `${country.name} [${country.people.length}]`,
      people: country.people.reduce(countAnimalsInPersonName, []),
    },
  ];
};

module.exports = (data) => {
  return data.reduce(countPeopleInCountryName, []);
};
