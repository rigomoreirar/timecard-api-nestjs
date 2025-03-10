import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateTimecardDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
