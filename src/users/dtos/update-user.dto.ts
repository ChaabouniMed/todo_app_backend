import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto){}

// export class UpdateUserDto {

//     username? : String; //required

//     email? : String; //required

//     country? : String //not required
// }
