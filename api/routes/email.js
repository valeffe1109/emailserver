const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Customer = require('../../models/Customer');

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "valeriofuscotest@gmail.com",
    pass: "Vergine97",
  },
});

router.post("/",async(req, res) => {
    const message = {
      from: "elonmusk@tesla.com",
      to: `${req.body.email}`,
      subject: "Request a demo with Allelica",
      html: `<p>Dear ${req.body.name},<br>
    
            Thank you for your interest in Allelica’s Polygenic Risk Score Software.<br>
            
            We are glad to welcome you to Allelica’s community of medical professionals and researchers.<br>
            
            One of our product specialists will be in touch with you shortly.<br> 
            
            In the meantime, you are welcome to book your free demo directly using this link: https://calendly.com/allelica/demo<br>
            
            Best regards,<br>
            
            Allelica team
            </p>`,
    };

    const customer = new Customer({
      name: req.body.name,
      emauil:req.body.email
    })
    try {
      const savedCustomer = await customer.save();
      res.send(savedCustomer);
    } catch (err) {
      res.status(400).send(err);
    }

    transport.sendMail(message, function (err, info) {
      if (err) {
        res.send(err)
      } else {
        res.send('Success')
      }
    });
    
});

module.exports = router;
