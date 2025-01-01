import { PrismaClient } from '@prisma/client';
import { MyPlant } from '../modules/myplant.mjs'; // Adjust the path if necessary
import { fetchInstalledBase } from '../modules/installed-base.mjs';

const mp = await MyPlant.create();
const prisma = new PrismaClient();    

async function clearAndInsertData(engineData) {
  try {
    // Empty the table by deleting all records
    await prisma.engine.deleteMany();
  
    // Insert new records using createMany
    await prisma.engine.createMany({
      data: engineData,
    });
    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

const main = async () => {
  try {
    await mp.login();
    const engineData = await fetchInstalledBase(mp) 
    await clearAndInsertData(engineData);
    process.exit(0);
  } catch (error) {
    console.error('An error occurred:', error.message);

    // Exit the process with failure code
    process.exit(1);
  }
};

await main();
