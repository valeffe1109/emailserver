const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Customer = require("../../models/Customer");

const transport = nodemailer.createTransport({
  service: "sendgrid",
  auth: {
    api_user: "allelica",
    api_key: "0Nmdcdnv7!_sendgrid",
  },
});

router.post("/", async (req, res) => {
  const message = {
    from: "info@allelica.com",
    to: `${req.body.email}`,
    subject: "Request a demo with Allelica",
    html: `<p>Dear ${req.body.name},<br>
    
      Thank you for visiting our website! We are glad to welcome you to Allelica’s community of medical professionals and researchers. <br/>

      To discover more about polygenic risk scores for complex diseases or to explore the various functionalities of our technology, you can visit our blog here. <br/>
      
      You can also book a free demo of our software with one of Allelica’s specialists today: https://calendly.com/allelica/demo <br/>
      
      If you can’t find a time that suits you, just let me know and I’d be happy to accommodate your schedule.<br/>
      
      For any questions you may have, feel free to send me an email. We look forward to connecting with you. <br/>
      
      Have a lovely day, <br/>
      
      Colleen <br/>
            </p>`,
  };

  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const savedCustomer = await customer.save();
    res.send(savedCustomer);
  } catch (err) {
    res.status(400).send(err);
  }

  transport.sendMail(message, function (err, info) {
    if (err) {
      res.send(err);
    } else {
      res.send("Success");
    }
  });
});

module.exports = router;
