const API_VERSION = 'v1';
const IP_SERVER = 'localhost';
const PORT_DB = 27017;
const PORT_SERVER = 3000;
// string ADN
const ADN_WORD = [/A/g,/T/g,/C/g,/G/g];
const ADN_REGEX = ['[ATCG]'];

module.exports = {
    API_VERSION,
    IP_SERVER,
    PORT_DB,
    PORT_SERVER,
    ADN_WORD,
    ADN_REGEX
}