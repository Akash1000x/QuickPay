import prisma from "@repo/db/client";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/bank-webhook", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: number;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  // Update balance in db, add txn
  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Transaction successful",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(8000);
