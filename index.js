import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import methodOverride from "method-override";

const app = express();
const port = process.env.PORT || 3000;
const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(rootDirectory, "data");
const postsFile = path.join(dataDirectory, "posts.json");

const publicPosts = [
  {
    title: "Our Earth",
    content:
      "Our planet is a priceless home and the source of everything living things need. Looking after it means protecting the systems that sustain us.",
  },
  {
    title: "This Christmas",
    content:
      "Christmas is celebrated around the world as a time for rest, generosity, and reconnecting with friends and family.",
  },
  {
    title: "About Life",
    content:
      "Identity shapes action. Small, repeated choices can gradually change what we believe we are capable of and the life we build.",
  },
];

function loadPosts() {
  try {
    return JSON.parse(fs.readFileSync(postsFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Unable to read saved posts:", error.message);
    }
    return [];
  }
}

function savePosts(posts) {
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

let posts = loadPosts();

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(rootDirectory, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { submitted: false });
});

app.post("/contact", (req, res) => {
  res.render("contact.ejs", { submitted: true });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const title = req.body.postTitle?.trim();
  const content = req.body.postBody?.trim();

  if (!title || !content) {
    return res.status(400).send("A title and post body are required.");
  }

  posts.push({ id: crypto.randomUUID(), title, content });
  savePosts(posts);
  return res.redirect("/post");
});

app.get("/post", (req, res) => {
  res.render("post.ejs", { posts, individualPost: false });
});

app.get("/post/:postId", (req, res) => {
  const post = posts.find(({ id }) => id === req.params.postId);

  if (!post) {
    return res.status(404).send("Post not found.");
  }

  return res.render("post.ejs", { posts: [post], individualPost: true });
});

app.get("/edit/:postId", (req, res) => {
  const post = posts.find(({ id }) => id === req.params.postId);

  if (!post) {
    return res.status(404).send("Post not found.");
  }

  return res.render("edit.ejs", { post });
});

app.put("/post/:postId", (req, res) => {
  const post = posts.find(({ id }) => id === req.params.postId);
  const title = req.body.postTitle?.trim();
  const content = req.body.postBody?.trim();

  if (!post) {
    return res.status(404).send("Post not found.");
  }

  if (!title || !content) {
    return res.status(400).send("A title and post body are required.");
  }

  post.title = title;
  post.content = content;
  savePosts(posts);
  return res.redirect(`/post/${post.id}`);
});

app.delete("/post/:postId", (req, res) => {
  const postExists = posts.some(({ id }) => id === req.params.postId);

  if (!postExists) {
    return res.status(404).send("Post not found.");
  }

  posts = posts.filter(({ id }) => id !== req.params.postId);
  savePosts(posts);
  return res.redirect("/post");
});

app.get("/public-posts/:postTitle", (req, res) => {
  const post = publicPosts.find(({ title }) => title === req.params.postTitle);

  if (!post) {
    return res.status(404).send("Public post not found.");
  }

  return res.render("publicPosts.ejs", { post });
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(port, () => {
  console.log(`Leaf It Here is running at http://localhost:${port}`);
});
