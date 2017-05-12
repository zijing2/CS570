import {LSP} from './lsp'
import {app} from './app'
import {SPF} from './spf'

export class router{
    public id : string 
    public status : string
    public network : string
    public network_cost : number
    public tick : number
    public connected_routers_list
    public packets_copy : Object
    public ori_packet : LSP
    public sequence : number
    public recieved_list : Object
    public ohsr_list //originate highest sequense recesived list
    public adjacent_list //adjacent list for all nodes
    public router_network_mapping 
    public routing_table

    public TICK_CHECK = 1;


    constructor(){
        this.id = null;
        this.status = "start";
        this.network = null;
        this.network_cost = null;
        this.tick = 0;
        this.connected_routers_list = {};
        this.packets_copy = null;
        this.ori_packet = null;
        this.sequence = 0;
        this.recieved_list = {};
        this.ohsr_list = {};
        this.adjacent_list = {};
        this.router_network_mapping = {};
        this.routing_table = {};
    }

    public receivePacket(packet : LSP){
        if(this.status==="start"){
            packet.TTL = packet.TTL-1;
            if(!this.checkDiscard(packet)){
                this.piecePuzzleTogether(packet);
                SPF.init(this.id,this.adjacent_list);
                SPF.computeSPF();
                this.updateRoutingTable();
                //console.log(this.id,this.routing_table);
                //flooding
                for(var prop in this.connected_routers_list){
                    var new_packet = this.copyPacket(packet);
                    //if(prop != packet.send_from && prop != packet.router_id){
                        new_packet.send_from = this.id;
                        if(app.routers[prop].receivePacket(new_packet)==true){
                            if(this.recieved_list[this.tick]==undefined){
                                this.recieved_list[this.tick] = {};
                            }
                            this.recieved_list[this.tick][prop] = 1;
                        }
                   // }
                }
                //console.log(this.adjacent_list);
            }else{
                //console.log("discard:",packet.id);
            }
            return true;
        }else{
           
            return false;
        }
    }

    public originatePacket(){
        if(this.status==="start"){
            this.generateLSP();
            this.tick = this.tick+1;
            this.recieved_list[this.tick] = {};
            for(var prop in this.connected_routers_list){
                var new_packet = this.copyPacket(this.ori_packet);
                new_packet.send_from = this.id;
                if(app.routers[prop].receivePacket(new_packet)==true){
                    this.recieved_list[this.tick][prop] = 1;
                }
            }
            if(this.tick>=this.TICK_CHECK){
                this.checkTicks();
            }      
        }
        //console.log(app.routers[3].connected_routers_list);
    }

    /*
    *   generate a link state packet
    */
    private generateLSP(){
        this.sequence = this.sequence+1;
        this.ori_packet = new LSP();
        this.ori_packet.router_id = this.id;
        this.ori_packet.sequence = this.sequence;
        this.ori_packet.list = {};
        this.ori_packet.TTL = 10;
        for(var prop in this.connected_routers_list){
            this.ori_packet.list[prop] = {};
            this.ori_packet.list[prop].cost = this.connected_routers_list[prop];
            this.ori_packet.list[prop].network = app.routers[prop].network;
        }
    }

    /*
    * update connected_routers_list by checking ticks
    */
    private checkTicks(){
         for(var prop in this.connected_routers_list){
            //update when shutdown
            if(this.recieved_list[this.tick][prop]==undefined && this.recieved_list[this.tick-1][prop]==undefined){
                this.setCostInfinite(prop);
            }
            //update when a router from shut-down to start
            if(this.recieved_list[this.tick][prop]!=undefined){
                this.connected_routers_list[prop] = 1;
                if(this.connected_routers_list[prop]==Number.MAX_VALUE){
                    this.connected_routers_list[prop] = app.routers[prop].connected_routers_list[this.id];
                }
            }
        } 
    }

    private setCostInfinite(router_id : string){
        this.connected_routers_list[router_id] = Number.MAX_VALUE;
    }

    private checkDiscard(packet : LSP): boolean{
        if(packet.TTL <= 0){
            return true;
        }
        if(this.ohsr_list[packet.router_id]==null){
            this.ohsr_list[packet.router_id]=packet.sequence;
        }else{
            if(this.ohsr_list[packet.router_id]>=packet.sequence){
                return true;
            }
        }
        return false;
    }

    /*
    * construct a graph for all nodes base on new lsp
    */
    private piecePuzzleTogether(packet: LSP){
        for(var i in packet.list){
            if(this.adjacent_list[packet.router_id] == null){
                this.adjacent_list[packet.router_id] = {};
            }
            if(this.adjacent_list[i] == null){
                this.adjacent_list[i] = {};
            }
            this.adjacent_list[packet.router_id][i] = packet.list[i].cost;
            this.adjacent_list[i][packet.router_id] = packet.list[i].cost;
            
            this.router_network_mapping[i] = packet.list[i].network;
        }
    }

    /*
    * update routing table(network, cost, outgoing link)
    */
    private updateRoutingTable(){
        for(var i in SPF.D){
            if(this.routing_table[app.routers[i].network]==undefined){
                this.routing_table[app.routers[i].network] = {};
            }
            if(typeof SPF.D[i]!="number"){
                SPF.D[i] = parseInt(SPF.D[i]);
            }
            if(typeof app.routers[i].network_cost!="number"){
                app.routers[i].network_cost = parseInt(app.routers[i].network_cost);
            }
            this.routing_table[app.routers[i].network].cost = SPF.D[i] + app.routers[i].network_cost;
            this.routing_table[app.routers[i].network].outgoing_link = SPF.outgoing_link[i][1];
            this.routing_table[this.network] = {};
            if(typeof this.network_cost=="number"){
                this.routing_table[this.network].cost = this.network_cost;
            }else{
                this.routing_table[this.network].cost = parseInt(this.network_cost);
            }
            
            this.routing_table[this.network].outgoing_link = null;
        }
        
    }

    private copyPacket(packet : LSP){
        var new_packet = new LSP();
        for(var i in packet){
            new_packet[i] = packet[i];
        }
        return new_packet;

    }


}