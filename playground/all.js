import fs from 'fs';
import path from 'path';
import { MyPlant } from '../modules/myplant.mjs'; // Adjust the path if necessary
import { assetData, assetGQLData, GQLSchema, fetchAvailableDataItems } from '../modules/asset.mjs'
import { fetchInstalledBase } from '../modules/installed-base.mjs'

const main = async () => {
  try {
    // Initialize the MyPlant client
    const mp = await MyPlant.create();
    await mp.login();

    const outputDir = path.join(process.cwd(), 'output');
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // fetch all asset Data by serial number
    const serialNumber = 1486144
    console.log(`1.) assetData(${serialNumber})`)
    let data = await assetData(mp, serialNumber)
    let outputFile = path.join(outputDir, `assetData-${serialNumber}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 4), 'utf-8');

    // fetch essential Data via GraphQL
    const assetId = 159396
    console.log(`2.) assetGQLData(${assetId})`)
    data = await assetGQLData(mp, assetId)
    outputFile = path.join(outputDir, `assetGQLData-${assetId}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 4), 'utf-8');

    // introspect GraphQL Schema
    console.log(`3.) GQLSchema()`)
    data = await GQLSchema(mp)
    outputFile = path.join(outputDir, `GQLSchema.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 4), 'utf-8');

    // fetch all possibly available dataItems for J-Engine
    console.log(`4.) fetchAvailableDataItems()`)
    data = await fetchAvailableDataItems(mp)
    outputFile = path.join(outputDir, `available-data.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 4), 'utf-8');

    // fetch the installed Base and store it in output
    console.log(`5.) fetchInstalledBase()`)
    const fleet = await fetchInstalledBase(mp, 10)  // (mp,xx) == limit to xx engines
    console.log(`fertig. bye`)
  
    // Exit the process explicitly
    process.exit(0);
  } catch (error) {
    console.error('An error occurred:', error.message);

    // Exit the process with failure code
    process.exit(1);
  }
};

await main();
