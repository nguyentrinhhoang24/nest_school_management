import { IsArray, IsMongoId, IsOptional, IsString } from "class-validator";
import { Status } from "../schemas/news.schema";

export class CreateNewsDto {
    @IsString()
    @IsOptional()
    school_id: string;

    @IsString()
    @IsOptional()
    readonly branch_id: string;

    @IsString()
    @IsOptional()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    readonly tag_id: string[];

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    readonly category_id: string[];

    @IsString()
    @IsOptional()
    readonly status: Status;
}