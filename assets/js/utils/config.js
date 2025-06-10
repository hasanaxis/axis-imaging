const CONFIG = {
  development: {
    API_URL: "http://localhost:3000",
    DEBUG: true,
  },
  production: {
    API_URL: "https://api.axisimaging.com.au",
    DEBUG: false,
  },
};

export default CONFIG[process.env.NODE_ENV || "development"];
