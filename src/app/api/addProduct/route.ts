import { database } from "@/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";
import { ref, set } from "firebase/database";

// import  functions  from 'firebase-functions'

// exports.newPost = functions.database.ref("/data/{productId}").onCreate((snapshot, context) => {
//   functions.logger.info("Received new data with ID:", context.params.productId);
//   const response =  axios.post(
//     "https://fcm.googleapis.com/fcm/send",
//     {
//       to: 'fcmToken',
//       notification: {
//         title: "New Product Added",
//         body: `product has been added to the store.`,
//       },
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `key=AAAACu1GBYg:APA91bFNyRPiVWeiW3LLCAJ4DfIXsxpNQ9MAv_5rTIFJf3XnrYBvwuD2lqDABpXMpZ05bnkYI0vXpNcKD72h1S_-XbsTKawphTczVa2X2GYVdOG5aY80TMT50-UoqH9sn1PyxQaxVYHr`,
//       },
//     }
//   );
//   return snapshot.val();
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { productName, productDescription, fcmToken } = body.data;

    console.log(body);

    if (!productName) {
      return new NextResponse("title is required", { status: 400 });
    }
    // Insert the product data into Firebase Firestore
    //   const productRef = await firestore.collection('products').add({
    //     name: productName,
    //     description: productDescription,
    //     createdAt: new Date().toISOString(),
    //   });

    const product = await set(ref(database, "/"), {
      name: productName,
      description: productDescription,
      createdAt: new Date().toISOString(),
    });

    console.log(product);
    // Send the push notification with product details
    const response = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: fcmToken,
        notification: {
          title: "New Product Added",
          body: `${productName} has been added to the store.`,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=AAAACu1GBYg:APA91bFNyRPiVWeiW3LLCAJ4DfIXsxpNQ9MAv_5rTIFJf3XnrYBvwuD2lqDABpXMpZ05bnkYI0vXpNcKD72h1S_-XbsTKawphTczVa2X2GYVdOG5aY80TMT50-UoqH9sn1PyxQaxVYHr`,
        },
      }
    );

    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.log("[Add_Product_POST]", error);
    return new NextResponse("An error occurred while adding the product", {
      status: 500,
    });
  }
}
