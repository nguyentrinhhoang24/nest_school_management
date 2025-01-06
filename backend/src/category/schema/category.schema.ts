import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { mongo } from "mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true,
})

export class Category extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);