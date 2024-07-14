const Data_File = require("./Data_file");
const { findTier } = require("./util");

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

module.exports = { Add_to_solved, Add_not_solved, add_to_user };
