require('./db/dbconnection')
const express = require("express");
const userRouter = require('./routers/user');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(userRouter)

app.listen(port, () => {
  console.log("Sever is up on port " + port);
});

const createAdmin = async () => {
  const admin = await User.findOne({role:'admin'})
  if(!admin){
    const user = new User({username:'admin', role:'admin', email:'admin@example.com', password:'admin@root'});
    try {
      await user.save();
    } catch (error) {
      console.log(error.message)
    }
  }

}
createAdmin()
