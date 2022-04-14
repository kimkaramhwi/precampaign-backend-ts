import { Keyword } from "../../models/keyword.model";

console.log(`
  ooooooooooooooooooooooo
  Create Keywords Table
  ooooooooooooooooooooooo
  `);
  
  const create_table_keyword = async() => {
    await Keyword.sync({ force : true })
    .then(() => {
      console.log("Success Create Keyword Table");
    })
    .catch((err) => {
      console.log(`Error In Create Keyword Table : ${err}`);
  });
}

create_table_keyword();