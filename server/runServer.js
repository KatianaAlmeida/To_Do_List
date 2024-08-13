const app = require('./serverAPI');
const PORT = process.env.PORT || 5000;// process.env.PORT = if we want to publish the app later on

/* ----- Listen on enviroment port or 5000 ----- */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});