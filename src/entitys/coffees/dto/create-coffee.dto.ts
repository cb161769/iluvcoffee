import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateCoffeeDto {
    @ApiProperty({ description: 'The name of a coffee.' })
    @IsString()
    readonly name:string;
    @ApiProperty({ description: 'The name of a coffee.' })
    @IsString()
    readonly brand:string;
    @ApiProperty({ description: 'The name of a coffee.', default: 0 })
    @IsString({each:true})
    readonly flavors: string[];
}
