import { IsOptional, isString, IsString } from "class-validator";

export class UpdateCategoryDto {
    // @IsString()
    // @IsOptional()
    // school_id: string;

    // @IsString()
    // @IsOptional()
    // branch_id: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}