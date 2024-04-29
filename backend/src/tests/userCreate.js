const User = require("../models/User");

const userCreate = async () => {

    const user = {
        firstName: 'Felix',
        lastName: 'Luquin',
        email: "elgatofelix@gmail.com",
        password: "felix1234",
        phone: "33114422"
    }

    await User.create(user)
}

module.exports = userCreate