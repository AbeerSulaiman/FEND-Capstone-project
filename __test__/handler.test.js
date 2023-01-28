import { handleSubmit } from "../src/client/js/formHandler"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    

describe('testing if the function is valid or not', () => {
    test("the function return  true if valid", () => {
        expect(handleSubmit).toBeDefined();
    });
})