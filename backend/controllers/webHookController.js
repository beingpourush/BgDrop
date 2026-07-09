const { Webhook } = require("svix");
const userModel = require("../models/userModel");

const clerkWebhook = async (req, res) => {
  try {

    const svixHeaders = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(req.body.toString(), svixHeaders);

    const { type, data } = evt;

    switch (type) {

      case "user.created":

        await userModel.create({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        });


        break;

      case "user.updated":

        await userModel.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0].email_address,
            photo: data.image_url,
            firstName: data.first_name,
            lastName: data.last_name,
          }
        );


        break;

      case "user.deleted":

        await userModel.findOneAndDelete({
          clerkId: data.id,
        });

        break;

      default:
        console.log(`Unhandled event: ${type}`);
    }

    return res.status(200).json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  clerkWebhook,
};