import connect from "@/lib/db";
import Category from "@/lib/models/category";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const categories = await Category.find();

    return new NextResponse(JSON.stringify(categories), {status: 200});
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
    const newCategory = new Category(body);

    if (!body.type) {
      return new NextResponse(
        JSON.stringify({
          message: "type is missing",
        }), 
        {status: 404}
      );
    }

    await newCategory.save();

    return new NextResponse(JSON.stringify({message: "Category added", category: newCategory}), {
      status: 200
    })
  } catch (error: any) {
    return new NextResponse("error" + error.message, {
      status: 500
    });
  }
}

export const PATCH = async ( request: Request) => {
  try {
    const body = await request.json();
    const { categoryId, newName, newType} = body;

    await connect();
    if (!categoryId || !newName || !newType) {
      return new NextResponse(
        JSON.stringify({
          message: "Name is missing",
        }), 
        {status: 404}
      );
    }

    if (!Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid ID",
        }), 
        {status: 400}
      );
    }

    const updateCategory = await Category.findOneAndUpdate(
      { _id: new ObjectId(categoryId)},
      { 
        name: newName,
        type: newType,
      },
      { new: true}
    )

    if (!updateCategory) {
      return new NextResponse(
        JSON.stringify({
          message: "Category not found in DB",
        }), 
        {status: 400}
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Category updated",
      }), 
      {status: 200}
    );
  } catch (error: any) {
    return new NextResponse("Category error" + error.message, {
      status: 500
    });
  }
}

export const DELETE = async ( request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return new NextResponse(
        JSON.stringify({
          message: "ID is missing",
        }), 
        {status: 404}
      );
    }

    if (!Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid ID",
        }), 
        {status: 400}
      );
    }

    await connect();
    const deleteCategory = await Category.findById(categoryId);

    if (!deleteCategory) {
      return new NextResponse(
        JSON.stringify({
          message: "categoryId not found in DB",
        }), 
        {status: 400}
      );
    }

    await deleteCategory.deleteOne();

    return new NextResponse(
      JSON.stringify({
        message: "categoryId deleted!",
      }), 
      {status: 200}
    );
  } catch (error: any) {
    return new NextResponse("categoryId error" + error.message, {
      status: 500
    });
  }
}