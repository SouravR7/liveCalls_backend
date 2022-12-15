const { event_Collection, user_Collection } = require("../connector");

const { cloudinary } = require("../utils/cloudinary_config");
const multer = require("multer");

// image: String,
//   title: String,
//   description: String,
//   players: Number,
//   date: String,
//   organizer_id: String,
//   sports_type

const createEvent = async function (req, res) {
  try {
    const { image } = req.files;
    console.log(image);

    const { description, title, date, players, organizer_id, sports_type } =
      req.body;

    const uploadResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: "Assignments_images",
        public_id: `${Date.now()}`,
      }
    );

    if (uploadResponse) {
      const newdata = new event_Collection({
        image: uploadResponse.secure_url,
        description: description,
        title: title,
        date: date,
        players: players,
        organizer_id: organizer_id,
        sports_type: sports_type,
      });
      newdata
        .save()
        .then((data) => {
          res.status(200).send({
            status: 200,
            error: false,
            message: "successfully uploaded!!",
          });
        })
        .catch((err) =>
          res
            .status(500)
            .send({ status: 500, error: true, message: err.message })
        );
    } else {
    }
  } catch (e) {
    res.status(500).send({ status: 500, error: true, message: e.message });
  }
};

const getAllEvents = async function (req, res) {
  try {
    const allEvent_data = await event_Collection.find({});
    return res.status(200).send({
      status: 200,
      error: false,
      data: allEvent_data,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, error: true, message: err.message });
  }
};

module.exports = { createEvent, getAllEvents };
