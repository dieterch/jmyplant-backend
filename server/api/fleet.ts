// server/api/trips.ts
import prisma from "~~/prisma/client.mjs";

export default defineEventHandler(async (event) => {
  try {
    if (event.node.req.method === "OPTIONS") {
      console.log("OPTIONS call detected, will not forward this to Database.");
      return;
    }

    if (event.node.req.method === "GET") {
      console.log("fleet.ts, method:", event.node.req.method);
      return await prisma.engine.findMany({
        select: {
          assetId: true,
          serialNumber: true,
          designNumber: true,
          iBSiteName: true,
          engineID: true,
          country: true,
          iBItemDescriptionEngine: true,
          powerPowerNominal: true,
          paraSpeedNominal: true,
          iBNOX:true,
          countOpHour:true,
          startupcounter:true,
          commissioningDate: true,
          operationalCondition: true
        }
      });
    }

    const body = await readBody(event); // Verwende readBody statt useBody
    console.log("fleet.ts, body:", JSON.stringify(body,null,2), ", method:", event.node.req.method);

    if (event.node.req.method === "POST") {
      return await prisma.engine.findMany({
        where: body,
      });
    }

  } catch (error) {
    `Http Method ${event.node.req.method} created Database operation error: ${error}`;
  }
});
