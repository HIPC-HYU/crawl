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

const add_to_state = (data) => {
  //유저랑 분기 처음 상태 넣기 .. 이메일이랑 다 받은 다음에 해야하는데..?

  console.log(data);
};

const erase_yesterday = async () => {
  await pool.execute(
   'TRUNCATE TABLE tb_problem'
 )
}

const add_to_newstate = async (data) => {
  try {
    const [rows] = await pool.execute(
      "INSERT INTO tb_newstate (boj_id, rating, solve, tier) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?, solve = ?, tier = ?",
      [
        data.boj_id,
        data.rating,
        data.full_solved,
        data.tier,
        data.rating,
        data.full_solved,
        data.tier,
      ]
    );
    console.log(`User data added/updated for BOJ ID: ${data.boj_id}`);
  } catch (error) {
    console.error("Error adding user data to database:", error);
  }
};

const add_to_solve = async (boj_id, problemNumber, parsedTimestamp) => {
  console.log(problemNumber,parsedTimestamp)
  try {
    const [rows] = await pool.execute(
      "INSERT INTO tb_problem (boj_id, solved_num, time)  VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE boj_id = ?, solved_num = ?, time = ?",
      [
        boj_id,
        parseInt(problemNumber),
        parsedTimestamp,
        boj_id,
        parseInt(problemNumber),
        parsedTimestamp,
      ]
    );
    console.log(`오늘 푼 문제에 추가됨${boj_id}`);
  } catch (error) {
    console.log("추가하다가 error", error);
  }
};

const add_to_notsolve = (boj_id) => {
  //안푼거에 넣는거...
  console.log(`${boj_id}님은 하나도 안풀었습니당`);
};

module.exports = { add_to_solve, erase_yesterday, add_to_notsolve, add_to_state, add_to_newstate };
