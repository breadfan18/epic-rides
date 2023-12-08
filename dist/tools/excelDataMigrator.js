"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const csv_stringify_1 = require("csv-stringify");
const uid_1 = require("uid");
const lodash_1 = __importDefault(require("lodash"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
function formatDate(dateStr) {
    if (dateStr.length === 0 || dateStr.length === undefined)
        return "";
    const dateSplit = dateStr.split("-");
    if (dateSplit[0].length === 4) {
        const year = dateSplit.shift();
        dateSplit.push(year);
    }
    const formattedMonth = dateSplit[0].length === 1 ? `0${dateSplit[0]}` : dateSplit[0];
    const formattedDay = dateSplit[1].length === 1 ? `0${dateSplit[1]}` : dateSplit[1];
    return `${dateSplit[2]}-${formattedMonth}-${formattedDay}`;
}
const directory = (folder) => {
    return Object.freeze({
        empty: () => fs_extra_1.default.emptyDirSync(folder),
    });
};
const jsonFile = (filePath) => {
    return Object.freeze({
        // TYPE Question -> What should the type of the data parameter be?
        // How do we make it so this can accept different data of different type
        write: (data) => fs_extra_1.default.writeJSONSync(filePath, data, { spaces: 1 }),
        read: () => {
            try {
                return fs_extra_1.default.readJSONSync(filePath);
            }
            catch (err) {
                console.log(err);
            }
        },
    });
};
const csvFile = (filePath) => {
    return Object.freeze({
        write: (data) => {
            try {
                (0, csv_stringify_1.stringify)(data.entities, {
                    header: true,
                }, (err, output) => {
                    fs_extra_1.default.writeFileSync(filePath, output);
                });
            }
            catch (err) {
                console.log(err);
                throw Error("Error writing CSV");
            }
        },
    });
};
const fooFile = jsonFile("/Users/su23140/Developer/personal/projects/travel-makers/src/components/data/foo.json");
const baseData = jsonFile("/Users/su23140/Developer/personal/projects/travel-makers/src/components/data/data.json");
const test = baseData.read();
const grouped = lodash_1.default.groupBy(test.users["htCE4C1iA2T6p5p2Gcn9kAdL1Vy1"].data, "id");
// const foo = _.values(
//   test.users["iXoAbxO0hMNBUUCzMnpnSydNKZg1"].loyaltyData
// ).map((loyalty) => {
//   const thisUser = USERS.find((u) => u.id === loyalty.userId).name;
//   const newUserId = slugify(thisUser);
//   console.log(newUserId);
//   if (loyalty.cardholder === undefined) {
//     return {
//       ...loyalty,
//       userId: newUserId,
//       cardholder: thisUser,
//     };
//   }
//   return {
//     ...loyalty,
//     userId: newUserId,
//   };
// });
// const withUid = test.map(card => {
//   const keysSorted = _.chain(card).toPairs().sortBy(0).fromPairs().value()
//   const inquiriesSplit = keysSorted.inquiries.split(' , ')
//   const inqObj = {
//     experian: inquiriesSplit.includes('Experian'),
//     equifax: inquiriesSplit.includes('Equifax'),
//     transunion: inquiriesSplit.includes('Transunion')
//   }
//   const issuerObj = ISSUERS.find(issuer => issuer.name === keysSorted.issuer)
//   const id = slugify(
//     issuerObj.name + " " + card.card + " " + card.userId + " " + uid()
//   )
//   return {
//     ...keysSorted,
//     inquiries: inqObj,
//     issuer: issuerObj,
//     id
//   }
// })
// const loyaltyWithUid = test.map((loyalty) => {
//   const keysSorted = _.chain(loyalty).toPairs().sortBy(0).fromPairs().value();
//   const programObj = PROGRAMS.find((p) => p.id === keysSorted.program);
//   const id = slugify(programObj.name + "-" + loyalty.userId + "-" + uid());
//   console.log({ id });
//   return {
//     ...keysSorted,
//     program: programObj,
//     id,
//   };
// });
fooFile.write(lodash_1.default.keyBy(test.users["htCE4C1iA2T6p5p2Gcn9kAdL1Vy1"].data, "id"));
