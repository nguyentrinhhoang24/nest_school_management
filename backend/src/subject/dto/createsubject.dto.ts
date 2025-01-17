import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../schemas/subject.schema";

export class CreateSubjectDto {
    @IsString()
    @IsOptional()
    school_id: string;

    @IsString()
    @IsOptional()
    readonly branch_id: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsString()
    @IsOptional()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsString()
    @IsOptional()
    @IsEnum(Status, { message: 'Please enter correct status.' })
    readonly status: Status;
}