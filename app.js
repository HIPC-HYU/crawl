const start_crawl = require('./crawl/Check_Solve');
const { erase_yesterday } = require('./crawl/db');

//어제 문제 지우고
erase_yesterday();

//크롤링 시작
start_crawl();