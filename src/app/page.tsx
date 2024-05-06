"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";
import { messaging } from "@/lib/db";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  const handlebutton = async () => {
    const response = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: fcmToken,
        notification: {
          title: "Test Notification",
          body: "Test Notification Body",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=AAAACu1GBYg:APA91bFNyRPiVWeiW3LLCAJ4DfIXsxpNQ9MAv_5rTIFJf3XnrYBvwuD2lqDABpXMpZ05bnkYI0vXpNcKD72h1S_-XbsTKawphTczVa2X2GYVdOG5aY80TMT50-UoqH9sn1PyxQaxVYHr`,
        },
      }
    );

    console.log(response);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
        toast({
          title: payload.notification?.title || "No title",
          description: payload.notification?.body || "",
        })
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handlebutton}>Add Product</Button>

      <div className="w-full max-w-2xl p-4">
        <h1 className="p-4">FCM Token </h1>
        <Input value={fcmToken} className="text-slate-900" />
      </div>
    </main>
  );
}
