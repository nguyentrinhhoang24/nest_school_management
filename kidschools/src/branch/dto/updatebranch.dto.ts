import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from '../schemas/branch.schema';

export class UpdateBranchDto {
  
  @IsString()
  @IsOptional()
  readonly school_id: string;

  @IsOptional()
  @IsString({each:true})
  readonly classgroup_id: string[];

  @IsString()
  @IsOptional()
  readonly code: string;
  
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Status, { message: 'Please enter correct status.' })
  @IsOptional()
  readonly status: Status;
}