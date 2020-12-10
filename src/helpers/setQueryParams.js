export const queryParams = (type) => {
  let params = "";
  let selector = "";

  for (const key of type) {
    switch (key) {
      case "scoreboard":
        selector = `orderBy="$value"`;
        break;
      default:
        selector = "";
        break;
    }

    if (!selector) continue;
    params = `?${params}${selector}`;
    console.log("params", params);
  }
  return params;
};
