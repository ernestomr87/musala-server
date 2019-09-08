import { Router } from "express";
const uuidv1 = require("uuid/v1");

const router = Router();

// ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'

router.get("/:id", async (req, res) => {
  const peripherals = await req.context.models.Peripheral.find({
    gateway: req.params.id
  });
  return res.send(peripherals);
});

router.post("/", async (req, res) => {
  try {
    console.log("uuidv1()", uuidv1());
    const peripheral = await req.context.models.Peripheral.create({
      uid: uuidv1(),
      vendor: req.body.vendor,
      status: req.body.status,
      gateway: req.body.gateway
    });
    return res.send(peripheral);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.put("/", async (req, res) => {
  const peripheral = await req.context.models.Peripheral.updateOne(
    { _id: req.body.id },
    { vendor: req.body.vendor, status: req.body.status }
  );
  return res.send(peripheral);
});

router.delete("/:id", async (req, res) => {
  const peripheral = await req.context.models.Peripheral.findById(
    req.params.id
  );

  let result = null;
  if (peripheral) {
    result = await peripheral.remove();
  }

  return res.send(result);
});

export default router;
