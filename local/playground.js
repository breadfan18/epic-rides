function formatDate(dateStr) {
  if (dateStr === undefined || dateStr === "") return "N/A";
  const dateSplit = dateStr.split("-");
  return `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`;
}

console.log(new Date().toISOString().split("T")[0]);
