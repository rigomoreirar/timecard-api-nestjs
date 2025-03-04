import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateTimecardDto {
    // Why not isnumber?
    @IsInt()
    userId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
