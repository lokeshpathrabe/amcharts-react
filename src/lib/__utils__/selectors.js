/**
 * Get element attribute by using xpath
 * @param {*} xpath
 * @param {*} callback function to query element attribute
 * @returns {*} return value of callback
 * @example
 * selector('//span', (el) => el.getAttribute('font-size'))
 */
export const xpathSelector = async (xpath, callback) => {
  await page.waitForXPath(xpath);
  const elHandle = await page.$x(`(${xpath})[1]`);
  const value = await page.evaluate(callback, elHandle[0]);
  return value;
};

/**
 * Get element attribute by using xpath
 * @param {*} xpath
 * @param {*} callback function to query element attribute
 * @returns {*} return value of callback
 * @example
 * selector('//span', (el) => el.getAttribute('font-size'))
 */
export const xpathSelectorAll = async (xpath, callback) => {
  await page.waitForXPath(xpath);
  const elHandle = await page.$x(`${xpath}`);
  const value = await page.evaluate(callback, ...elHandle);
  return value;
};
