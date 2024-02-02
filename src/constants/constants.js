// New Constants

export const DIRECT_CLIENTS = {
  name: "Direct Client",
  code: "DIR",
  nationCode: null,
  nationality: null,
};

export const AGENTS = [
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

export const STATUS_CODES = [
  { name: "Open Dated", code: "OP" },
  { name: "Confirmed", code: "HK" },
  { name: "Cancelled", code: "CA" },
  // { name: "Reserved", code: "RR" },
  // { name: "Completed and Closed", code: "CC" },
  // { name: "Cancelled", code: "XX" },
  // { name: "Status Not Available", code: "NA" },
  // { name: "Declined", code: "DL" },
];

export const NEW_DATA = {
  fileOpenDate: null,
  id: null,
  agent: {
    name: null,
    code: null,
  },
  tourName: null,
  groupFitName: null,
  paxNum: null,
  dateFrom: "",
  dateTo: "",
  numOfDays: null,
  status: "OP",
  fileRef: null,
  fileName: null,
  remarks: null,
  fileLocation: null,
};

export const NEW_USER = {
  firstName: "",
  lastName: "",
  email: "",
  pwd: "",
  confirmPwd: "",
  img: null,
};

export const NEW_SIGN_IN_STATE = {
  email: "",
  pwd: "",
};

export const ERN_PASSCODE = "ERN%CNA24*";

export const TOUR_DETAILS_IMAGES = [
  "https://i.imgur.com/6zoDtVD.png",
  "https://i.imgur.com/MI2XBOj.png",
  "https://i.imgur.com/AmGmkVV.png",
  "https://i.imgur.com/jILeCMi.png",
  "https://i.imgur.com/k7nQEbV.png",
  "https://i.imgur.com/wzt7N7G.png",
  "https://i.imgur.com/DKkCN78.png",
];

// Colors
export const APP_COLOR_EPIC_RED = "rgba(69,15,1,1)";
export const APP_COLOR_LIGHT_GRAY = "#D9D7D7";
export const APP_COLOR_LIGHT_BLUE = "rgb(210, 237, 246)";
export const APP_COLOR_BLACK_OPACITY = "rgba(0,0,0,0.09)";
export const EDIT_COLOR_GREEN = "#198754";
export const DELETE_COLOR_RED = "#DC3545";
export const CANCELLED_COLOR_RED = "#F8D7DA";
export const CARD_COLOR_CLOSED = "rgb(248,215,218)";
export const CARD_COLOR_DOWNGRADED = "rgb(255,243,205)";

// Texts
export const REMINDERS_TEXT_AF = "Annual Fee is due within 90 days";
export const REMINDERS_TEXT_BONUS = "Bonus earn deadline is within 30 days";

// Data
export const NEW_NOTE = {
  note: "",
  date: null,
};

export const ERN_DATA_KEYS = {
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

export const LOYALTY_DATA_KEYS = {
  loyaltyType: "loyaltyType",
  program: "program",
  memberId: "memberId",
  loginId: "loginId",
  password: "password",
  userId: "userId",
  rewardsBalance: "rewardsBalance",
  rewardsExpiration: "rewardsExpiration",
};

export const ISSUERS = [
  { name: "Chase", img: "https://i.imgur.com/AsfYKFY.png" },
  { name: "Amex", img: "https://i.imgur.com/1XOuPt8.png" },
  { name: "Capital One", img: "https://i.imgur.com/u3Rr8rT.png" },
  { name: "Barclays", img: "https://i.imgur.com/bsjoGQv.png" },
  { name: "Citi", img: "https://i.imgur.com/3xnhXZo.png" },
  { name: "Wells Fargo", img: "https://i.imgur.com/GJT4lHt.png" },
  { name: "Bank of America", img: "https://i.imgur.com/PsqVIEx.png" },
];

export const CARD_TYPE = ["Personal", "Business"];
export const ACCOUNT_TYPE = ["airlines", "hotels", "misc"];
export const CARD_STATUS = ["open", "closed", "downgraded"];

export const USERS = [
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

export const CREDIT_BUREAUS = [
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

export const DELETE_MODAL_TYPES = {
  tour: "tour",
  agent: "agent",
};

export const USER_STOCK_IMG = "https://i.imgur.com/iALkKsV.png";
export const USER_STOCK_IMG_WHITE_BKGRD = "https://i.imgur.com/bUmgFm9.png";
export const EPIC_LOGO = "https://i.imgur.com/M0W3075.png";
