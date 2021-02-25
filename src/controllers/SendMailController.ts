import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists"
            });
        }

        const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id })

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists"
            });
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: surveyAlreadyExists.id,
        });
        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { SendMailController };