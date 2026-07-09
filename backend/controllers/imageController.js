const axios = require("axios");
const FormData = require("form-data");
const userModel=require('../models/userModel')
const { getAuth } = require("@clerk/express");
const removeBackground = async (req, res) => {

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

        if (user.creditBalance <= 0) {
            return res.status(400).json({
                success: false,
                message: "No credits left",
            });
        }

        const formData = new FormData();

        formData.append("image_file", req.file.buffer, req.file.originalname);

        const response = await axios.post(
            "https://clipdrop-api.co/remove-background/v1",
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                },
                responseType: "arraybuffer",
            }
        );

        const base64Image = Buffer.from(response.data, "binary").toString("base64");
        user.creditBalance -= 1;
        await user.save();
        res.json({
            success: true,
            image: `data:image/png;base64,${base64Image}`,
            credits: user.creditBalance
        });

    } catch (error) {

        if (error.response?.data) {
            console.log(error.response.data.toString());
        } else {
            console.log(error.message);
        }

        res.status(500).json({
            success: false,
            message: "Background removal failed",
        });

    }

};

module.exports = {
    removeBackground,
};