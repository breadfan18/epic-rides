"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uid_1 = require("uid");
const helpers_1 = require("../helpers");
const firebase_1 = require("../tools/firebase");
const constants_1 = require("../constants");
// Random Date
function getRandomDate(startDate, endDate) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDiff;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate.toISOString().slice(0, 10);
}
// Random Issuer
const randomIssuer = constants_1.ISSUERS[Math.floor(Math.random() * constants_1.ISSUERS.length)];
// Random Card Type
const CARD_TYPE = ["Personal", "Business"];
const randomCardType = CARD_TYPE[Math.floor(Math.random() * CARD_TYPE.length)];
const testCard = {
    appDate: getRandomDate(new Date("2021-08-24"), new Date()),
    issuer: randomIssuer,
    card: "FOO",
    cardType: randomCardType,
    inquiries: {
        experian: true,
        equifax: true,
        transunion: false,
    },
    annualFee: 95,
    nextFeeDate: getRandomDate(new Date("2021-08-24"), new Date()),
    creditLine: Math.floor(Math.random() * (10000 - 4000) + 4000).toString(),
    spendReq: Math.floor(Math.random() * (3000 - 1000) + 1000).toString(),
    spendBy: getRandomDate(new Date("2021-08-24"), new Date()),
    signupBonus: "50,000 UR",
    bonusEarned: false,
    bonusEarnDate: "",
    status: "open",
    userId: 5,
};
const uuid = (0, helpers_1.slugify)(testCard.issuer.name +
    " " +
    testCard.card +
    " " +
    testCard.userId +
    " " +
    (0, uid_1.uid)());
(0, firebase_1.writeToFirebase)("cards", testCard, uuid, "8r0cFCOL9XWYE2zq4l37Vficfwf1");
