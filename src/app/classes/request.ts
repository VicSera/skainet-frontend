import { RequestStatus } from '../enums/request-status.enum';


export class JoinRequest {
    public userId: number
    public tripId: number
    public status: RequestStatus
}
