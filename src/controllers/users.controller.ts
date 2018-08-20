import {Controller, Get, Route} from 'tsoa';
import {Inject} from 'typescript-ioc';
import {getManager} from "typeorm";
import { User } from '../entities/User';

@Route('users')
export class UsersController extends Controller {

    /**
     * Charge la liste des alertes.
     * @returns {Promise<Alerte[]>}
     */
    @Get()
    public async getUsers(): Promise<User[]> {
        // get a post repository to perform operations with post
        console.log("holaa");
    const postRepository = getManager().getRepository(User);
        return await postRepository.find();
    }

}
