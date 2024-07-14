const puppeteer = require("puppeteer");
const Data_File = require("./Data_file");
const CheckBoj = require("./Check_Boj");
const { user_tier } = require("./util");
const { Add_not_solved, add_to_user } = require("./db");

const start_crawl = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  for (const member of Data_File.member_Data) {
    const boj_id = member.boj_id;
    try {
      await page.goto(`https://solved.ac/profile/${boj_id}`, {
        waitUntil: "networkidle2",
      });

      const data = await page.evaluate(() => {
        const elements = document.querySelectorAll(".css-1midmz7 b");
        return {
          rating: elements[0].textContent,
          streak: elements[1].textContent,
          full_solved: elements[2].textContent,
        };
      });
      const { rating, streak, full_solved } = data;
      data.boj_id = boj_id;
      data.name = member.name;
      data.tier = user_tier(parseInt(rating));

      //유저에 레이팅, 스트릭, 푼 전체 문제 추가
      add_to_user(data);
      if (streak !== "0") {
        CheckBoj(boj_id);
      } else {
        Add_not_solved(boj_id);
      }
    } catch (error) {
      console.log(`Error fetching data for BOJ ID: ${boj_id}`, error.message);
    }
  }
  await browser.close();
};

module.exports = start_crawl;
