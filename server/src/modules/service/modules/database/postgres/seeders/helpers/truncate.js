module.exports = async function truncate(queryInterface, tableName) {
  const { sequelize } = queryInterface;

  try {
    await sequelize.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
  } catch (error) {
    console.error(error);
  }
};
