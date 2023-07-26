const User = require("../model/user");
const mongoose = require("mongoose");
const randomId = require("random-id");

module.exports = {
  Reg: async (req, res) => {
    try {
      const { name, email, phone } = req.body;

      var len = 10;
      var pattern = "0123456789";
      var id = randomId(len, pattern);

      // Create an instance of the User model
      const users = new User({
        _id: new mongoose.Types.ObjectId(),
        uid: id,
        name: name,
        email: email,
        phone: phone,
      });

      subj = "נרשמת בהצלחה לתמעניינים - קורס תוכנה";
      body = `
      <div dir="rtl" lang="he" style="font-weight:700;"> 
        <h1 >שלום ${name} ,🙏 תודה שנרשמת </h1> <br/>
        <p style="font-size:2rem;">
          בימים אלו אנו רושמים סטודנטים לקורס - FullStack <br/>
          על מנת שנוכל לקדם את התהליך לקראת פתיחת הקורס יש להכין את המסמכים הבאים: <br/> 
        </p>
        <ul>
          <li>תעודת זהות</li>
          <li>תעודת בגרות/תעודת מקצועית</li>
          <li> (לא חובה) מסמך המציין 3 יח׳ אנגלית ומתמטיקה <li/>
        </ul>
       </div>

      `;
      await require("../../../EmailSend").emailsend(email, subj, body);

      const result = await users.save();
      if (result) return res.status(200).json(result);
      else res.status(200).json(null);
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  },
};
