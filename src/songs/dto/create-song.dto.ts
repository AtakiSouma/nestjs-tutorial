import {
    IsArray,
    IsDateString,
    IsMilitaryTime,
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";
export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    readonly title;
    @IsNotEmpty()
    @IsArray()
    // @IsString({ each: true })
    // readonly artists;
    @IsNumber({}, { each: true })
    readonly artists;
    @IsDateString()
    @IsNotEmpty()
    readonly releasedDate: Date;
    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;
    @IsNotEmpty()
    @IsString()
    readonly lyrics: string
}
