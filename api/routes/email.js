const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Customer = require("../../models/Customer");
const nodemailerSendgrid  = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'infodevlife.it@gmail.com',
    pass: 'Vergine97' // naturally, replace both with your real credentials or an application-specific password
  }
});
router.post("/", async (req, res) => {
  const message = {
    from: "infodevlife.it@gmail.com",
    to: `${req.body.email}`,
    subject: "Richiesta informazioni DevLife",
    html: `<p>Caro ${req.body.name},<br>
    
      Grazie per aver visitato il nostro sito e per averci contattato!. <br/>

      Benvenuto nella nostra community verrai ricontattato a breve . <br/>
      
      Puoi anche scegliere di prenotare un meeting 1on1 dove poter chiarire tutti i tuoi dubbi : https://calendly.com/valeriofuscodev/devlife-colloquio?back=1&month=2020-09 <br/>
      
      Buona giornata, <br/>
    
      Valerio <br/>
            </p>`,
  };

  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    questions:req.body.questions
  });
 
    const savedCustomer = await customer.save();
  
 

  transport.sendMail(message, function (err, info) {
    if (err) {
      res.send(err);
    } else {
      res.send("Success");
    }
  });
});

module.exports = router;
