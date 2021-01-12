const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({});
  const page = await context.newPage();

  const triggerCountDown = (duration) => {
    setTimeout(() => {
      // process.stdout.clearLine();  // clear current text
      // process.stdout.cursorTo(0);  // move cursor to beginning of line
      process.stdout.write(`${duration/1000} second(s) left!\r`);
      if (duration > 1000) {
        triggerCountDown(duration - 1000);
      }
    }, 1000);
  }
  

  await page.goto("https://testnet.binance.org/faucet-smart");
  console.debug('GOTO: https://testnet.binance.org/faucet-smart')
  await page.waitForSelector(".container #url");
  await page.fill(
    ".container #url",
    "0x160A41F6D39C4411a4b6bC4A54FA2DD6a7763094"
  );
  console.debug('INPUT: 0x160A41F6D39C4411a4b6bC4A54FA2DD6a7763094')

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
    console.debug('REQUESTED 6.2 BNB');
    triggerCountDown(480000);
  };
  await getBNB();

  setInterval(getBNB, 480000);
})();
