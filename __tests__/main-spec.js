const gatherBarcodes = require('../main')[0];
const loadAllItem =  require('../main')[1];
const getItemByBarcode =  require('../main')[2];
const createReceiptOfItem =  require('../main')[3];
const getPriceSumReceipt =  require('../main')[4];
const renderReceipt =  require('../main')[5];
const printReceipt =  require('../main')[6];

it ('should return error when given invalid barcode', () => {
    expect(printReceipt(['0000', '1003', '1005', '00003'])).toStrictEqual(
        `[ERROR]: Barcode 0000 item not found`
    );
});

it ('should gather barcodes', () => {
    expect(gatherBarcodes(['0001', '0003', '0005', '0003'])).toStrictEqual([
        {barcode:'0001',count:1},
        {barcode:'0003',count:2},
        {barcode:'0005',count:1}
    ]);
});

it ('should return allItem', () => {
    expect(loadAllItem()).toStrictEqual([
        {"id": "0001", "name" : "Coca Cola", "price": 3},
        {"id": "0002", "name" : "Diet Coke", "price": 4},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
        {"id": "0004", "name" : "Mountain Dew", "price": 6},
        {"id": "0005", "name" : "Dr Pepper", "price": 7},
        {"id": "0006", "name" : "Sprite", "price": 8},
        {"id": "0007", "name" : "Diet Pepsi", "price": 9},
        {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
        {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
        {"id": "0010", "name" : "Fanta", "price": 12}
    ]);
});

it ('should return Item when given barcode', () => {
    expect(getItemByBarcode('0001')).toStrictEqual(
        {"id": "0001", "name" : "Coca Cola", "price": 3}
    );
});

it ('should return ReceiptOfItem when given gatheredBarcode and item', () => {
    expect(createReceiptOfItem({barcode:'0001',count:1},{"id": "0001", "name" : "Coca Cola", "price": 3})).toStrictEqual(
        {name:'Coca Cola', price: 3,count: 1}
    );
});

it ('should return PriceSumReceipt when given allReceiptOfItem', () => {
    expect(getPriceSumReceipt([{name:'Coca Cola', price: 3,count: 1},{name:'Diet Coke', price: 3,count: 2}])).toStrictEqual(
        {text:'Price:', sum: 9}
    );
});

it ('should return receipt when given allReceiptOfItem and priceSumReceipt', () => {
    expect(renderReceipt([{name:'Coca Cola', price: 3,count: 1}],{text:"Price:",sum:3})).toStrictEqual(
        `Receipts
    ------------------------------------------------------------
    Coca Cola  3  1
    ------------------------------------------------------------
    Price: 3`
    );
});

it ('should return receipt when given barcodes', () => {
    expect(printReceipt(['0001', '0003', '0005', '0003'])).toStrictEqual(
        `Receipts
    ------------------------------------------------------------
    Coca Cola  3  1
    Pepsi-Cola  5  2
    Dr Pepper  7  1
    ------------------------------------------------------------
    Price: 20`
    );
});