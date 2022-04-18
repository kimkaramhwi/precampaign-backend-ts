import { Applicant } from "../../models/appicant.model";

console.log(`
  ooooooooooooooooooooooo
  Create Applicants Table
  ooooooooooooooooooooooo
  `);
  
  const create_table_applicant = async() => {
    await Applicant.sync({ force : false })
    .then(() => {
      console.log("Success Create Applicants Table");
    })
    .catch((err) => {
      console.log(`Error In Create Applicant Table : ${err}`);
  });
}

create_table_applicant();