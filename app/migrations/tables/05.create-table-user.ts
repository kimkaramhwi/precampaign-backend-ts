import { User } from "../../models/user.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create User Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_user = async() => {
    await User.sync({ force : false })
    .then(() => {
      console.log("Success Create User Table");
    })
    .catch((err) => {
      console.log(`Error In Create User Table : ${err}`);
  });
}

create_table_user();