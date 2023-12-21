import {
  CARD_COLOR_CLOSED,
  CARD_COLOR_DOWNGRADED,
  CREDIT_BUREAUS,
} from "./constants/constants";

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

export function wasCardOpenedWithinLast24Months(appDate) {
  const twoYearsAgoFromToday = Date.parse(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2))
  );
  const today = Date.now();
  const parsedAppDate = Date.parse(appDate);
  return parsedAppDate >= twoYearsAgoFromToday && parsedAppDate <= today;
}

export function isDateApproaching(data, dataType, numberOfDays) {
  if (!data[dataType]) return;
  const formattedDate = new Date(data[dataType]);
  const parsedDate = Date.parse(data[dataType]);
  const today = Date.now();
  const daysBeforeDate = Date.parse(
    new Date(formattedDate.setDate(formattedDate.getDate() - numberOfDays))
  );
  return today >= daysBeforeDate && today <= parsedDate;
}

export function daysTillRewardsExpiration(rewardsExpirationDate) {
  if (!rewardsExpirationDate) return;
  const expirationDate = new Date(rewardsExpirationDate);
  const todaysDate = Date.now();
  return Math.round((expirationDate - todaysDate) / (1000 * 60 * 60 * 24));
}

export function getDaysBetweenDates(startDate, endDate) {
  if (!endDate || !startDate) return "";
  const parsedEndDate = new Date(endDate);
  const parsedStartDate = new Date(startDate);
  return (
    Math.round((parsedEndDate - parsedStartDate) / (1000 * 60 * 60 * 24)) + 1
  );
}

export function addUserNameToCard(card, cardholders) {
  const cardholder = cardholders.find((holder) => holder.id === card.userId);
  if (cardholder?.name !== card?.cardholder) {
    return {
      ...card,
      cardholder: cardholder?.name,
      userId: cardholder?.id,
    };
  }
  return card;
}

export function sortCardsByDate(cards) {
  return [...cards].sort(
    (a, b) => Date.parse(b.appDate) - Date.parse(a.appDate)
  );
}
export function sortToursByStatus(tours) {
  const statusIndex = {
    OP: 1,
    HK: 2,
    CA: 3,
  };
  return [...tours].sort(
    (a, b) => statusIndex[a.status] - statusIndex[b.status]
  );
}

export function sortNotesByDate(notes) {
  return notes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

export function sortNumbers(data) {
  return data.sort((a, b) => a - b);
}

export function getYearsFromTours(tours) {
  return tours.reduce((yearArr, tour) => {
    const thisYear = tour.dateFrom.split("-")[0];
    if (!yearArr.includes(thisYear) && thisYear !== "") {
      yearArr.push(thisYear);
    }
    return yearArr;
  }, []);
}

export function titleCase(str) {
  if ((str === "") | (str === null) || str === undefined) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function maskPwd(str) {
  const centerStr = str.substring(1, str.length - 2);
  return (
    str.charAt(0) + "*".repeat(centerStr.length) + str.substring(str.length - 2)
  );
}

export function formatDate(dateStr) {
  if (dateStr === undefined || dateStr === "") return "N/A";
  const dateSplit = dateStr.split("-");
  return `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`;
}

export function formatCurrency(currencyStr) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(currencyStr);
}

export const slugify = (str) => {
  const whitespacePattern = /[\s-]+/g;
  const nonLatinPattern = /[^\w-]/g;
  return str
    .trim()
    .toLocaleLowerCase("en-US")
    .normalize("NFKD")
    .replace(nonLatinPattern, " ")
    .replace(whitespacePattern, "-")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Not using this function right now. But need to try again in the future
export const normalizeData = (cards) => {
  const formattedCards = [...cards].map((card) => {
    card.appDate = formatDate(card.appDate);
    card.nextFeeDate === ""
      ? (card.nextFeeDate = "N/A")
      : (card.nextFeeDate = formatDate(card.nextFeeDate));
    card.spendBy === ""
      ? (card.spendBy = "N/A")
      : (card.spendBy = formatDate(card.spendBy));
    card.bonusEarnDate === "" || card.bonusEarnDate === undefined
      ? (card.bonusEarnDate = "WIP")
      : formatDate(card.bonusEarnDate);
    card.status = titleCase(card.status);
    card.inquiries = handleInquiriesList(card.inquiries, "\n");
    return card;
  });

  return formattedCards;
};

export function formDisabledCheck(dataType) {
  return (
    dataType === 0 || dataType === "0" || dataType === "" || dataType === null
  );
}

export function handleInquiriesList(inq) {
  return Object.keys(inq)
    .filter((i) => inq[i])
    .map((inq) => CREDIT_BUREAUS.find((i) => inq === i.name));
}

export function setColorForTourStatus(componentType, tourStatus) {
  if (componentType === "tourTable") {
    return tourStatus === "CA"
      ? "table-danger"
      : tourStatus === "HK"
      ? "table-success"
      : null;
  } else if (componentType === "tourCard") {
    return tourStatus === "CA"
      ? CARD_COLOR_CLOSED
      : tourStatus === "HK"
      ? "#D1E7DD"
      : null;
  }
}

export function calculateCurrentInquiries(cardsByHolder) {
  const inquiriesByHolder = { ...cardsByHolder };

  Object.keys(inquiriesByHolder).forEach((holder) => {
    const totalInq = cardsByHolder[holder]
      .filter((i) => wasCardOpenedWithinLast24Months(i.appDate))
      .reduce(
        (output, i) => {
          const inquiries = i.inquiries;
          if (inquiries.experian) output["experian"]++;
          if (inquiries.equifax) output["equifax"]++;
          if (inquiries.transunion) output["transunion"]++;

          return output;
        },
        {
          experian: 0,
          equifax: 0,
          transunion: 0,
        }
      );
    inquiriesByHolder[holder] = totalInq;
  });

  return inquiriesByHolder;
}

export function sortNumberDesc(num1, num2) {
  const parsedNum1 = parseInt(num1 || "0");
  const parsedNum2 = parseInt(num2 || "0");

  return parsedNum2 - parsedNum1;
}

export function fileNameGenerator(
  id,
  agentCode,
  dateFrom,
  numOfDays,
  tourName
) {
  if (dateFrom === "" || dateFrom === null || dateFrom === undefined)
    return {
      fileRef: "undated",
      fileName: "undated",
    };
  const fileRef =
    dateFrom.substring(2, 7).replaceAll("-", "") +
    ("000" + id).slice(-3) +
    agentCode;

  const fileName = `${fileRef}_${numOfDays}_${tourName}`;
  return {
    fileRef,
    fileName,
    fileOpenDate: new Date().toISOString().split("T")[0],
  };
}

export function setLoginErrorText(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/invalid-login-credentials":
      return "Invalid login credentials";
    default:
      break;
  }
}
