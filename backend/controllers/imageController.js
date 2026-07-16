const History = require("../models/History");

const ImageAnalysisClient =
  require("@azure-rest/ai-vision-image-analysis").default;

const {
  AzureKeyCredential
} = require("@azure/core-auth");

const client =
  ImageAnalysisClient(
    process.env.AZURE_ENDPOINT,
    new AzureKeyCredential(
      process.env.AZURE_API_KEY
    )
  );

const uploadImage = async (
  req,
  res
) => {

  try {

    const file = req.file;

    if (!file) {

      return res.status(400).json({
        message: "No image uploaded"
      });

    }

    const imageUrl =
      `http://localhost:5000/${file.path}`;

    const result =
      await client.path("/imageanalysis:analyze").post({

        body: {

          url: imageUrl,

          features: [
            "caption",
            "tags"
          ]

        },

        queryParameters: {
          "api-version": "2024-02-01"
        }

      });

    const caption =
      result.body.captionResult?.text || "";

    const confidence =
      result.body.captionResult?.confidence || "";

    const tags =
      result.body.tagsResult?.values
        ?.map(tag => tag.name)
        .join(", ");

    const history =
      await History.create({

        imageName:
          file.originalname,

        imagePath:
          file.path,

        caption,

        confidence,

        tags

      });

    res.json({

      message:
        "Image analyzed successfully",

      history

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

module.exports = {
  uploadImage
};