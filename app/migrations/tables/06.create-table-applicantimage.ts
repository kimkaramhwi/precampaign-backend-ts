import { ApplicantImage } from "../../models/applicant_image.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create ApplicantImages Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_applicantimage = async() => {
    await ApplicantImage.sync({ force : true })
    .then(() => {
      console.log("Success Create ApplicantImages Table");
    })
    .catch((err) => {
      console.log(`Error In Create ApplicantImage Table : ${err}`);
  });
}

create_table_applicantimage();