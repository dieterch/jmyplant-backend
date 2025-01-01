import { MyPlant } from '../modules/myplant.mjs'; // Adjust the path if necessary
import { fetchInstalledBase } from '../modules/installed-base.mjs';

const main = async () => {
  try {
    // Initialize the MyPlant client
    const mp = await MyPlant.create();

    // Log in to MyPlant
    await mp.login();

    const fleet = await fetchInstalledBase(mp, 4)  // limit to 10
    console.log(fleet)
    // Exit the process explicitly
    process.exit(0);
  } catch (error) {
    console.error('An error occurred:', error.message);

    // Exit the process with failure code
    process.exit(1);
  }
};

await main();
