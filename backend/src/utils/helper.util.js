function isImageUrl(url) {
  return typeof url === "string" && url.trim() !== "";
}

module.exports = {
  isImageUrl
};
