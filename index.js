import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import methodOverride from "method-override";

const port = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));



let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});

//*"post" means client want to send me something and "get" means client wants to retrieve something from me
 

app.get("/post/:postName", (req, res) => {
    const requestedTitle = req.params.postName ? _.lowerCase(req.params.postName) : null;

    if (requestedTitle) {
        const post = posts.find((post) => _.lowerCase(post.title) === requestedTitle);

        if (post) {
            return res.render("post.ejs", { posts: [post], individualPost: true });
        }
    }else{
        res.status(404).send("Post not found");
    }
});


app.get("/post", (req, res) => {
    res.render("post.ejs", { posts: posts, individualPost: false });
});




const publicPosts = [
    { title: "Our Earth", content: "Our planet is definitely a priceless gift from God. It is the principal source of all essential nutrients for all living things on the planet. Earth provides everything we need, including the food we eat, the clothes we wear, and the home we live in. Earth is known as 'Mother Earth,' because, like our mother, she is always nursing us and providing for all of our needs. We would not be alive if it weren't for the earth. Humans gain enormously from the earth's health benefits." },
    { title: "This Christmas", content: "Christmas is a vibrant and popular festival celebrated around the world. Christmas is celebrated on December 25 every year. We visit our friends and relatives during the Christmas holidays and have lots of fun. My brother and I always wait for the Christmas vacation because it is filled with joy and sweet treats." },
    { title: "About Life", content: "The type of person that you believe that you are and the type of things that you believe you are capable of — in other words, your identity — is what determines the actions you perform. The limitations in your life are framed by the box of your mind. If you want a new life, then start building a new identity. Start small. Prove your new identity to yourself in a thousand tiny ways. Soon it will become real in a thousand big ways." }
];


    

app.get("/publicPosts/:postName", (req, res) => {
    const requestedTitle = req.params.postName;
    const post = publicPosts.find((post) => post.title === requestedTitle);

    if (post) {
        return res.render("publicPosts.ejs", { post: post });
    }

    res.status(404).send("Public post not found");
});




app.get("/edit/:postName", (req, res) => {
    const requestedTitle = req.params.postName;
    const post = posts.find((post) => post.title === requestedTitle);

    if (post) {
        res.render("edit.ejs", { post: post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/edit/:postName", (req, res) => {
    const requestedTitle = req.params.postName;
    const postIndex = posts.findIndex((post) => post.title === requestedTitle);

    if (postIndex !== -1) {
        // Update the post data with the new values
        posts[postIndex] = {
            title: req.body.postTitle,
            content: req.body.postBody,
            img: req.body.postImage,
        };

        res.redirect("/post");
    } else {
        res.status(404).send("Post not found");
    }
});




app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody,
        img: req.body.postImage,
    };
    posts.push(post);
    res.redirect("/");
});


app.post("/post/:postName", (req, res) => {
    const postTitle = req.params.postName;

    posts = posts.filter(post => post.title !== postTitle);

    res.redirect("/post");
});
 
 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});






