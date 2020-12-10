import { useParams } from "react-router";
import axios from "../config/axiosConfig";
import { queryParams } from "../helpers/setQueryParams";

export const scoreSubmit = async (score) => {
  try {
    const response = await axios.post("/scoreboard.json", score);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getScores = async () => {
  let params = queryParams(["scoreboard"]);
  console.log("Query", params);
  try {
    const response = await axios.get("/scoreboard.json" + params);
    return response;
  } catch (error) {
    console.log(error);
  }
};
