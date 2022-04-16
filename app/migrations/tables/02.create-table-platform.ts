import { Platform } from "../../models/platform.model";

console.log(`
  ooooooooooooooooooooooo
  Create Platforms Table
  ooooooooooooooooooooooo
  `);
  
  const create_table_platform = async() => {
    await Platform.sync({ force :false })
    .then(() => {
      console.log("Success Create Platforms Table");
    })
    .catch((err) => {
      console.log(`Error In Create Platform Table : ${err}`);
  });
}

create_table_platform();