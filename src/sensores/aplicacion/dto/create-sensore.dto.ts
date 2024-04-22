import { PayloadDto } from "./payload.dto";

export class CreateDataSensorDto {
    clientid: string;
    qos: number;
    topic: string;
    payload: PayloadDto
    event: string;
    peerhost: string;
    node: string;
    flags: Flags;
}

export interface Flags {
    retain: boolean;
    dup: boolean;
}

export interface Metadata {
    rule_id: string;
}

export interface PubProps {
    "User-Property": UserProperty;
}

export interface UserProperty {
}


