import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckinUseCaseRequest {
    userId: string,
    gymId: string
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckinUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({ 
        userId,
        gymId,
    }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOneDate(
            userId,
            new Date(),
        )

        if (checkInOnSameDate) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn,
        }
    }
}