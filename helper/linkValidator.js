function linkValidator(link) {
  if (link.substring(0, 4) === "http") {
    let linkArray = link.split("/");
    return linkArray[linkArray.length - 1];
  } else {
    return link;
  }
}

module.exports = linkValidator;
