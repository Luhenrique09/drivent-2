import { prisma } from "@/config";

async function findFist() {
    return prisma.ticketType.findFirst();
}

async function findFistTickets() {
    return prisma.ticket.findFirst({
        select:{
            id: true,
            status:true,
            ticketTypeId: true,
            enrollmentId: true,
            TicketType:{
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isRemote: true,
                    includesHotel: true,
                    createdAt: true,
                    updatedAt:true,
                }
            },
            createdAt: true,
            updatedAt: true
        }
    });
}

async function create(data : any) {
    console.log(data)
    return prisma.ticket.create({
        data,
        
    });
}



const ticketsRepository = {
    findFist,
    findFistTickets,
    create
};

export default ticketsRepository;