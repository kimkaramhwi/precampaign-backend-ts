import { ApplicantKeyword } from "../../models/applicant_keyword.model";

console.log(`
  oooooooooooooooooooooooopoooo
  Create ApplicantKeyword Table
  ooooooooooooooooooooooooooooo
  `);
  
  const create_table_applicantkeyword = async() => {
    await ApplicantKeyword.sync({ force : false })
    .then(() => {
      console.log("Success Create ApplicantKeyword Table");
    })
    .catch((err) => {
      console.log(`Error In Create ApplicantKeyword Table : ${err}`);
  });
}

create_table_applicantkeyword();