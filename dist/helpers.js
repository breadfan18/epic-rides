"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNameGenerator = exports.sortNumberDesc = exports.calculateCurrentInquiries = exports.setColorForCardStatus = exports.handleInquiriesList = exports.formDisabledCheck = exports.normalizeData = exports.slugify = exports.formatCurrency = exports.formatDate = exports.maskPwd = exports.titleCase = exports.sortNotesByDate = exports.sortCardsByDate = exports.addUserNameToCard = exports.getDaysBetweenDates = exports.daysTillRewardsExpiration = exports.isDateApproaching = exports.wasCardOpenedWithinLast24Months = exports.pipe = void 0;
const constants_1 = require("./constants");
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
exports.pipe = pipe;
function wasCardOpenedWithinLast24Months(appDate) {
    const twoYearsAgoFromToday = Date.parse(new Date(new Date().setFullYear(new Date().getFullYear() - 2)));
    const today = Date.now();
    const parsedAppDate = Date.parse(appDate);
    return parsedAppDate >= twoYearsAgoFromToday && parsedAppDate <= today;
}
exports.wasCardOpenedWithinLast24Months = wasCardOpenedWithinLast24Months;
function isDateApproaching(data, dataType, numberOfDays) {
    if (!data[dataType])
        return;
    const formattedDate = new Date(data[dataType]);
    const parsedDate = Date.parse(data[dataType]);
    const today = Date.now();
    const daysBeforeDate = Date.parse(new Date(formattedDate.setDate(formattedDate.getDate() - numberOfDays)));
    return today >= daysBeforeDate && today <= parsedDate;
}
exports.isDateApproaching = isDateApproaching;
function daysTillRewardsExpiration(rewardsExpirationDate) {
    if (!rewardsExpirationDate)
        return;
    const expirationDate = new Date(rewardsExpirationDate);
    const todaysDate = Date.now();
    return Math.round((expirationDate - todaysDate) / (1000 * 60 * 60 * 24));
}
exports.daysTillRewardsExpiration = daysTillRewardsExpiration;
function getDaysBetweenDates(startDate, endDate) {
    if (!endDate || !startDate)
        return;
    const parsedEndDate = new Date(endDate);
    const parsedStartDate = new Date(startDate);
    return (Math.round((parsedEndDate - parsedStartDate) / (1000 * 60 * 60 * 24)) + 1);
}
exports.getDaysBetweenDates = getDaysBetweenDates;
function addUserNameToCard(card, cardholders) {
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
exports.addUserNameToCard = addUserNameToCard;
function sortCardsByDate(cards) {
    return [...cards].sort((a, b) => Date.parse(b.appDate) - Date.parse(a.appDate));
}
exports.sortCardsByDate = sortCardsByDate;
function sortNotesByDate(notes) {
    return notes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}
exports.sortNotesByDate = sortNotesByDate;
function titleCase(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
exports.titleCase = titleCase;
function maskPwd(str) {
    const centerStr = str.substring(1, str.length - 2);
    return (str.charAt(0) + "*".repeat(centerStr.length) + str.substring(str.length - 2));
}
exports.maskPwd = maskPwd;
function formatDate(dateStr) {
    if (dateStr === undefined || dateStr === "")
        return "N/A";
    const dateSplit = dateStr.split("-");
    return `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`;
}
exports.formatDate = formatDate;
function formatCurrency(currencyStr) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(currencyStr);
}
exports.formatCurrency = formatCurrency;
const slugify = (str) => {
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
exports.slugify = slugify;
// Not using this function right now. But need to try again in the future
const normalizeData = (cards) => {
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
exports.normalizeData = normalizeData;
function formDisabledCheck(dataType) {
    return (dataType === 0 || dataType === "0" || dataType === "" || dataType === null);
}
exports.formDisabledCheck = formDisabledCheck;
// export function handleInquiriesList(inq, delimiter) {
//   const inqArr = Object.keys(inq).filter((i) => inq[i]);
//   const lastInq = inqArr[inqArr.length - 1];
//   return inqArr.reduce(
//     (output, i) => (output += titleCase(i) + (i === lastInq ? "" : delimiter)),
//     ""
//   );
// }
function handleInquiriesList(inq) {
    return Object.keys(inq)
        .filter((i) => inq[i])
        .map((inq) => constants_1.CREDIT_BUREAUS.find((i) => inq === i.name));
}
exports.handleInquiriesList = handleInquiriesList;
function setColorForCardStatus(componentType, cardStatus) {
    if (componentType === "cardTable") {
        return cardStatus === "closed"
            ? "table-danger"
            : cardStatus === "downgraded"
                ? "table-warning"
                : null;
    }
    else if (componentType === "cardCard") {
        return cardStatus === "closed"
            ? constants_1.CARD_COLOR_CLOSED
            : cardStatus === "downgraded"
                ? constants_1.CARD_COLOR_DOWNGRADED
                : null;
    }
}
exports.setColorForCardStatus = setColorForCardStatus;
function calculateCurrentInquiries(cardsByHolder) {
    const inquiriesByHolder = { ...cardsByHolder };
    Object.keys(inquiriesByHolder).forEach((holder) => {
        const totalInq = cardsByHolder[holder]
            .filter((i) => wasCardOpenedWithinLast24Months(i.appDate))
            .reduce((output, i) => {
            const inquiries = i.inquiries;
            if (inquiries.experian)
                output["experian"]++;
            if (inquiries.equifax)
                output["equifax"]++;
            if (inquiries.transunion)
                output["transunion"]++;
            return output;
        }, {
            experian: 0,
            equifax: 0,
            transunion: 0,
        });
        inquiriesByHolder[holder] = totalInq;
    });
    return inquiriesByHolder;
}
exports.calculateCurrentInquiries = calculateCurrentInquiries;
function sortNumberDesc(num1, num2) {
    const parsedNum1 = parseInt(num1 || "0");
    const parsedNum2 = parseInt(num2 || "0");
    return parsedNum2 - parsedNum1;
}
exports.sortNumberDesc = sortNumberDesc;
function fileNameGenerator(id, agentCode, dateFrom, numOfDays, tourName) {
    const fileNum = dateFrom.substring(2, 7).replaceAll("-", "") +
        ("000" + id).slice(-3) +
        agentCode;
    const fileName = `${fileNum}_${numOfDays}_${tourName}}`;
    return {
        fileNum,
        fileName,
    };
}
exports.fileNameGenerator = fileNameGenerator;
