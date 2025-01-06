import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export enum Status {
    ACTIVE = 'active',
    DRAFT = 'draft'
}

@Schema({
    timestamps: true,
})

export class News extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
    tag_id: string[];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Category' })
    category_id: string[];

    @Prop()
    status: Status;
}

export const NewsSchema = SchemaFactory.createForClass(News);