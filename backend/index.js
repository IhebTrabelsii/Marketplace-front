const express = require('express');
const bodyParser = require('body-parser'); // Corrected typo here
const cors = require('cors');
const mysql = require('mysql2');

const app= express();
app.use(cors());

// Database connection
const db = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '123$$ihebA',   // ← Make sure this matches
    database: 'machine',
    port: 3306
});

// Check database connection
db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected successfully!");
    }
});

app.use(bodyParser.json()); // Corrected the middleware usage

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
app.get('/getusers', (req, res) => {
    const query = "SELECT * FROM user"; // Moved query string inside the query function
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error retrieving data' });
        } else {
            res.send({
                message: 'All user data',
                data: results
            });
        }
    });
});
app.post('/addUser', (req, res) => {
  const { fullname, email, password, mobilenumber } = req.body;

  // Check if all required fields are provided
  if (!fullname || !email || !password || !mobilenumber) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if the user already exists in the database based on the provided email
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying the database: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'User already exists with this email.' });
    }

    // Insert the new user into the database (excluding the ID)
    const newUser = { fullname, email, password, mobilenumber };
    db.query('INSERT INTO user SET ?', newUser, (err, results) => {
      if (err) {
        console.error('Error inserting user into the database: ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(201).json({ message: 'User added successfully.' });
    });
  });
});

  app.post('/addContact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
  
    // MySQL query to insert the new contact into the 'contact' table
    const insertQuery = `INSERT INTO contact (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, email, phone, subject, message];
  
    db.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error('Error inserting contact:', err);
        return res.status(500).json({ message: 'An error occurred while adding the contact.' });
      }
  
      // Return a success response
      res.status(201).json({ message: 'Contact added successfully!' });
    });
  });
  app.put('/updateuser/:id', (req, res) => {
    const userId = req.params.id;
    const { full_name, email, password, mobile_number } = req.body;
  
    // Ensure that all required fields are provided in the request body
    if (!full_name || !email || !password || !mobile_number) {
        res.status(400).send({ message: 'Name, password, mobile_number, and email are required fields' });
        return;
    }
  
    const updateUserQuery = "UPDATE user SET full_name=?, email=?, password=?, mobile_number=? WHERE id=?";
    const values = [full_name, email, password, mobile_number, userId];
  
    db.query(updateUserQuery, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error updating user data' });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.send({ message: 'User data updated successfully' });
        }
    });
  });
  app.get('/getcontact', (req, res) => {
    const query = "SELECT * FROM contact"; // Moved query string inside the query function
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error retrieving data' });
        } else {
            res.send({
                message: 'All contact data',
                data: results
            });
        }
    });

  });


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if the email exists in the database
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error querying the database: ', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Email not found.' });
        }

        const user = results[0];

        // Check if the provided password matches the stored password
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        // Check if the login is for admin
        if (email === 'admin@gmail.com' && password === 'adminadmin') {
            return res.status(200).json({ message: 'Admin login successful.', user });
        }

        // Password is correct, regular user login is successful
        return res.status(200).json({ message: 'Login successful.', user });
    });
});
  app.get('/api/product', (req, res) => {
    const query = `SELECT * FROM product_user`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching products');
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // index.js
  app.delete('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    const query = `DELETE FROM product_user WHERE id = ?`;
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error('Database delete error:', err);
        res.status(500).send('Error deleting product');
      } else {
        res.status(200).send('Product deleted successfully');
      }
    });
  });

  
  app.delete('/api/product_delete/:id', (req, res) => {
    try {
    const id = req.params.id;
    const query = `DELETE FROM product WHERE id =?`;
    db.query(query, [id],(err, result) => {
      if (err) {
        res.status(500).send('Error deleting',err);
      }else {
        res.status(201).send('Successfully deleted');
      }
    })
  }catch(err) {console.log(err)
    res.status(404).send ('Error server')
  }

});
  app.delete('/api/contact_delete/:id', (req, res) => {
    try {
    const id = req.params.id;
    const query = `DELETE FROM contact WHERE id =?`;
    db.query(query, [id],(err, result) => {
      if (err) {
        res.status(500).send('Error deleting',err);
      }else {
        res.status(201).send('Successfully deleted');
      }
    })
  }catch(err) {console.log(err)
    res.status(404).send ('Error server')
  }

});

  app.delete('/api/user_delete/:id',(req,res) => {
  try{
    const id=req.params.id;
    const query = `DELETE FROM user WHERE id =?`;
    db.query(query, [id],(err, result) => {
      if (err) {
        res.status(500).send('Error deleting',err);
      }else {
        res.status(201).send('Successfully deleted');
      }
    })

  }catch(err) {console.log(err)
    res.status(404).send ('Error server')
  }
}) ;
 

  app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, Email, adress, number, price} = req.body;
    const query = `UPDATE products SET name = ?, Email = ?, adress = ?, number = ?, price = ?, WHERE id = ?`;
    db.query(query, [name, Email, price, number, adress, productId], (err, result) => {
      if (err) {
        console.error('Database update error:', err);
        res.status(500).send('Error updating product');
      } else {
        res.status(200).send('Product updated successfully');
      }
    });
  });
 /* 
  app.delete('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const query = `DELETE FROM product_user WHERE id = ?`;
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Database delete error:', err);
        res.status(500).send('Error deleting product');
      } else {
        res.status(200).send('Product deleted successfully');
      }
    });
  });*/
  app.put('/api/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { fullname, email, mobilenumber, password } = req.body;
  
    const userIndex = users.findIndex(user => user.id === userId);
  
    if (userIndex !== -1) {
      // Update user details
      users[userIndex] = { ...users[userIndex], fullname, email, mobilenumber, password };
      res.status(200).json({ message: 'User details updated successfully.', data: users[userIndex] });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  });
  app.post('/api/add-to-cart', (req, res) => {
    const {  name, address, Email, number, price } = req.body;
    const query = 'INSERT INTO product (name, Email, address, number, price) VALUES (?, ?, ?, ?, ?)';
  
    db.query(query, [name, Email, address, number, price], (err, result) => {
      if (err) {
        console.error('Database insert error:', err);
        res.status(500).send('Error adding product to cart');
      } else {
        res.status(200).send('Product added to cart successfully');
      }
    });
  });
  
  app.get('/api/products-user', (req, res) => {
    const query = `SELECT * FROM product`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching products');
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.get('/api/products-admin', (req, res) => {
    const query = `SELECT * FROM product_admin`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching products');
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // index.js
  app.post('/api/products-admin1', (req, res) => {
    const {name, address, email, number, price } = req.body;
    const query =` INSERT INTO product_admin (name, address, email, number, price) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, address, email, number, price], (err, result) => {
      if (err) {
        console.error('Database insert error:', err);
        res.status(500).send('Error adding product to product-admin');
      } else {
        res.status(200).send('Product added to product-admin successfully');
      }
    });
  });

  app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = `DELETE FROM product_admin WHERE id = ?`;

    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            res.status(500).send('Error deleting product from product-admin');
        } else {
            res.status(200).send('Product deleted from product-admin successfully');
        }
    });
});


app.delete('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = `DELETE FROM user_admin WHERE id = ?`;

  db.query(query, [userId], (err, result) => {
      if (err) {
          console.error('Database delete error:', err);
          res.status(500).send('Error deleting product from user-admin');
      } else {
          res.status(200).send('Product deleted from user-admin successfully');
      }
  });
});

app.put('/api/products-admin/:id', (req, res) => {
  const productId = req.params.id;
  const { name, address, email, number, price } = req.body;
  const updateQuery = `UPDATE product_admin SET name = ?, address = ?, email = ?, number = ?, price = ? WHERE id = ?`;

  db.query(updateQuery, [name, address, email, number, price, productId], (err, result) => {
      if (err) {
          console.error('Database update error:', err);
          res.status(500).send('Error updating product in product-admin');
      } else {
          res.status(200).send('Product updated in product-admin successfully');
      }
  });
});

app.get('/getuserid/:id', (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM user WHERE id = ?`;
  db.query(query,[userId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Error fetching products');
    } else {
      res.json(results);
    }
  });
});

app.put('/api/user_update/:id', (req, res) => {
  const userId = req.params.id;
  const { fullname, email, password, mobilenumber } = req.body;
  const updateQuery = `UPDATE user SET fullname = ?, email = ?, password = ?, mobilenumber = ? WHERE id = ?`;

  db.query(updateQuery, [fullname, email, password, mobilenumber, userId], (err, result) => {
      if (err) {
          console.error('Database update error:', err);
          res.status(500).send('Error updating product in user-admin');
      } else {
          res.status(200).send('Product updated in user-admin successfully');
      }
  });
});

app.put('/api/product-update/:id', (req, res) => {
  const productId = req.params.id;
  const { name, email, address, number, price } = req.body;
  const updateQuery = `UPDATE product_admin SET name = ?, email = ?, address = ?, number = ?, price = ? WHERE id = ?`;

  db.query(updateQuery, [name, email, address, number, price, productId], (err, result) => {
      if (err) {
          console.error('Database update error:', err);
          res.status(500).send('Error updating product in product-admin');
      } else {
          res.status(200).send('Product updated in product-admin successfully');
      }
  });
});


app.put('/api/contact-update/:id', (req, res) => {
  const contactId = req.params.id;
  const { name, email, phone, subject, message } = req.body;
  const updateQuery = `UPDATE contact SET name = ?, email = ?, phone = ?, subject = ?, message = ? WHERE id = ?`;

  db.query(updateQuery, [name, email, phone, subject, message, contactId], (err, result) => {
      if (err) {
          console.error('Database update error:', err);
          res.status(500).send('Error updating contact in contact-admin');
      } else {
          res.status(200).send('Product updated in contact-admin successfully');
      }
  });
});
