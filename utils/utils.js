exports.capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

exports.rmWhitespace = (str) => {
  return str.replace(/\s/g,"")
}

exports.whitespaceToUnderscore = (str) => {
  return str.replace(/\s/g,"_");
}

exports.underscoreToWhitespace = (str) => {
  return str.replace(/_/g, " ");
}

exports.removeClassnameFromDoc = (str) => {
  const elements = document.getElementsByClassName('collapse');
  elements.forEach((el) => {
    el.classList.remove(str);
  });
}