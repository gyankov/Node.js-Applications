"use strict";

class Queue{
    constructor(){
        this.items=[];
    }

    push(item){
        this.items.push(item);
    }

    pop(){
        return this.items.pop();
    }

    peek(){
        return this.items[0];
    }

    isEmpty(){
        return this.items.length == 0;
    }
}

module.exports.getQueue = function(){
    return new Queue();
}