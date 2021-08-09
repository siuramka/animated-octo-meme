/// selectors

let numberOneField = '#number1Field'
let numberTwoField = '#number2Field';
let clearButton = '#clearButton';
let calculateButton = 'input#calculateButton';
let anwserField = '#numberAnswerField';
let buildSelectDropdown = 'select#selectBuild';
let operationSelectDropdown = 'select#selectOperationDropdown'
let integersCheckbox = 'input#integerSelect';
let errorMessageField = '#errorMsgField';


let webUrl = 'https://testsheepnz.github.io/BasicCalculator';
/// end


exports.CalculatorPage = class CalculatorPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(webUrl);
    }
    async fillFirstField(data) {
        await this.page.fill(numberOneField, data);
    }
    async fillSecondField(data) {
        await this.page.fill(numberTwoField, data);
    }
    async clickClear() {
        await this.page.click(clearButton);
    }
    async clickAnwser() {
        await this.page.click(calculateButton);
    }
    async selectBuild(build) {
        await this.page.selectOption(buildSelectDropdown, { label: build });
    }
    async selectOperation(operation) {
        await this.page.selectOption(operationSelectDropdown, { label: operation });
    }
    async enableIntegersOnly() {
        await this.page.check(integersCheckbox);
    }
    async disableIntegersOnly() {
        await this.page.uncheck(integersCheckbox);
    }
    async getIntegersCheckboxState() {
        return await this.page.$eval(integersCheckbox, node => node.checked);
    }
    async getAnwser() {
        return await this.page.$eval(anwserField, (el) => el.value);
    }
    async getErrorMessageContent() {
        return await this.page.textContent(errorMessageField);
    }
    async isAnwserButtonVisible() {
        return await this.page.isVisible(calculateButton);
    }
    async isIntegarCheckboxVisible() {
        return await this.page.isVisible(integersCheckbox);
    }
    async isAnwserFieldVisible() {
        return await this.page.isVisible(anwserField);
    }
    async isFieldOneVisible() {
        return await this.page.isVisible(numberOneField);
    }
    async isFieldTwoVisible() {
        return await this.page.isVisible(numberTwoField);
    }
    async isOperationSelectorVisible() {
        return await this.page.isVisible(buildSelectDropdown);
    }
    async isFieldOneVisible() {
        return await this.page.isVisible(numberOneField);
    }
    async isFieldOneVisible() {
        return await this.page.isVisible(numberOneField);
    }
    async isClearButtonVisible() {
        return await this.page.isVisible(clearButton);
    }

}