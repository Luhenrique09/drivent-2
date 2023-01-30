import { getTickets, getTicketsTypes, createTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";


const ticketsRouter = Router();

ticketsRouter
    .get("/types",authenticateToken, getTicketsTypes)
    .get("/",authenticateToken, getTickets)
    .post("/",authenticateToken, createTickets)

export {ticketsRouter};