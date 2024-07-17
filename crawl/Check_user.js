const puppeteer = require("puppeteer");
const Data_File = require("./Data_file");
const CheckBoj = require("./Check_Boj");
const { user_tier } = require("./util");
const { Add_not_solved, add_to_newuser } = require("./db");

const Check_users = async () => {
    for (let i = 0; i < 3; i++) {
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
                        rating: parseInt(elements[0].textContent),
                        full_solved: parseInt(elements[2].textContent),
                    };
                });
                data.boj_id = boj_id;
                data.name = member.name;
                data.tier = user_tier(parseInt(data.rating));
                console.log(data);
                add_to_newuser(data);
            } catch (error) {
                console.log(`Error fetching data for BOJ ID: ${boj_id}`, error.message);
            }
        }
        await browser.close();
    };
}
Check_users();