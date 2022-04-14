import { Rate } from "../../models/rate.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create Rate Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_rate = async() => {
    await Rate.sync({ force : false })
    .then(() => {
      console.log("Success Create Rate Table");
    })
    .catch((err) => {
      console.log(`Error In Create Rate Table : ${err}`);
  });
}

create_table_rate();