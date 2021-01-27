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
        const hash = bcrypt.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.insert(credentials)
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

    if (checkValidUser(req.body)) {
        Users.getBy({ username: username })
            .then(([user]) => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = generateToken(user);
                    res.status(200).json({ message: "You are allowed to enter", token });
                } else {
                    res.status(401).json({ message: "You shall not pass!" });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: "Please provide a username and password. Passwords must be alphanumeric." });
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;