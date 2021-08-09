const { test, expect } = require('@playwright/test');
const fs = require("fs");
test('Check that DuckDuckGo logo exists', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  let isLogoVisible = await page.isVisible('#logo_homepage_link');
  expect(isLogoVisible).toBe(true);
});


test('inzpegtor', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.click('[placeholder="Search the web without being tracked"]');
  // Click [placeholder="Search the web without being tracked"]
  await page.click('[placeholder="Search the web without being tracked"]');
  // Fill [placeholder="Search the web without being tracked"]
  await page.fill('[placeholder="Search the web without being tracked"]', 'test');
  // Click input:has-text("S")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=test&t=h_&ia=web' }*/),
    page.click('input:has-text("S")')
  ]);
  // Click text=Speedtest от Ookla - Глобальный тест скорости широкополосного...
  await page.click('text=Speedtest от Ookla - Глобальный тест скорости широкополосного...', {
    button: 'right'
  });
  // Click text=Speedtest от Ookla - Глобальный тест скорости широкополосного...
  await page.click('text=Speedtest от Ookla - Глобальный тест скорости широкополосного...');
  expect(page.url()).toBe('https://www.speedtest.net/ru');

});

//Search for “qr www.devbridge.com” – validate that generated QR image is decoded 
//correctly by visiting https://zxing.org/

test(`Search MS word cheatsheets`, async ({ page }) => {
  await page.goto('https://duckduckgo.com');
  await page.fill('#search_form_input_homepage', 'ms word cheat sheet');
  await page.click('#search_button_homepage');
  const textContent = await page.textContent('.c-base__title');
  
  const isCheatSheetsVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
  expect(isCheatSheetsVisible).toBe(true);
  expect(textContent).toContain("Microsoft Word 2010");
});


test('QR TEST', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage', 'qr devbridge.com');
  await page.click('#search_button_homepage');

  const textContent = await page.textContent('.zci.zci--answer.is-active');
  const isAnswerVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--answer.is-active');

  expect(textContent).toContain('A QR code that means');
  expect(isAnswerVisible).toBe(true);

  const qrImage = await page.$('img[alt="A QR Code"]');
  await qrImage.screenshot({
    path: 'nqr.png',
    omitBackground: true,
  });

  await page.goto('https://metriqr.com/scanner/');

  await page.setInputFiles('input.hidden','nqr.png')
  const urlLink = await page.textContent('div.py-4>div.text-black');

  expect(urlLink).toBe("devbridge.com");
  
});


  // Click [placeholder="Search the web without being tracked"]


  const passwordsLengths = ['8', '16', '64', '65'];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await page.textContent(".c-base__title");
        expect(generatedPassword.length).toEqual(undefined)
    });
  });

