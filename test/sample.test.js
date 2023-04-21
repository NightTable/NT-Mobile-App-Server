  

describe("Confirming jest testing functionality", () => {

    it('This is a test to confirm jest functionality', () => {

        console.log("Does this run?");

    });

    it('Should accept a math function unit test', () => {

        expect(3+4).toBe(7);
    })
});