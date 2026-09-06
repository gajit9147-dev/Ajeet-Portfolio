const ajeetProfile = require("../data/ajeetProfile");

function getKnowledge(question = "") {
  return ajeetProfile;
}

module.exports = {
  getKnowledge,
};
