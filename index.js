const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://testnet.binance.org/faucet-smart");

  await page.setViewportSize({ width: 1536, height: 430 });

  await page.waitForSelector(".container #url");
  await page.fill(
    ".container #url",
    "0x160A41F6D39C4411a4b6bC4A54FA2DD6a7763094"
  );
  const getBNB = async () => {
    await page.waitForSelector(
      ".col-lg-8 > .input-group > .input-group-btn:nth-child(2) > .btn > .fa"
    );
    await page.click(
      ".col-lg-8 > .input-group > .input-group-btn:nth-child(2) > .btn > .fa"
    );

    await page.waitForSelector(
      ".input-group > .open > .dropdown-menu > li:nth-child(3) > a"
    );
    await page.click(
      ".input-group > .open > .dropdown-menu > li:nth-child(3) > a"
    );
    console.debug('CLICKED GET BNB');
  };
  await getBNB();

  setInterval(getBNB, 480000);
})();
