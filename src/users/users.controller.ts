import { Controller, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService) {

    }

   /*  @Put('edit-name')
    editName(@Param() params) {
        return this.userService.editName(params);
    } */
}
