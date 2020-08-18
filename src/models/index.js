import createUsersTable from './user';

(async () => {
  try {
    await createUsersTable();
  } catch (error) {
    console.log(error);
  }
})();