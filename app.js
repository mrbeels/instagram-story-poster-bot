// Mr Beel's Instagram Story Poster Bot

// Puppeteer & Mobie Emulation
const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const iPhonex = devices["iPhone X"];

const fs = require("fs");
const text = fs.readFileSync("credentials.txt", "utf-8");
const credentials = text.split(",");

(async () => {
  //Declaring some variables
  const INSTA_URL = "https://www.instagram.com/accounts/login/";
  const USERNAME = credentials[0];
  const PASSWORD = credentials[1];

  //Launches Puppeteer in Mobile Emulation
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.emulate(iPhonex);

  //Instagram Login Page
  await page.goto(INSTA_URL, {
    waitUntil: "networkidle0",
  });
  console.log(`Redirecting to ${INSTA_URL}`);

  //Logins to Instagram
  const username = await page.$x(
    '//*[@id="react-root"]/section/main/article/div/div/div/form/div[4]/div/label/input'
  );
  const password = await page.$x(
    '//*[@id="react-root"]/section/main/article/div/div/div/form/div[5]/div/label/input'
  );
  const loginElements = await page.$x(
    '//*[@id="react-root"]/section/main/article/div/div/div/form/div[7]/button'
  );

  await username[0].type(USERNAME, {
    delay: 50,
  });
  await password[0].type(PASSWORD, {
    delay: 50,
  });
  await loginElements[0].click();

  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });

  await page.waitFor(6 * 1000);

  console.log(`Login-ed to ${USERNAME}'s account`);

  //Don't save password
  const detailsNotNowButton = await page.$x(
    '//*[@id="react-root"]/section/main/div/div/div/button'
  );
  await detailsNotNowButton[0].click();

  await page.waitFor(6 * 1000);

  //Don't Add to Homescreen
  const cancelButton = await page.$x(
    "/html/body/div[4]/div/div/div[3]/button[2]"
  );
  await cancelButton[0].click();

  await page.waitFor(6 * 1000);

  console.log("Starting to Post!");

  /*  

            First Story 

    */
  const [titlePic] = await Promise.all([
    page.waitForFileChooser(),
    page.click(".mTGkH"),
  ]);
  await titlePic.accept(["output/title.png"]);

  await page.waitFor(3 * 1000);

  const addToStoryButton1 = await page.$x(
    '//*[@id="react-root"]/section/footer/div/div/button'
  );
  await addToStoryButton1[0].click();

  console.log("Posting title.png");

  await page.waitFor(10 * 1000);

  //Not now Notification Button
  const notiNotNowButton = await page.$x(
    "/html/body/div[4]/div/div/div[3]/button[2]"
  );
  await notiNotNowButton[0].click();

  await page.waitFor(3 * 1000);

  console.log("Posted title.png");

  //comment out the following if you only need to post one story

  /*  

            Second Story 

    */
  const [summaryPic] = await Promise.all([
    page.waitForFileChooser(),
    page.click(".mTGkH"),
  ]);
  await summaryPic.accept(["output/summary.png"]);

  await page.waitFor(3 * 1000);

  const addToStoryButton2 = await page.$x(
    '//*[@id="react-root"]/section/footer/div/div/button'
  );
  await addToStoryButton2[0].click();

  console.log("Posting summary.png");

  await page.waitFor(10 * 1000);

  console.log("Posted summary.png");

  /*  

            Third Story

    */
  const [linkPic] = await Promise.all([
    page.waitForFileChooser(),
    page.click(".mTGkH"),
  ]);

  await linkPic.accept(["output/link.png"]);

  await page.waitFor(3 * 1000);

  const addToStoryButton3 = await page.$x(
    '//*[@id="react-root"]/section/footer/div/div/button'
  );
  await addToStoryButton3[0].click();

  console.log("Posting link.png");

  await page.waitFor(10 * 1000);

  await page.screenshot({
    path: "log.png",
  });

  console.log("Posted link.png");

  await browser.close();
  console.log("Task completed!");
})();

console.log(
  "You are using Mr Beel's Instagram Story Poster Bot! https://github.com/mrbeels"
);
