import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";


async function getTicketsTypes() {
    const tickets = await ticketsRepository.findFist();
    
    return tickets;
}

async function getTickets() {
    const tickets = await ticketsRepository.findFistTickets();
    
    if(!tickets) throw notFoundError();

    return tickets;
}

async function createTickets(data: any) {
    
    return await ticketsRepository.create(

       data
    );
  
    
  }

const ticketsService = {
    getTicketsTypes,
    getTickets,
    createTickets
};

export default  ticketsService;