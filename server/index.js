import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import { dirname } from "path";
import Post from "./models/Post.js";

const app = express();
const PORT = 8000;
const PASS = "CXs8et1B5Eda49v0";
const SECRET = 10;
const JWTSecret = "da231@31";
const FrontendHOST = "http://localhost:5173";

// app.use("/uploads", express.static(dirname + "/uploads"));
app.use("/uploads", express.static("uploads"));

app.use(cors({ credentials: true, origin: FrontendHOST }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(`mongodb+srv://aamritbistaa:${PASS}@cluster0.auobkfb.mongodb.net/`)
  .then("db connected")
  .catch((error) => console.log(error));

app.post("/register", async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body.value;
  const hash = await bcrypt.hash(password, SECRET);
  try {
    const userDoc = await User.create({
      firstname: firstName,
      lastname: lastName,
      username: username,
      password: hash,
      email: email,
    });

    res.json({ userDoc });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body.value;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(500).json("User doesnot exist");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(500).json("Incorrect username or password");
    } else {
      //send token
      jwt.sign({ username, id: user._id }, JWTSecret, {}, (error, token) => {
        if (error) {
          throw error;
        }
        res.cookie("token", token).json({ id: user._id, username: username });
      });
    }
  } catch (e) {
    res.status(400).json(e);
  }
});
app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, JWTSecret, {}, (error, information) => {
      if (error) throw error;
      res.json(information);
    });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.cookie("token", "").json("ok");
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

const upload = multer({ dest: "uploads/" });
app.post("/post", upload.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newfile = path + "." + extension;

    fs.renameSync(path, newfile);

    const { token } = req.cookies;
    jwt.verify(token, JWTSecret, {}, async (error, info) => {
      if (error) {
        throw error;
      }
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        fileName: newfile,
        author: info.id,
      });
      // res.json(information);
      res.json(postDoc);
    });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});
app.put("/post", upload.single("file"), async (req, res) => {
  try {
    let newfile = "";
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      newfile = path + "." + extension;
      fs.renameSync(path, newfile);
    }
    const { id, title, summary, content } = req.body;

    const { token } = req.cookies;
    jwt.verify(token, JWTSecret, {}, async (error, info) => {
      if (error) {
        throw error;
      }
      const postDoc = await Post.findById(id);
      const isAuthor = postDoc.author == info.id;
      if (!isAuthor) {
        return res
          .status(400)
          .json("Only author has the permission to edit the post");
      }
      const updateData = {
        title: title,
        summary: summary,
        content: content,
        fileName: newfile ? newPath : postDoc.fileName,
      };
      const updatedItem = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      res.json({ updatedItem });
    });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { token } = req.cookies;
    jwt.verify(token, JWTSecret, {}, async (error, info) => {
      if (error) {
        throw error;
      }
      const postDoc = await Post.findById(id);
      const isAuthor = postDoc.author == info.id;
      if (!isAuthor) {
        return res
          .status(400)
          .json("Only author has the permission to delete the post");
      }

      const deletedItem = await Post.deleteOne({ _id: id });

      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.json(deletedItem);
    });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", ["username"]);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

app.listen(PORT);
