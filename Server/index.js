const express = require('express')
const app = express()
const port = 3000

const merchant_model = require('./merchantModel')
const config = require('./config'); 


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


app.get('/users', (req, res) => {
  console.log("Wyswietlanie: "+ JSON.stringify(req.body));
  merchant_model.getUsers()
  .then(response => {
    console.log("VALUE: "+JSON.stringify(response.body));
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})



app.get('/sizes', (req, res) => {
  console.log("Wyswietlanie: "+ JSON.stringify(req.body));
  merchant_model.getSizes()
  .then(response => {
    console.log("VALUE: "+JSON.stringify(response.body));
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


app.post('/merchants', (req, res) => {
  merchant_model.createMerchant(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})



app.post('/users', (req, res) => {
  console.log(`Request: `);

  
  merchant_model.addUser(req.body)
  .then(response => {
    res.status(200).send("OK: "+response);
  })
  .catch(error => {
    res.status(500).send("My ERROR: "+error);
  })
})

// // POST endpoint to add a new question
// app.post('/users', (request, response) => {
//   // Get the new question object from the request body
//   const newQuestion = request.body;
//   console.log(`REQUEST  @@@@@@@@@@@@@@@@@@@@@@@@@@\n ${request.body}`)

//   // Add the new question to the questions array
//   questions.push(newQuestion);

//   // Send back the updated questions array as the response
//   response.send(questions);
// });















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
 
  //      Workig METHOD ------------------------------------------------------
  // merchant_model.deleteMerchant("socks_shop.availability", "sock_id", 2)
  // merchant_model.createMerchant()
  // merchant_model.updateMerchant()

})