//const port = process.env.PORT || 4000;
const jwtKey = process.env.JWT_KEY || 'secret_key_jwt';
//const database_url = process.env.DATABASE_URL || 'mongodb://localhost:27017/smart_home';

// const emailHost = process.env.EMAIL_HOST
// const emailPort = process.env.EMAIL_PORT
const emailUser = process.env.EMAIL_USER || 'user_name_for_email';
const emailPassword = process.env.EMAIL_PASSWORD || 'password_for_email';

// const userConfig = {
//   genders: {
//     MALE: 'Male',
//     FEMALE: 'Female',
//     OTHER: 'Other'
//   }
// }

const emailConfig = {
  emailUser,
  emailPassword,
}

module.exports = {
  //   pagination: {
  //     page: 1,
  //     records: 10
  //   },
  // userConfig,
  emailConfig,
  jwtKey,
};
