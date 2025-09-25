"use strict";
/*
 * Potential issues in finding Hawaiian words in city names:
 * 1. Hawaiian words may appear as substrings within larger compound words
 * 2. Case sensitivity variations in city names
 * 3. Hawaiian words may be combined with English words or other Hawaiian words
 * 4. Transliterations may have slight spelling variations
 * 5. Some city names may contain Hawaiian words that are not obvious (e.g., embedded within English translations)
 */
/**
 * Returns an object with island names as keys and total population of cities containing "kai" as values
 * @param cityArray - Array of City objects to analyze
 * @returns Object with islands as keys and total populations as values
 */
function populationCitiesKai(cityArray) {
    return cityArray
        .filter(city => city.name.toLowerCase().includes('kai'))
        .reduce((result, city) => {
        const island = city.island || 'Unknown';
        result[island] = (result[island] || 0) + city.population;
        return result;
    }, {});
}
/**
 * Returns true if any city in the array contains "kai" in its name (case-insensitive)
 * @param cityArray - Array of City objects to check
 * @returns Boolean indicating if any city contains "kai"
 */
function hasKai(cityArray) {
    const populationData = populationCitiesKai(cityArray);
    return Object.keys(populationData).length > 0;
}
// Test cases
console.log('=== Testing populationCitiesKai ===');
console.log('Full cities array:');
console.log(populationCitiesKai(cities));
console.log('Total population of cities with "kai":');
console.log(Object.values(populationCitiesKai(cities)).reduce((sum, population) => sum + population, 0));
console.log('First 10 cities:');
console.log(populationCitiesKai(cities.slice(0, 10)));
console.log('First 5 cities:');
console.log(populationCitiesKai(cities.slice(0, 5)));
console.log('Empty array:');
console.log(populationCitiesKai([]));
console.log('\n=== Testing hasKai ===');
console.log('Full cities array has "kai":');
console.log(hasKai(cities));
console.log('Lanai cities only:');
console.log(hasKai(cities.filter((city) => city.island === 'Lanai')));
console.log('First 5 cities have "kai":');
console.log(hasKai(cities.slice(0, 5)));
console.log('Empty array has "kai":');
console.log(hasKai([]));
// **REQUIRED TESTS FROM ASSIGNMENT**
console.log('\n=== Required Assignment Tests ===');
// Required test 1: Example from assignment
console.log('hasKai(cities): // Should print true because there are cities with kai in them');
console.log(hasKai(cities)); // prints true because there are cities with kai in them such as Kailua
// Required test 2: Example from assignment  
console.log('hasKai(cities.filter(city => city.island === "Lanai")): // Should print false because filtered to only Lanai cities none of which have kai in their name');
console.log(hasKai(cities.filter(city => city.island === 'Lanai'))); // prints false because filtered to only Lanai cities none of which have kai in their name
// Additional edge case tests
console.log('\n=== Additional Edge Case Tests ===');
// Test with cities that have no island data (Unknown category)
const citiesWithoutIsland = [
    { name: "Kailua Test", population: 1000 },
    { name: "Test City", population: 2000 }
];
console.log('Cities without island data (should assign to "Unknown"):');
console.log(populationCitiesKai(citiesWithoutIsland));
// Expected: {"Unknown": 1000}
// Case insensitivity test
const mixedCaseCities = [
    { name: "KAILUA", population: 1000, island: "Test" },
    { name: "kaitest", population: 2000, island: "Test" }
];
console.log('Case insensitivity test:');
console.log(populationCitiesKai(mixedCaseCities));
// Expected: {"Test": 3000}
// Test hasKai with empty array
console.log('hasKai with empty array (should be false):');
console.log(hasKai([]));
// Expected: false
// Test populationCitiesKai with array containing no "kai" cities
const noCitiesWithKai = [
    { name: "Honolulu", population: 1000, island: "Oahu" },
    { name: "Hilo", population: 2000, island: "Hawaii" }
];
console.log('populationCitiesKai with no "kai" cities (should be empty object):');
console.log(populationCitiesKai(noCitiesWithKai));
// Expected: {}
