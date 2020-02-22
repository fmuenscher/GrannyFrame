import * as axios from "axios";
import {Image} from "./models/Image";

export class TelegramConnector {
    private botToken: string;

    constructor(botToken: string) {
        this.botToken = botToken;
    }

    public pollImages(): Image[]{
        return null;
    }
}