const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { jwtSecret } = require("../../config/secrets");

const Users = require("../users/users-model");
const { checkValidUser } = require("../users/users-service");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (checkValidUser(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 10;
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: "Please provide a username and password. Passwords must be alphanumeric." });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if
})