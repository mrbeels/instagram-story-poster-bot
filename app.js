// Mr Beel's Instagram Story Poster Bot

// Puppeteer & Mobie Emulation
const puppeteer = require("puppeteer");
const phone = {
  name: "iPhone 6",
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
  viewport: {
    width: 582,
    height: 1199,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  },
};

const fs = require("fs");
const text = fs.readFileSync("credentials.txt", "utf-8");
const credentials = text.split(",");

(async () => {
  try {
    //Declaring some variables
    const INSTA_URL = "https://www.instagram.com/accounts/login/";
    const USERNAME = credentials[0];
    const PASSWORD = credentials[1];

    //Launches Puppeteer in Mobile Emulation
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.emulate(phone);

    //Instagram Login Page
    await page.goto(INSTA_URL, {
      waitUntil: "networkidle0",
      timeout: 3000000,
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

    console.log(`Login-ed to ${USERNAME}'s account`);

    await page.waitForXPath(
      '//*[@id="react-root"]/section/main/div/div/div/button'
    );
    //Don't save password
    const detailsNotNowButton = await page.$x(
      '//*[@id="react-root"]/section/main/div/div/div/button'
    );
    await detailsNotNowButton[0].click();

    await page.waitForXPath("/html/body/div[4]/div/div/div/div[3]/button[2]");
    //Don't Add to Homescreen
    const cancelButton = await page.$x(
      "/html/body/div[4]/div/div/div/div[3]/button[2]"
    );
    await cancelButton[0].click();
    console.log("Starting to Post!");

    /*  
  
              First Story 
  
      */

    console.log("Posting title.png");
    const [titlePic] = await Promise.all([
      page.waitForFileChooser(),
      page.click(".mTGkH"),
    ]);
    await titlePic.accept(["output/title.png"]);

    await page.waitForXPath(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );

    const addToStoryButton1 = await page.$x(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );
    await addToStoryButton1[0].click();

    await page.waitForXPath("/html/body/div[4]/div/div/div/div[3]/button[2]");

    //Not now Notification Button
    const notiNotNowButton = await page.$x(
      "/html/body/div[4]/div/div/div/div[3]/button[2]"
    );
    await notiNotNowButton[0].click();
    console.log("Posted title.png");

    //comment out the following if you only need to post one story

    /*  
  
              Second Story 
  
      */

    console.log("Posting summary.png");
    const [summaryPic] = await Promise.all([
      page.waitForFileChooser(),
      page.click(".mTGkH"),
    ]);
    await summaryPic.accept(["output/summary.png"]);

    await page.waitForXPath(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );

    const addToStoryButton2 = await page.$x(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );
    await addToStoryButton2[0].click();

    console.log("Posted summary.png");

    /*  
  
              Third Story
  
      */
    await page.waitFor(10 * 1000);
    console.log("Posting link.png");
    const [linkPic] = await Promise.all([
      page.waitForFileChooser(),
      page.click(".mTGkH"),
    ]);

    await linkPic.accept(["output/link.png"]);

    await page.waitForXPath(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );
    const addToStoryButton3 = await page.$x(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );
    await addToStoryButton3[0].click();

    await page.screenshot({
      path: "log.png",
    });

    await page.waitFor(5 * 1000);

    console.log("Posted link.png");

    await browser.close();
    console.log("Task completed!");
  } catch (err) {
    console.log(err);
  }
})();

console.log(
  "You are using Mr Beel's Instagram Story Poster Bot! https://github.com/mrbeels"
);