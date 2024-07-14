const puppeteer = require("puppeteer");
const { Add_to_solved } = require("./db");
const { format, parse } = require("date-fns"); // 날짜 처리를 위한 date-fns 라이브러리 사용

const CheckBoj = async (boj_id) => {
  const solved = [];
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(
      `https://www.acmicpc.net/status?user_id=${boj_id}&language_id=-1&result_id=4`,
      { waitUntil: "domcontentloaded", timeout: 60000 }
    );

    const data = await page.evaluate(() => {
      const problems = Array.from(
        document.querySelectorAll("a.problem_title")
      ).map((a) => a.getAttribute("href"));
      const submissionTimes = Array.from(
        document.querySelectorAll("a.real-time-update")
      ).map((a) => a.getAttribute("data-original-title"));

      return { problems, submissionTimes };
    });
    
    const { problems, submissionTimes } = data;
    // console.log(`Problems: ${problems}`);
    // console.log(`Submission Times: ${submissionTimes}`);

    problems.forEach((problem, i) => {
      const problemNumber = problem.substring(9);
      const submissionTimestamp = submissionTimes[i];
      const parsedTimestamp = parse(
        submissionTimestamp,
        "yyyy년 MM월 dd일 HH:mm:ss",
        new Date()
      );
      const currentTime = new Date();
      const yesterday6am = new Date(currentTime);
      yesterday6am.setHours(6, 0, 0, 0);
      yesterday6am.setDate(yesterday6am.getDate() - 1);

      const today6am = new Date(currentTime);
      today6am.setHours(6, 0, 0, 0);
      if (
        yesterday6am <= parsedTimestamp &&
        parsedTimestamp < today6am &&
        !solved.includes(problemNumber)
      ) {
        solved.push({ problemNumber, submissionTimestamp });
      }
    });
    Add_to_solved({ boj_id, solved });

  } catch (error) {
    console.error(`${boj_id} boj찾기 실패: `, error);
  } finally {
    await browser.close();
  }
};
module.exports = CheckBoj;
