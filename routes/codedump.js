// get db.json
app.get('./db/', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

//post note add to db return new note ----- NEEDS REFACTOR -----
app.post('/api/reviews', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { product, review, username } = req.body;
  
    // If all the required properties are present
    if (product && review && username) {
      // Variable for the object we will save
      const newReview = {
        product,
        review,
        username,
        review_id: uuid(),
      };
  
      // Obtain existing reviews
      fs.readFile('./db/reviews.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedReviews = JSON.parse(data);
  
          // Add a new review
          parsedReviews.push(newReview);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './db/reviews.json',
            JSON.stringify(parsedReviews, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });