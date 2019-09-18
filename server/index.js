const express = require('express');
const app = express();

/*
app           get         '/'           req             res             res.send({ hi: 'there'})
 |             |           |             |               |                          |
Express     Watch for     watch for     object          object            immediately send
App to      incoming      requests      representing    representing      some JSON back to
register    requests      trying to     the incoming    the outgoing      who ever made
this        with this     access        request         respons           this request
route       method        '/'
handler 
with
*/
app.get('/', (req, res) => {
  res.send({ bey: 'buddy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Server is running on port: ${PORT}`);
