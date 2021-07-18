import User from '../../entity/User';
import { getRepository } from 'typeorm';

export const createUser = async (userDTO: User): Promise<boolean> => {
    try {
        const userRepository = getRepository(User);
        await userRepository.save(userDTO);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
