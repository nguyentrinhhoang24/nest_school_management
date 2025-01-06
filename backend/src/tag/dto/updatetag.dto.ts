import { IsOptional, isString, IsString } from "class-validator";

export class UpdateTagDto {
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