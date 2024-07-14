const user_tier = (n) => {
  if (n < 30) return "Unrated";
  if (n < 60) return "브론즈 5";
  if (n < 90) return "브론즈 4";
  if (n < 120) return "브론즈 3";
  if (n < 150) return "브론즈 2";
  if (n < 200) return "브론즈 1";
  if (n < 300) return "실버 5";
  if (n < 400) return "실버 4";
  if (n < 500) return "실버 3";
  if (n < 650) return "실버 2";
  if (n < 800) return "실버 1";
  if (n < 950) return "골드 5";
  if (n < 1100) return "골드 4";
  if (n < 1250) return "골드 3";
  if (n < 1400) return "골드 2";
  if (n < 1600) return "골드 1";
  if (n < 1750) return "플래티넘 5";
  if (n < 1900) return "플래티넘 4";
  if (n < 2000) return "플래티넘 3";
  if (n < 2100) return "플래티넘 2";
  if (n < 2200) return "플래티넘 1";
  if (n < 2300) return "다이아몬드 5";
  if (n < 2400) return "다이아몬드 4";
  if (n < 2500) return "다이아몬드 3";
  if (n < 2600) return "다이아몬드 2";
  if (n < 2700) return "다이아몬드 1";
  if (n < 2800) return "루비 5";
  if (n < 2850) return "루비 4";
  if (n < 2900) return "루비 3";
  if (n < 2950) return "루비 2";
  if (n < 3000) return "루비 1";
  return "마스터";
};
const findTier = (n) => {
  if (!(n in Data_File.tier_dicts)) {
    return "Unknown";
  }

  let tier = Data_File.tier_dicts[n];
  let b = 5 - (tier % 5);
  let a = Math.floor(tier / 5);

  switch (a) {
    case 0:
      return `브론즈 ${b}`;
    case 1:
      return `실버 ${b}`;
    case 2:
      return `골드 ${b}`;
    case 3:
      return `플래티넘 ${b}`;
    case 4:
      return `다이아 ${b}`;
    case 5:
      return `루비 ${b}`;
    default:
      return "Unknown";
  }
};

module.exports = { user_tier, findTier };
