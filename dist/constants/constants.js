"use strict";
// New Constants
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOUR_WIP_IMG = exports.TOUR_CONFIRMED_IMG = exports.TOUR_CANCELLED_IMG = exports.AGENT_STOCK_IMG = exports.EPIC_LOGO = exports.USER_STOCK_IMG_WHITE_BKGRD = exports.USER_STOCK_IMG = exports.DELETE_MODAL_TYPES = exports.CREDIT_BUREAUS = exports.USERS = exports.CARD_STATUS = exports.ACCOUNT_TYPE = exports.CARD_TYPE = exports.ISSUERS = exports.LOYALTY_DATA_KEYS = exports.ERN_DATA_KEYS = exports.NEW_NOTE = exports.REMINDERS_TEXT_BONUS = exports.REMINDERS_TEXT_AF = exports.CARD_COLOR_DOWNGRADED = exports.CARD_COLOR_CLOSED = exports.CANCELLED_COLOR_RED = exports.DELETE_COLOR_RED = exports.EDIT_COLOR_GREEN = exports.APP_COLOR_BLACK_OPACITY = exports.APP_COLOR_LIGHT_BLUE = exports.APP_COLOR_LIGHT_GRAY = exports.APP_COLOR_EPIC_RED = exports.TOUR_DETAILS_IMAGES = exports.ERN_PASSCODE = exports.NEW_SIGN_IN_STATE = exports.NEW_USER = exports.NEW_DATA = exports.STATUS_CODES = exports.AGENTS = exports.DIRECT_CLIENTS = void 0;
exports.DIRECT_CLIENTS = {
    name: null,
    code: "DIR",
    nationCode: null,
    nationality: null,
};
exports.AGENTS = [
    {
        name: "Direct Clients",
        code: "DIR",
    },
    {
        name: "DAV Summit Club",
        code: "DAV",
    },
    {
        name: "Xtrip",
        code: "XTP",
    },
    {
        name: "TCE",
        code: "TCE",
    },
    {
        name: "Untamed Traveling",
        code: "UTR",
    },
    {
        name: "Experience Travel",
        code: "EXP",
    },
    {
        name: "BB Voyages",
        code: "BBV",
    },
];
exports.STATUS_CODES = [
    { name: "Open Dated", code: "OP" },
    { name: "Confirmed", code: "HK" },
    { name: "Cancelled", code: "CA" },
    // { name: "Reserved", code: "RR" },
    // { name: "Completed and Closed", code: "CC" },
    // { name: "Cancelled", code: "XX" },
    // { name: "Status Not Available", code: "NA" },
    // { name: "Declined", code: "DL" },
];
exports.NEW_DATA = {
    fileOpenDate: null,
    id: null,
    agent: {
        name: null,
        code: null,
    },
    tourName: null,
    groupFitName: null,
    paxNum: null,
    // dateFrom: "",
    // dateTo: "",
    numOfDays: null,
    status: "OP",
    fileRef: null,
    fileName: null,
    remarks: null,
    fileLocation: null,
};
exports.NEW_USER = {
    firstName: "",
    lastName: "",
    email: "",
    pwd: "",
    confirmPwd: "",
    img: null,
};
exports.NEW_SIGN_IN_STATE = {
    email: "",
    pwd: "",
};
exports.ERN_PASSCODE = "ERN%CNA24*";
exports.TOUR_DETAILS_IMAGES = [
    "https://i.imgur.com/6zoDtVD.png",
    "https://i.imgur.com/MI2XBOj.png",
    "https://i.imgur.com/AmGmkVV.png",
    "https://i.imgur.com/jILeCMi.png",
    "https://i.imgur.com/k7nQEbV.png",
    "https://i.imgur.com/wzt7N7G.png",
    "https://i.imgur.com/DKkCN78.png",
];
// Colors
exports.APP_COLOR_EPIC_RED = "rgba(69,15,1,1)";
exports.APP_COLOR_LIGHT_GRAY = "#D9D7D7";
exports.APP_COLOR_LIGHT_BLUE = "rgb(210, 237, 246)";
exports.APP_COLOR_BLACK_OPACITY = "rgba(0,0,0,0.09)";
exports.EDIT_COLOR_GREEN = "#198754";
exports.DELETE_COLOR_RED = "#DC3545";
exports.CANCELLED_COLOR_RED = "#F8D7DA";
exports.CARD_COLOR_CLOSED = "rgb(248,215,218)";
exports.CARD_COLOR_DOWNGRADED = "rgb(255,243,205)";
// Texts
exports.REMINDERS_TEXT_AF = "Annual Fee is due within 90 days";
exports.REMINDERS_TEXT_BONUS = "Bonus earn deadline is within 30 days";
// Data
exports.NEW_NOTE = {
    note: "",
    date: null,
};
exports.ERN_DATA_KEYS = {
    fileOpenDate: "fileOpenDate",
    id: "id",
    tourName: "tourName",
    groupFitName: "groupFitName",
    paxNum: "paxNum",
    dateFrom: "dateFrom",
    dateTo: "dateTo",
    numOfDays: "numOfDays",
    status: "status",
    fileNo: "fileNo",
    fileName: "fileName",
    remarks: "remarks",
    fileLocation: "fileLocation",
    agent: "agent",
};
exports.LOYALTY_DATA_KEYS = {
    loyaltyType: "loyaltyType",
    program: "program",
    memberId: "memberId",
    loginId: "loginId",
    password: "password",
    userId: "userId",
    rewardsBalance: "rewardsBalance",
    rewardsExpiration: "rewardsExpiration",
};
exports.ISSUERS = [
    { name: "Chase", img: "https://i.imgur.com/AsfYKFY.png" },
    { name: "Amex", img: "https://i.imgur.com/1XOuPt8.png" },
    { name: "Capital One", img: "https://i.imgur.com/u3Rr8rT.png" },
    { name: "Barclays", img: "https://i.imgur.com/bsjoGQv.png" },
    { name: "Citi", img: "https://i.imgur.com/3xnhXZo.png" },
    { name: "Wells Fargo", img: "https://i.imgur.com/GJT4lHt.png" },
    { name: "Bank of America", img: "https://i.imgur.com/PsqVIEx.png" },
];
exports.CARD_TYPE = ["Personal", "Business"];
exports.ACCOUNT_TYPE = ["airlines", "hotels", "misc"];
exports.CARD_STATUS = ["open", "closed", "downgraded"];
exports.USERS = [
    {
        id: 1,
        name: "Swaroop Uprety",
    },
    {
        id: 2,
        name: "Anshu Thapa",
    },
    {
        id: 3,
        name: "Astha Thapa",
    },
    {
        id: 4,
        name: "Tulasi Uprety",
    },
    {
        id: 5,
        name: "Lisandro Martinez",
    },
];
exports.CREDIT_BUREAUS = [
    {
        name: "experian",
        img: "https://i.imgur.com/c3o42yy.png",
    },
    {
        name: "equifax",
        img: "https://i.imgur.com/94ANFF2.png",
    },
    {
        name: "transunion",
        img: "https://i.imgur.com/4NwVzht.png",
    },
];
exports.DELETE_MODAL_TYPES = {
    tour: "tour",
    agent: "agent",
};
exports.USER_STOCK_IMG = "https://i.imgur.com/iALkKsV.png";
exports.USER_STOCK_IMG_WHITE_BKGRD = "https://i.imgur.com/bUmgFm9.png";
exports.EPIC_LOGO = "https://i.imgur.com/M0W3075.png";
exports.AGENT_STOCK_IMG = "https://i.imgur.com/aex0YDW.png";
exports.TOUR_CANCELLED_IMG = "https://firebasestorage.googleapis.com/v0/b/epic-rides-aa67e.appspot.com/o/images%2Fcancelled-rubber-stamp-free.png?alt=media&token=8a482039-3e1f-476d-8e0b-99087dfc0225";
exports.TOUR_CONFIRMED_IMG = "https://firebasestorage.googleapis.com/v0/b/epic-rides-aa67e.appspot.com/o/images%2Fconfirmed_tour.png?alt=media&token=6e281ff6-911c-4a05-8f3b-c54b799b8f01";
exports.TOUR_WIP_IMG = "https://firebasestorage.googleapis.com/v0/b/epic-rides-aa67e.appspot.com/o/images%2Fwork-in-progress.png?alt=media&token=18728be3-52ef-47bf-80f2-e37e510f89c5";
