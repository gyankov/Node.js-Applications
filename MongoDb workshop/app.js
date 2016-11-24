var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TelerikFriends');

var db = mongoose.connection;

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        match: /^[A-Z]([a-z]?)+$/,
        required: true
    },
    middleName: {
        type: String,
        match: /^[A-Z]([a-z]?)+$/,
        required: true
    },
    lastName: {
        type: String,
        match: /^[A-Z]([a-z]?)+$/,
        required: true
    },
    insuranceNumber: {
        type: String,
        match: /[A-Z a-z 0-9-]/,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
        required: true
    },
    contactDetails: {
        phone: {
            type: String,
            match: /^[0-9\-\+]{9,15}$/
        },
        email: {
            type: String,
            match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i//,
        },
        workRoom: {
            type: Number,
            min: 100,
            max: 999
        }

    },
    ItemsForSale: {
        type: [{

        }]
    }

})

var Employee = mongoose.model("Employee",employeeSchema);
var em = new Employee({
    firstName:'Gosho',
    middleName: 'Gosho',
    lastName: 'Gosho',
    insuranceNumber: 'Gosho',
    age: 19,
    contactDetails:{
        phone: '0942847824',
        email:'sdgafdv@gmail.com',
        workRoom:900
    }
});

em.save()