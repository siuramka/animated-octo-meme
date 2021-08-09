const { test, expect } = require("@playwright/test");
const { CalculatorPage } = require("../hw_pages/CalculatorPage");

const builds = ["Prototype", "1", "2", "3", "4", "5", "6", "7", "8"];
const calculatorOperations = ["Add", "Subtract", "Multiply", "Divide"];

//['NUMBER_ONE', 'NUMBER_TWO','RESULT']
//0 - ADD
//1 - SUBTRACT
//2 - MULTIPLY
//3 - DIVIDE

const calculatorOperationsIntegar = [
    //['NUMBER_ONE', 'NUMBER_TWO','RESULT']
    ['1000', '1000', '2000'], // ADD
    ['3000', '3000', '0'],    // SUBTRACT
    ['10', '20', '200'],      // MULTIPLY
    ['10000', '10', '1000']   // DIVIDE
];
const calculatorOperationsFloat = [
    ['10.1', '9.1', '19.2'],
    ['2.5', '1.25', '1.25'],
    ['1.5', '2.5', '3.75'],
    ['34.5', '1.25', '27.6']
];

test.describe("Calculator test > ", () => {
    let page = null;
    //let builds;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        calculatorPage = new CalculatorPage(page);
    });
    test.beforeEach(async () => {
        await calculatorPage.navigate();
    });


    builds.forEach(build => {
        let buildMessage = `Build #${build} >`;

        test(`${buildMessage} Clear button clears all fields and messages after calculation.`, async () => {

            await calculatorPage.selectBuild(build);
            await calculatorPage.fillFirstField("123asd");
            await calculatorPage.fillSecondField("ssdasd321");
            await calculatorPage.clickAnwser();
            await calculatorPage.enableIntegersOnly();
            await calculatorPage.clickClear();

            let calculationResult = await calculatorPage.getAnwser();
            let errorMessage = await calculatorPage.getErrorMessageContent();
            let integerCheckbox = await calculatorPage.getIntegersCheckboxState();

            expect(errorMessage).toBe("");
            expect(integerCheckbox).toBe(false);
            expect(calculationResult).toBe("");
        });

        calculatorOperations.forEach(operation => {
            test.only(`${buildMessage} ${operation} operation does not allow string values in both fields`, async () => {
                await calculatorPage.selectBuild(build);
                await calculatorPage.fillFirstField("1Lorem4si0");
                await calculatorPage.fillSecondField("1Lorem4si0");
                await calculatorPage.selectOperation(operation);
                await calculatorPage.clickAnwser();

                let calculationResult = await calculatorPage.getAnwser();
                let errorMessage = await calculatorPage.getErrorMessageContent();

                expect(errorMessage).toBe("Number 1 is not a number");
                expect(calculationResult).toBe("");
            });

            test(`${buildMessage} ${operation} operation does not allow string values in first field`, async () => {
                await calculatorPage.selectBuild(build);
                await calculatorPage.fillFirstField("1Lorem4si0");
                await calculatorPage.selectOperation(operation);
                await calculatorPage.clickAnwser();

                let calculationResult = await calculatorPage.getAnwser();
                let errorMessage = await calculatorPage.getErrorMessageContent();

                expect(errorMessage).toBe("Number 1 is not a number");
                expect(calculationResult).toBe("");
            });

            test(`${buildMessage} ${operation} operation does not allow string values un second field`, async () => {
                await calculatorPage.selectBuild(build);
                await calculatorPage.fillSecondField("1Lorem4si0");
                await calculatorPage.selectOperation(operation);
                await calculatorPage.clickAnwser();

                let calculationResult = await calculatorPage.getAnwser();
                let errorMessage = await calculatorPage.getErrorMessageContent();

                expect(errorMessage).toBe("Number 2 is not a number");
                expect(calculationResult).toBe("");
            });

        });

        calculatorOperations.forEach((operation, index) => {
            let numberOne = calculatorOperationsIntegar[index][0];
            let numberTwo = calculatorOperationsIntegar[index][1];
            let expectedResult = calculatorOperationsIntegar[index][2];
            test.only(`${buildMessage} ${operation} operation calculating integer`, async () => {
                await calculatorPage.selectBuild(build);
                await calculatorPage.fillFirstField(numberOne);
                await calculatorPage.fillSecondField(numberTwo);
                await calculatorPage.selectOperation(operation);
                await calculatorPage.clickAnwser();

                let calculationResult = await calculatorPage.getAnwser();

                expect(calculationResult).toBe(expectedResult);
            });
        });

        calculatorOperations.forEach((operation, index) => {
            let numberOne = calculatorOperationsFloat[index][0];
            let numberTwo = calculatorOperationsFloat[index][1];
            let expectedResult = calculatorOperationsFloat[index][2];
            test.only(`${buildMessage} ${operation} operation calculating float`, async () => {
                await calculatorPage.selectBuild(build);
                await calculatorPage.fillFirstField(numberOne);
                await calculatorPage.fillSecondField(numberTwo);
                await calculatorPage.selectOperation(operation);
                await calculatorPage.clickAnwser();

                let calculationResult = await calculatorPage.getAnwser();

                expect(calculationResult).toBe(expectedResult);
            });
        });

        test(`${buildMessage} Division by zero is not allowed`, async () => {
            await calculatorPage.selectBuild(build);
            await calculatorPage.fillFirstField("1000");
            await calculatorPage.fillSecondField("0");
            await calculatorPage.selectOperation("Divide");
            await calculatorPage.clickAnwser();

            let calculationResult = await calculatorPage.getAnwser();
            let errorMessage = await calculatorPage.getErrorMessageContent();

            expect(calculationResult).toBe("");
            expect(errorMessage).toBe("Divide by zero error!");

        });
        test(`${buildMessage} Concatenate operation calculating number as string`, async () => {
            await calculatorPage.selectBuild(build);
            await calculatorPage.fillFirstField("1000");
            await calculatorPage.fillSecondField("2000");
            await calculatorPage.selectOperation("Concatenate");
            await calculatorPage.clickAnwser();

            let calculationResult = await calculatorPage.getAnwser();
            let isIntegerCheckboxVisible = await calculatorPage.isIntegarCheckboxVisible();

            expect(isIntegerCheckboxVisible).toBe(false);
            expect(calculationResult).toBe("10002000");

        });

        test.only(`${buildMessage} Concatenate operation calculating string`, async () => {
            await calculatorPage.selectBuild(build);
            await calculatorPage.fillFirstField("aaa");
            await calculatorPage.fillSecondField("1bbb");
            await calculatorPage.selectOperation("Concatenate");
            await calculatorPage.clickAnwser();

            let isIntegerCheckboxVisible = await calculatorPage.isIntegarCheckboxVisible();
            let calculationResult = await calculatorPage.getAnwser();

            expect(isIntegerCheckboxVisible).toBe(false);
            expect(calculationResult).toBe("aaa1bbb");

        });

        test.only(`${buildMessage} Add operation Integer only enabled correct results`, async () => {
            await calculatorPage.selectBuild(build);
            await calculatorPage.fillFirstField("1111.5");
            await calculatorPage.fillSecondField("1");
            await calculatorPage.selectOperation("Add");
            await calculatorPage.clickAnwser();
            await calculatorPage.enableIntegersOnly();
            
            let integerCheckboxStatus = await calculatorPage.getIntegersCheckboxState();
            let calculationResult = await calculatorPage.getAnwser();
        
            expect(calculationResult).toBe("1112");
            expect(integerCheckboxStatus).toBe(true);

        });



    });
});
