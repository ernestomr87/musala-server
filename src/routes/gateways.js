import { Router } from "express";
import licenseKey from "license-key-gen";
const router = Router();

var userInfo = {
  company: "musala.com",
  street: "Buen Viaje",
  city: "Santa Clara",
  state: "Villa Clara",
  zip: "50100"
};
var licenseData = {
  info: userInfo,
  prodCode: "",
  appVersion: "0.0",
  osType: "WIN10"
};

router.get("/", async (req, res) => {
  const gateways = await req.context.models.Gateway.find();
  return res.send(gateways);
});

router.get("/:id", async (req, res) => {
  const gateway = await req.context.models.Gateway.findById(req.params.id);
  return res.send(gateway);
});

router.post("/", async (req, res) => {
  try {
    let prodCode = Math.random()
      .toString(36)
      .substring(7);

    licenseData.prodCode = prodCode;

    const serial = licenseKey.createLicense(licenseData).license;
    const gateway = await req.context.models.Gateway.create({
      serial: serial,
      name: req.body.name,
      ipv4: req.body.ipv4
    });
    return res.send(gateway);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.put("/", async (req, res) => {
  const gateway = await req.context.models.Gateway.updateOne(
    { _id: req.body.id },
    { name: req.body.name, ipv4: req.body.ipv4 }
  );
  return res.send(gateway);
});

router.delete("/:id", async (req, res) => {
  const gateway = await req.context.models.Gateway.findById(req.params.id);
  let result = null;
  if (gateway) {
    result = await gateway.remove();
  }
  return res.send(result);
});

export default router;
