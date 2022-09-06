// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const TableRequest = require('../models/TableRequest')
const ObjectId = require('mongodb').ObjectId;


router.get('/club/:clubid', async (req, res) =>{ 


    let clubIdParam = req.params.clubid;

    try {

        let retrievedTransactions = await Transaction.find({ clubId: new ObjectId(clubIdParam)});
        res.json(retrievedTransactions);

    } catch (err) {

        res.status(400).send({ message: "Invalid request -- The transactions could not be retrieved from the specific club." });

    }

});

router.get('/tablereq/:tablereqid', async (req, res) => {
    let tablereqidparam = req.params.tablereqid;
    try {
        let transactions = await Transaction.find({tableReqId: new ObjectId(tablereqidparam)});
        res.json(transactions);
    } catch (error) {
        res.status(400).send({message: "Invalid request -- the transaction could not be retrieved from the specific table request"})
    }
})

router.post('/tablereq/:tablereqid', async (req, res) =>{ 


    let tableReqIdParam = req.params.tablereqid;
    let customerIdParam = null;
    let amountParam = null;
    let dateCreatedParam = null;
    let isRefundParam = null;
    let assosciatedClubIdParam = null;
    let newTransaction = null;
    try {
        customerIdParam = req.body.customerId;
        amountParam = parseInt(req.body.amount);
        dateCreatedParam = new Date(req.body.dateCreated);
        isRefundParam = req.body.isRefund;
        let tableReqClub= await TableRequest.findById(new ObjectId(tableReqIdParam));
        assosciatedClubIdParam = new ObjectId(tableReqClub.clubId);

        newTransaction = await Transaction.create({
            customerId: customerIdParam,
            amount: amountParam,
            dateCreated: dateCreatedParam,
            isRefund: isRefundParam,
            tableReqId: tableReqIdParam,
            clubId: assosciatedClubIdParam
        });
        await newTransaction.save();
        res.json({message: "Transaction successfully created"})

    } catch (err) {
        res.status(400).send({ message: "Invalid request -- There was an issue creating the transaction" });

    }

});



module.exports = router;
