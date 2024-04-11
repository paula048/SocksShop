const config = require('./config'); 


const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: 5432,
});

const tmp_path = "socks_shop.availability";
//get all merchants our database
const getMerchants = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(`SELECT * FROM ${tmp_path}`, (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};




//create a new merchant record in the databsse        pierwotne ----------- SAVE
const createMerchant = (body) => {
  return new Promise(function (resolve, reject) {
    const { sock_id, size, quantity } = body;
    pool.query(
      "INSERT INTO socks_shop.availability (sock_id, size, quantity) VALUES ($1, $2, $3) RETURNING *",
      [sock_id, size, quantity],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new merchant has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};




// //delete a merchant  pierwotna versja
// const deleteMerchant = (id) => {
//   console.log("STEP 1");
//   return new Promise(function (resolve, reject) {
//     pool.query(
//       "DELETE FROM socks_shop.availability WHERE sock_id = $1",
//       [id],
//       (error, results) => {
//         if (error) {
//           reject("DELETE ERROR: "+error);
//         }
//         resolve(`Merchant deleted with sock_id: ${id}`);
//       }
//     );
//   });
// };



// delete a merchant --------------------------------------WORKS
const deleteMerchant = (from, where, id) => {
  console.log("STEP 1");
  return new Promise(function (resolve, reject) {
    const query = `DELETE FROM ${from} WHERE ${where} = $1`;
    pool.query(
      query,
      [id],
      (error, results) => {
        if (error) {
          reject("DELETE ERROR: " + error);
        }
        resolve(`Merchant deleted with sock_id: ${id}`);
      }
    );
  });
};



//update a merchant record
const updateMerchant = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "UPDATE merchants SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Merchant updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
  updateMerchant
};