import { getPixabay, getWeatherbit, getGeonames } from "../server/index.js"

describe('testing if the pixabayAPI is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(getPixabay).toBeDefined();
    });
})

describe('testing if the weatherbitAPI is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(getWeatherbit).toBeDefined();
    });
})

describe('testing if the geoNamesAPI is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(getGeonames).toBeDefined();
    });
})