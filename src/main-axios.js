import axios from "axios";

const token = "f6dfcce32558f110246c368681b6d84f";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: token
  }
});
