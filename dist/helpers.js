"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeTourData = exports.handleSetClient = exports.getFileNameExtension = exports.isPasswordValid = exports.isEmailAddressValid = exports.setLoginErrorText = exports.fileDataGenerator = exports.sortNumberDesc = exports.calculateCurrentInquiries = exports.setColorForTourStatus = exports.handleInquiriesList = exports.formDisabledCheck = exports.normalizeData = exports.slugify = exports.formatCurrency = exports.formatDate = exports.maskPwd = exports.titleCase = exports.getYearsFromTours = exports.sortNumbers = exports.sortNotesByDate = exports.sortToursByStatus = exports.sortCardsByDate = exports.addUserNameToCard = exports.getDaysBetweenDates = exports.daysTillRewardsExpiration = exports.isDateApproaching = exports.wasCardOpenedWithinLast24Months = exports.pipe = void 0;
const constants_1 = require("./constants/constants");
const countryCodes_1 = __importDefault(require("./constants/countryCodes"));
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
        return "";
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
function sortToursByStatus(tours) {
    const statusIndex = {
        OP: 1,
        HK: 2,
        CA: 3,
    };
    return [...tours].sort((a, b) => statusIndex[a.status] - statusIndex[b.status]);
}
exports.sortToursByStatus = sortToursByStatus;
function sortNotesByDate(notes) {
    return notes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}
exports.sortNotesByDate = sortNotesByDate;
function sortNumbers(data) {
    return data.sort((a, b) => a - b);
}
exports.sortNumbers = sortNumbers;
function getYearsFromTours(tours) {
    return tours.reduce((yearArr, tour) => {
        const thisYear = tour.dateFrom.split("-")[0];
        if (!yearArr.includes(thisYear) && thisYear !== "") {
            yearArr.push(thisYear);
        }
        return yearArr;
    }, []);
}
exports.getYearsFromTours = getYearsFromTours;
function titleCase(str) {
    if ((str === "") | (str === null) || str === undefined)
        return "";
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
    return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
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
function handleInquiriesList(inq) {
    return Object.keys(inq)
        .filter((i) => inq[i])
        .map((inq) => constants_1.CREDIT_BUREAUS.find((i) => inq === i.name));
}
exports.handleInquiriesList = handleInquiriesList;
function setColorForTourStatus(componentType, tourStatus) {
    if (componentType === "tourTable") {
        return tourStatus === "CA"
            ? "table-danger"
            : tourStatus === "HK"
                ? "table-success"
                : null;
    }
    else if (componentType === "tourCard") {
        return tourStatus === "CA"
            ? constants_1.CARD_COLOR_CLOSED
            : tourStatus === "HK"
                ? "#D1E7DD"
                : null;
    }
}
exports.setColorForTourStatus = setColorForTourStatus;
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
function fileDataGenerator(id, data, agentCode) {
    const fileOpenDate = data.fileOpenDate || new Date().toISOString().split("T")[0];
    const fileRef = `${fileOpenDate.substring(2, 7).replaceAll("-", "")}${("000" + id).slice(-3)}${agentCode}`;
    const fileName = `${fileRef}_${(0, exports.slugify)(data.tourName)}`;
    return {
        fileRef,
        fileName,
        fileOpenDate,
    };
}
exports.fileDataGenerator = fileDataGenerator;
function setLoginErrorText(errorCode) {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Invalid email address";
        case "auth/invalid-login-credentials":
            return "Invalid login credentials";
        case "auth/missing-password":
            return "Password Required";
        case "auth/weak-password":
            return "Password must be at least 6 characters";
        case "auth/email-already-in-use":
            return "Email address already registered";
        default:
            break;
    }
}
exports.setLoginErrorText = setLoginErrorText;
function isEmailAddressValid(email) {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailPattern.test(email);
}
exports.isEmailAddressValid = isEmailAddressValid;
function isPasswordValid(pwd) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    return passwordPattern.test(pwd);
}
exports.isPasswordValid = isPasswordValid;
function getFileNameExtension(fileName) {
    const arrSplitByDot = fileName.split(".");
    return arrSplitByDot[arrSplitByDot.length - 1];
}
exports.getFileNameExtension = getFileNameExtension;
function handleSetClient(setData, name, value) {
    setData((prevData) => {
        const [parentField, childField] = name.split(".");
        if (childField === "nationCode") {
            return {
                ...prevData,
                [parentField]: {
                    ...prevData[parentField],
                    [childField]: value,
                    nationality: countryCodes_1.default.find((country) => country.code === value)
                        .name,
                },
            };
        }
        else {
            return {
                ...prevData,
                [parentField]: {
                    ...prevData[parentField],
                    [childField]: value,
                },
            };
        }
    });
}
exports.handleSetClient = handleSetClient;
function handleTourMetadata(data, user) {
    if (data.id) {
        return {
            ...data.metadata,
            editedBy: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL || null,
            },
        };
    }
    else {
        return {
            createdBy: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL || null,
            },
        };
    }
}
function finalizeTourData(dataForModal, allData, user, dateFrom, dateTo, id) {
    const numOfDays = getDaysBetweenDates(dateFrom, dateTo);
    const file = fileDataGenerator(id, dataForModal, dataForModal.agent.code);
    const metadata = handleTourMetadata(dataForModal, user);
    const paxNum = dataForModal.paxNum || "N/A";
    const agent = !dataForModal.id && dataForModal.agent.code === "DIR"
        ? {
            ...dataForModal.agent,
            name: `DIR - ${dataForModal.agent.name}`,
        }
        : dataForModal.agent;
    return {
        ...dataForModal,
        dateFrom,
        dateTo,
        agent,
        numOfDays,
        paxNum,
        ...file,
        metadata,
    };
}
exports.finalizeTourData = finalizeTourData;
