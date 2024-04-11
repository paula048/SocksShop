const express = require('express')
const app = express()
const port = 3000

const merchant_model = require('./merchantModel')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  console.log("Wyswietlanie: "+ JSON.stringify(req.body));
  merchant_model.getMerchants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/merchants', (req, res) => {
  console.log(`Request: `);

  
  merchant_model.createMerchant(req.body)
  .then(response => {
    res.status(200).send("OK: "+response);
  })
  .catch(error => {
    res.status(500).send("My ERROR: "+error);
  })
})






app.delete('/DELETE/:id', (req, res) => {
  merchant_model.deleteMerchant(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})





app.put("/merchants/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  merchant_model
    .updateMerchant(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
 
  // merchant_model.deleteMerchant("socks_shop.availability", "sock_id", 2)

})