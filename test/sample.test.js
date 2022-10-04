// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

describe("Confirming jest testing functionality", () => {

    it('This is a test to confirm jest functionality', () => {

        console.log("Does this run?");

    });

    it('Should accept a math function unit test', () => {

        expect(3+4).toBe(7);
    })
});