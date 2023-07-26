const User = require("../model/user");
const mongoose = require("mongoose");
const randomId = require("random-id");

module.exports = {
  Reg: (req, res) => {
    const { name, email, phone } = req.body;

    var len = 10;
    var pattern = "0123456789";
    var id = randomId(len, pattern);
    //יצירת האובייקט מסוג משתמש
    const users = new User({
      _id: new mongoose.Types.ObjectId(),
      uid: id,
      name: name,
      email: email,
      phone: phone,
    });
    subj = "cours";
    body = `<h1> Hello ${name}</h1>`;
    require("../../../EmailSend").emailsend(email, subj, body);
    users
      .save()
      .then((user) => {
        return res.status(200).json({ msg: 1 });
      })
      .catch((error) => {
        return res.status(505).json({ error });
      });
  },
};
