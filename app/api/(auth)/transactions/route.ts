import connect from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const transaction = await Transaction.find().populate("category").exec();

    return new NextResponse(JSON.stringify(transaction), {status: 200});
  } catch (error: any) {
    return new NextResponse("Error" + error.message, {
      status: 500
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newTransaction = new Transaction(body);
    await newTransaction.save();

    return new NextResponse(JSON.stringify({message: "transaction completed", transaction: newTransaction}), {
      status: 200
    })
  } catch (error: any) {
    return new NextResponse("transaction error" + error.message, {
      status: 500
    });
  }
}

export const PATCH = async ( request: Request) => {
  try {
    const body = await request.json();
    const { transactionId, newDate, newCategory, newAmount, newNotes, newType } = body;

    await connect();
    if (!transactionId || !newAmount || !newType) {
      return new NextResponse(
        JSON.stringify({
          message: "Amount or type is missing",
        }), 
        {status: 404}
      );
    }

    if (!Types.ObjectId.isValid(transactionId)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid ID",
        }), 
        {status: 400}
      );
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: new ObjectId(transactionId)},
      { 
        date: newDate,
        category: newCategory,
        amount: newAmount,
        notes: newNotes,
        type: newType
      },
      { new: true}
    )

    if (!updatedTransaction) {
      return new NextResponse(
        JSON.stringify({
          message: "Transaction not found in DB",
        }), 
        {status: 400}
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Transaction updated",
      }), 
      {status: 200}
    );
  } catch (error: any) {
    return new NextResponse("transaction error" + error.message, {
      status: 500
    });
  }
}

export const DELETE = async ( request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get("transactionId");

    if (!transactionId) {
      return new NextResponse(
        JSON.stringify({
          message: "ID is missing",
        }), 
        {status: 404}
      );
    }

    if (!Types.ObjectId.isValid(transactionId)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid ID",
        }), 
        {status: 400}
      );
    }

    await connect();
    const deletedTransaction = await Transaction.findByIdAndDelete(
      new Types.ObjectId(transactionId)
    );

    if (!deletedTransaction) {
      return new NextResponse(
        JSON.stringify({
          message: "Transaction not found in DB",
        }), 
        {status: 400}
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Transaction deleted!",
      }), 
      {status: 200}
    );
  } catch (error: any) {
    return new NextResponse("transaction error" + error.message, {
      status: 500
    });
  }
}