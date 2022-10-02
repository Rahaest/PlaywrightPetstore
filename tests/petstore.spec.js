/* eslint-disable linebreak-style */
// @ts-check
import { test, expect } from '@playwright/test';

const PETSTORE_URL = 'https://petstore3.swagger.io/';
const pet = {
  id: 107,
  name: 'SirSnuggles',
  category: { id: 1, name: 'Dogs' },
  photoUrls: ['string'],
  tags: [{ id: 0, name: 'string' }],
  status: 'available',
};
const updatedPet = {
  id: 107,
  name: 'SirBarksALot',
  category: { id: 1, name: 'Dogs' },
  photoUrls: ['string'],
  tags: [{ id: 0, name: 'string' }],
  status: 'available',
};

test.beforeEach(async ({ page }) => {
  await page.goto(`${PETSTORE_URL}`);
});

test.afterEach(async ({ page }) => {
  await expect(page.locator('css=.responses-inner > div tbody .response-col_status')).toContainText('200');
});

test('POST request', async ({ page }) => {
  await page.locator('id=operations-pet-addPet').click();
  await page.locator('css=.btn.try-out__btn').click();
  const stringifyPet = JSON.stringify(pet);
  await page.locator('css=.body-param__text').fill(stringifyPet);
  await page.locator('css=.btn.execute.opblock-control__btn').click();
  await expect(page.locator('css=.highlight-code > .microlight').first()).toContainText('107');
  await expect(page.locator('css=.highlight-code > .microlight').first()).toContainText('SirSnuggles');
});

test('GET request', async ({ page }) => {
  await page.locator('id=operations-pet-getPetById').click();
  await page.locator('css=.btn.try-out__btn').click();
  await page.locator('css=input[placeholder="petId"]').fill('107');
  await page.locator('css=.btn.execute.opblock-control__btn').click();
  await expect(page.locator('css=.highlight-code > .microlight').first()).toContainText('107');
  await expect(page.locator('css=.highlight-code > .microlight').first()).toContainText('SirSnuggles');
});

test('PUT request', async ({ page }) => {
  await page.locator('id=operations-pet-updatePet').click();
  await page.locator('css=.btn.try-out__btn').click();
  const stringifyPet = JSON.stringify(updatedPet);
  await page.locator('css=.body-param__text').fill(stringifyPet);
  await page.locator('css=.btn.execute.opblock-control__btn').click();
  await expect(page.locator('css=.highlight-code > .microlight').first()).toContainText('107');
  await expect(page.locator('css=.highlight-code > .microlight').first()).toContainText('SirBarksALot');
});

test('DELETE request', async ({ page }) => {
  await page.locator('id=operations-pet-deletePet').click();
  await page.locator('css=.btn.try-out__btn').click();
  await page.locator('css=input[placeholder="petId"]').fill('107');
  await page.locator('css=.btn.execute.opblock-control__btn').click();
});
