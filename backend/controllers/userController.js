const { getAuth } = require("@clerk/express");
const userModel = require("../models/userModel");
const razorpay=require('razorpay');
const transactionModel = require("../models/transactionModel");

const userCredits = async (req, res) => {
  try {

    const { userId } = getAuth(req);
  
    const user = await userModel.findOne({
      clerkId: userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
})

// API to make payment for credits
const paymentRazorpay=async(req,res)=>{
   
  try {

    const {userId}=getAuth(req)

    const {planId}=req.body

    const userData=await userModel.findOne({clerkId:userId})
    if(!userData || !planId){
      return res.json({success:false,message:'Invalid Credentials'})
    }

    let credits,plan,amount,date

    switch (planId) {
      
      case 'Basic':
        plan='Basic'
        credits=100
        amount=200
        break;

      case 'Advanced':
        plan='Advanced'
        credits=500
        amount=500
        break;

      case 'Business':
        plan='Business'
        credits=5000
        amount=1000
        break;
      
      
    
      default:
        break;
    }

    date=Date.now()

    const transactionData={
      clerkId:userId,plan,amount,credits,date
    }

    const newTransaction=await transactionModel.create(transactionData)

    const options={
      amount:amount*100,
      currency:process.env.CURRENCY,
      receipt:newTransaction._id
    }

    const order = await razorpayInstance.orders.create(options);

    return res.json({
        success: true,
        order,
    });

  } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
  }
}

// API controller function to verify razorpay payment

const verifyRazorpay = async (req, res) => {
  try {

    const { userId } = getAuth(req);

    const { razorpay_order_id } = req.body;

    // Fetch order details from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    // Payment successful
    if (orderInfo.status === "paid") {

      // Find transaction using receipt
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );

      if (!transactionData) {
        return res.json({
          success: false,
          message: "Transaction not found",
        });
      }

      // Prevent adding credits twice
      if (transactionData.payment) {
        return res.json({
          success: true,
          message: "Payment already verified",
        });
      }

      // Find user
      const user = await userModel.findOne({
        clerkId: userId,
      });

      // Add credits
      user.creditBalance += transactionData.credits;

      await user.save();

      // Mark transaction as paid
      transactionData.payment = true;

      await transactionData.save();

      return res.json({
        success: true,
        message: "Credits Added",
      });
    }

    res.json({
      success: false,
      message: "Payment Failed",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  userCredits,paymentRazorpay,verifyRazorpay
};