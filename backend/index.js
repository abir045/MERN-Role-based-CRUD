const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0s0bbgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("mern-crud").collection("users");

    //jwt related api

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2m",
      });
      res.send({ token });
    });

    //users related api
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/api/register", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };

      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exits", insertedId: null });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //middlewares
    const verifyToken = (req, res, next) => {
      console.log("inside verifyToken", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized access" });
      }

      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    //verify admin

    //check admin

    app.get("/users/checkAdmin/:email", async (req, res) => {
      const email = req.params.email;
      // if (email !== req.decoded.email) {
      //   return res.status(403).send({ message: "forbidden access" });
      // }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "Admin";
      }
      res.send({ admin });
    });

    //get role

    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };

      const user = await userCollection.findOne(query);
      const role = user.role;

      res.send({ role });
    });

    //check admin || super admin

    const verifyAdminOrSuperAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      // const isAdmin = user?.role === "admin";
      console.log(user);
      // console.log(isAdmin);
      if (user.role === "Admin" || user.role === "Super Admin") {
        next();
      } else {
        return res.status(403).send({ message: "Forbidden Access" });
      }
    };

    //edit role
    app.patch(
      "/api/users/:id",
      verifyToken,
      verifyAdminOrSuperAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const { role } = req.body;
        const updatedDoc = {
          $set: {
            role: role,
          },
        };

        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Role Based Crud application server is running");
});

app.listen(port, () => {
  console.log(`CRUD application is running on port ${port} `);
});
