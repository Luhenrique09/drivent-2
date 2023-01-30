import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {

    try {
        const result = await ticketsService.getTicketsTypes();

        if (!result) return res.status(httpStatus.OK).send([]);

        return res.status(httpStatus.OK).send([result]);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.send(httpStatus.NO_CONTENT);
        }
    }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {

    try {
        const result = await ticketsService.getTickets();

        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.send(httpStatus.NO_CONTENT);
        }
    }
}

export async function createTickets(req: AuthenticatedRequest, res: Response) {
    const { ticketTypeId, userId } = req.body;

    if (!userId) return res.status(404)
    if (!ticketTypeId) return res.status(400)

    try {

        const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);
        const data = {
            ticketTypeId,
            enrollmentId: enrollmentWithAddress.id,
            status: "PAID"
        }
        await ticketsService.createTickets(data);



        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}