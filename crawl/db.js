const { findTier } = require("./util");
const mysql = require("mysql2/promise");

// 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "HIPC",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const add_to_newuser = async (data) => {
  try {
    const [rows] = await pool.execute(
      'INSERT INTO tb_new_user (boj_id, rating, solve, tier) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?, solve = ?, tier = ?',
      [data.boj_id, data.rating, data.full_solved, data.tier, data.rating, data.full_solved, data.tier]
    );
    console.log(`User data added/updated for BOJ ID: ${data.boj_id}`);
  } catch (error) {
    console.error('Error adding user data to database:', error);
  }
};


const add_to_user = (data) => {
  //유저에 넣는거..
  console.log(data);
};

const Add_to_solved = ({ boj_id, solved }) => {
  //푼거에 넣는거..
  if (!Array.isArray(solved) || solved.length === 0) {
    console.error("No solved problems to add.");
    return;
  }
  solved.forEach(({ problemNumber, submissionTimestamp }) => {
    console.log(
      `이름:${boj_id}: 오늘 푼 문제 ${problemNumber} 티어:${findTier(
        problemNumber
      )} 시간: ${submissionTimestamp} \n`
    );
  });
};

const Add_not_solved = (boj_id) => {
  //안푼거에 넣는거...
  console.log(`${boj_id}님은 하나도 안풀었습니당`);
};

module.exports = { Add_to_solved, Add_not_solved, add_to_user, add_to_newuser };
