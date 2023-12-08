const id = 12;
const agent = {
  name: "Direct Clients",
  code: "DIR",
};

const dateFrom = "2024-05-15";

function fileNameGenerator(id, agentCode, dateFrom, numOfDays, tourName) {
  const fileNum =
    dateFrom.substring(2, 7).replaceAll("-", "") +
    ("000" + id).slice(-3) +
    agentCode;

  const fileName = `${fileNum}_${numOfDays}_${tourName}}`;
  return {
    fileNum,
    fileName,
  };
}

console.log(fileNameGenerator(id, agent.code, dateFrom));
