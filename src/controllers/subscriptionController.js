// import Stripe from "stripe";
// import config from "../config/config.js";
// import { url } from "inspector";
// import planModel from "../model/planModel.js";
// import SubscriptionModel from "../model/userSubscriptionModel.js";
// import UserModel from "../model/userModel.js";

// const stripe = new Stripe(config.STRIPE_SECRETE_KEY_VALUE);

// export const subscriptionController = async (req, res) => {
//   try {
//     const { priceId, quantity, successUrl, cancelUrl } = req.body;
//     if (!priceId || !quantity || !successUrl || !cancelUrl) {
//       return res.status(400).json({ error: "Missing required parameters" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       line_items: [
//         {
//           price: priceId,
//           quantity: quantity,
//         },
//       ],
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Failed to create checkout session" });
//   }
// };

// export const syncPlansToDb = async (req, res) => {
//   try {
//     const prices = await stripe.prices.list({
//       active: true,
//       expand: ["data.product"],
//     });

//     const plans = prices.data.map((price) => ({
//       plan_name: price.product.name,
//       priceId: price.id,
//       price: price.unit_amount ? (price.unit_amount / 100).toString() : "0",
//       duration: price.recurring ? price.recurring.interval : "one_time",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }));

//     for (const plan of plans) {
//       await planModel.upsert(plan, {
//         conflictFields: ["priceid"],
//       });
//     }
//   } catch (error) {
//     console.error("Error in stroing Stripe plans:", error);
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { priceId, userId } = req.body;

//     if (!priceId || !userId) {
//       return res.status(400).json({ error: "Missing priceId or userId" });
//     }

//     const plan = await planModel.findOne({ where: { priceId } });

//     if (!plan) {
//       console.error("Payment verification failed: priceId not found", priceId);
//       return res.status(400).json({ error: "Payment verification failed" });
//     }

//     const startDate = new Date();
//     const endDate = new Date();
//     if (plan.duration === "month" || plan.duration === "monthly") {
//       endDate.setMonth(startDate.getMonth() + 1);
//     } else if (plan.duration === "year" || plan.duration === "yearly") {
//       endDate.setFullYear(startDate.getFullYear() + 1);
//     }

//     const subscription = await SubscriptionModel.create({
//       userId,
//       plan_name: plan.plan_name,
//       price: plan.price,
//       start_date: startDate.toISOString(),
//       end_date: endDate.toISOString(),
//       features: "Basic Features",
//       priceId: plan.priceId,
//     });

//     return res.status(201).json({
//       message: "Payment verified & subscription created",
//       subscription,
//     });
//   } catch (error) {
//     console.error("Error in payment verification:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };






import Stripe from "stripe";
import planModel from "../model/planModel.js";
import config from "../config/config.js";
import paymentHistory from "../model/paymentHistoryModel.js";
import SubscriptionModel from "../model/userSubscriptionModel.js";
import UserModel from "../model/userModel.js";

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const syncPlansToDb = async () => {
  try {
    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    });
    const plans = prices.data.map((price) => ({
      plan_name: price.product.name,
      price_id: price.id,
      price: price.unit_amount ? (price.unit_amount / 100).toString() : "0",
      duration: price.recurring ? price.recurring.interval : "one_time",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    for (const plan of plans) {
      await planModel.upsert(plan, {
        conflictFields: ["priceid"],
      });
    }
  } catch (error) {
    console.error("Error in stroing Stripe plans:", error);
  }
};

export const subscriptionController = async (req, res) => {
  try {
    const { priceId, quantity, successUrl, cancelUrl } = req.body;
    if (!priceId || !quantity || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      success_url: `${successUrl}?priceId=${encodeURIComponent(priceId)}`,
      cancel_url: cancelUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await planModel.findAll();
    return res.status(200).json({
      message: "Plans Getted Successfully ",
      plans,
    });
  } catch (err) {
    res.status(500).json({
      message: "Cannot get the plans data",
      err,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { priceId, userId } = req.body;
    const price_id = priceId;
    if (!price_id || !userId) {
      return res.status(400).json({ error: "Missing priceId or userId" });
    }

    const plan = await planModel.findOne({ where: { price_id } });

    if (!plan) {
      console.error("Payment verification failed: priceId not found", price_id);
      return res.status(400).json({ error: "Payment verification failed" });
    }

    const startDate = new Date();
    const endDate = new Date();
    if (plan.duration === "month" || plan.duration === "monthly") {
      endDate.setMonth(startDate.getMonth() + 1);
    } else if (plan.duration === "year" || plan.duration === "yearly") {
      endDate.setFullYear(startDate.getFullYear() + 1);
    }

    const subscription = await SubscriptionModel.create({
      userId,
      plan_name: plan.plan_name,
      price: plan.price,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      features: "Basic Features",
      price_id: plan.price_id,
    });

    const history = await paymentHistory.create({
      userId,
      status: "paid",
      plan_name: plan.plan_name,
      price: plan.price,
      purchaseData: new Date().toISOString(),
    });

    return res.status(201).json({
      message: "Payment verified & subscription created",
      subscription,
      history,
    });
  } catch (error) {
    console.error("Error in payment verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get All Subscription Details
export const getsubcriptionDetails = async (req, resp) => {
  try {
    const users = await SubscriptionModel.findAll({
      include: [{ model: UserModel, as: "user" }],
    });

    return resp.status(200).json({
      message: "Subscriptions fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    resp.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};


//get specific user payment details 
export const getUserSubscriptionDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const subscription = await paymentHistory.findAll({ where: { userId } });
    if (!subscription) {
      return res.status(404).json({ error: "You are on basic plan" });
    }
    return res.status(200).json({
      message: "Subscription fetched successfully",
      subscription,
    });
  }
  catch (error) {
    console.error("Error fetching user subscription:", error);
    res.status(500).json({ error: "Failed to fetch user subscription" });
  }
}
