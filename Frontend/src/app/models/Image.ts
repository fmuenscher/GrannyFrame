export class Image {
    public id: string;
    public username: string;
    public prename: string;
    public lastname: string;
    public date: Date;
    public caption: string;
    public b64Data: string;


    constructor(id: string, username: string, prename: string, lastname: string, date: Date, caption: string, b64Data: string) {
        this.id = id;
        this.username = username;
        this.prename = prename;
        this.lastname = lastname;
        this.date = date;
        this.caption = caption;
        this.b64Data = b64Data;
    }
}
