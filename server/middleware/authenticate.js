const {User} = require('./../models/user');

const authenticate  = (req, res, next) => {
    const token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        res.token = token;
        next();
    }).catch(e => res.status(401).send());
}

module.exports = {authenticate};