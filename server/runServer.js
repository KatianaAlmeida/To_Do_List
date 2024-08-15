const app = require('./serverAPI'); // Import the serverAPI module
const PORT = process.env.PORT || 5000;// process.env.PORT => if we want to publish the app later on

/* ----- Start the server and listen on the specified port ----- */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});