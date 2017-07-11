import uuidV4 = require('uuid/v4');

export class LSP{

    public router_id : string
    public id : string
    public sequence : number
    public TTL : number
    //A list that indicates each directly connected router,
    // the network behind each one, and the cost to get to that router.
    public list : Object
    public send_from: string

    constructor(){
        this.id = uuidV4();
        this.router_id = null;
        this.sequence = null;
        this.TTL = 10;
        this.list = null;
        this.send_from = null;
    }

}