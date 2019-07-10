const gatherBarcodes = (barcodes) => {
    let gatheredBarcodes= [];
    let index = 0;
    for (let i = 0; i < barcodes.length; i++) {
        let found = false;
        for (let j = 0; j < gatheredBarcodes.length; j++) {
            if (barcodes[i] === gatheredBarcodes[j].barcode) {
                gatheredBarcodes[j].count++;
                found = true;
                break;
            }
        }
        if (!found) {
            gatheredBarcodes[index++] = {barcode:barcodes[i],count:1};
        }
    }
    return gatheredBarcodes;
};

const loadAllItem = () => [
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
    ]
;
const getItemByBarcode = (barcode) => {
    const allItem = loadAllItem();
    for (let i = 0; i < allItem.length; i++) {
        if (barcode === allItem[i].id) {
            return allItem[i];
        }
    }
    return null;
}

const createReceiptOfItem = (gatheredBarcode,item) => ({name:item.name,price:item.price,count:gatheredBarcode.count});

const getPriceSumReceipt = (allReceiptOfItem) => {
    let sum = 0;
    for (let i = 0; i < allReceiptOfItem.length; i++) {
        sum += allReceiptOfItem[i].price * allReceiptOfItem[i].count;
    }
    return {text:'Price:',sum:sum};
};

const renderReceipt = (allReceiptOfItem,priceSumReceipt) => {
    let receipt = "";
    receipt = 
    `Receipts
    ------------------------------------------------------------
    `;
    for (let i = 0; i < allReceiptOfItem.length; i++) {
        receipt += 
        `${allReceiptOfItem[i].name}  ${allReceiptOfItem[i].price}  ${allReceiptOfItem[i].count}
    `;
    }
    receipt += 
    `------------------------------------------------------------
    ${priceSumReceipt.text} ${priceSumReceipt.sum}`;
    return receipt;
}

const printReceipt = (barcodes) => {
    const gatheredBarcodes = gatherBarcodes(barcodes);
    let allReceiptOfItem = [];
    let index = 0;
    for (let i = 0; i < gatheredBarcodes.length; i++) {
        const item = getItemByBarcode(gatheredBarcodes[i].barcode);
        if (item === null) {
            return `[ERROR]: Barcode ${gatheredBarcodes[i].barcode} item not found`;
        }
        allReceiptOfItem[index++] = createReceiptOfItem(gatheredBarcodes[i],item);
    }
    const priceSumReceipt = getPriceSumReceipt(allReceiptOfItem);
    return renderReceipt(allReceiptOfItem,priceSumReceipt);
};

module.exports = [gatherBarcodes,loadAllItem,getItemByBarcode,createReceiptOfItem,getPriceSumReceipt,renderReceipt,printReceipt];