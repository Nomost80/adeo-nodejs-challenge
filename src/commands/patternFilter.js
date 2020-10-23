const filterAnimal = (animal, pattern) => {
  return new RegExp(pattern, "i").test(animal.name);
};

const getPersonWithMatchingAnimal = (peopleAcc, person, pattern) => {
  const matchingAnimals = person.animals.filter((animal) =>
    filterAnimal(animal, pattern)
  );
  return matchingAnimals.length
    ? [...peopleAcc, { ...person, animals: matchingAnimals }]
    : peopleAcc;
};

const getCountryWithMachingPeople = (countriesAcc, country, pattern) => {
  const matchingPeople = country.people.reduce((peopleAcc, person) => {
    return getPersonWithMatchingAnimal(peopleAcc, person, pattern);
  }, []);
  return matchingPeople.length
    ? [...countriesAcc, { ...country, people: matchingPeople }]
    : countriesAcc;
};

module.exports = (data, pattern) => {
  return data.reduce((countryAcc, country) => {
    return getCountryWithMachingPeople(countryAcc, country, pattern);
  }, []);
};

module.exports.filterAnimal = filterAnimal;
