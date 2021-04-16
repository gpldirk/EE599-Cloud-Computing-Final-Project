const User = require('../models/auth.model');
const Stripe = require('../helpers/stripe');

exports.checkoutController = (req, res) => {
  const productToPriceMap = {
    basic_mo: process.env.PRODUCT_BASIC_MO,
    pro_mo: process.env.PRODUCT_PRO_MO,
    basic_year: process.env.PRODUCT_BASIC_YEAR,
    pro_year: process.env.PRODUCT_PRO_YEAR
  }
  
  const { product } = req.body
  const price = productToPriceMap[product]

  User.findOne({_id: req.user._id}).exec(async (err, user) => {
    if (err) {
      console.log("DB error when checkout");
      return res.status(400).json({
        error: 'Email has not been signup',
      })
    }

    try {
      const session = await Stripe.createCheckoutSession(user.billingID, price)
      const ms = new Date().getTime() + 1000 * 60 * 60 * 24 * process.env.TRIAL_DAYS
      const n = new Date(ms)

      user.plan = product
      user.hasTrial = true
      user.endDate = n
      user.save()

      
      res.send({
        sessionId: session.id
      })
    } catch (e) {
      console.log(e)
      return res.status(400).send({
        error: e.message,
      })
    }
  })
}

exports.billingController = (req, res) => {
  User.findById(req.user._id).exec(async (err, user) => {
    if (err) {
      console.log("DB error when checkout");
      return res.status(400).json({
        error: 'Invalid token. Please signin',
      })
    }

    const session = await Stripe.createBillingSession(user.billingID)
    console.log('session', session)
    res.json({ url: session.url })
  })
}