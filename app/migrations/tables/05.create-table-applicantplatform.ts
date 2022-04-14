import { ApplicantPlatform } from "../../models/applicant_platform.model";

console.log(`
  ooooooooooooooooooooooooooooooo
  Create ApplicantPlatform Table
  ooooooooooooooooooooooooooooooo
  `);
  
  const create_table_applicantplatform = async() => {
    await ApplicantPlatform.sync({ force : true })
    .then(() => {
      console.log("Success Create ApplicantPlatform Table");
    })
    .catch((err) => {
      console.log(`Error In Create ApplicantPlatform Table : ${err}`);
  });
}

create_table_applicantplatform();