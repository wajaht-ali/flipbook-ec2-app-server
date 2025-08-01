import { writeFile } from "fs/promises";
import Replicate from "replicate";
import config from "../config/config.js";

export const multiViewController = async (req, res) => {
  try {
    const API_TOKEN = config.API_TOKEN;
    const replicate = new Replicate({ auth: API_TOKEN });

    const input = {
      image:
        "https://replicate.delivery/pbxt/JpZ6Dgr6rHvp2DYCY9ATlPrOamIHWrqhl84QsviV8I0yQ17j/out-0-44.png",
    };

    const output = await replicate.run(
      "jd7h/zero123plusplus:c69c6559a29011b576f1ff0371b3bc1add2856480c60520c7e9ce0b40a6e9052",
      { input }
    );
    for (const [index, item] of Object.entries(output)) {
      await writeFile(`output_${index}.jpg`, item);
    }
  } catch (error) {
    console.log("Error in multi view controller: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request.",
      error: error.message,
    });
  } finally {
    console.log("Multi view controller executed");
  }
};
