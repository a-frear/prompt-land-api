module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_ORIGIN: "https://prompt-land.com" || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://dunder_mifflin@localhost/prompt_land",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://dunder_mifflin@localhost/prompt_land_test",
};
