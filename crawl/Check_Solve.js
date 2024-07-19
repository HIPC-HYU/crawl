const puppeteer = require("puppeteer");
const Data_File = require("./Data_file");
const CheckBoj = require("./Check_Boj");
const { user_tier } = require("./util");
const { add_to_notsolve, add_to_newstate } = require("./db");

const start_crawl = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
    for (const member of Data_File.member_Data) {
      const boj_id = member.boj_id;
      try {
        await page.goto(`https://solved.ac/profile/${boj_id}`);
        await page.waitForSelector('.css-1midmz7 b');
        const data = await page.evaluate(() => {
          const elements = document.querySelectorAll(".css-1midmz7 b");
          return {
            rating: parseInt(elements[0].textContent),
            streak: parseInt(elements[1].textContent),
            full_solved: parseInt(elements[2].textContent),
          };
        });
        data.boj_id = boj_id;
        data.tier = user_tier(parseInt(data.rating));
        console.log(data);
        add_to_newstate(data);

        if (data.streak !== 0) {
          CheckBoj(boj_id);
        } else {
          add_to_notsolve(boj_id);
        }
      } catch (error) {
        console.log(`Error fetching data for BOJ ID: ${boj_id}`, error.message);
      }
    }
  
  await browser.close();    
};

module.exports = start_crawl;
