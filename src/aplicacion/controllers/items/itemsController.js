const { response, request } = require("express");

const ItemsService = require('../../services/ItemsService');

const getItemById = async (pRequest = request, pResponse = response) => {
    const { id } = pRequest.params

    try {
        if (!id) {
            pResponse.status(400).json({
                error: true,
                message: "Bad request",
            })
        }

        const { item, description, decimal_places } = await ItemsService.getItemDataById(id);

        const itemResponse = {
            id: item.id,
            title: item.title,
            price: {
                amount: item.price,
                currency: item.currency_id,
                decimal: decimal_places
            },
            picture: item.secure_thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            sold_quantity: item.sold_quantity,
            description: description.plain_text || {}
        };
    
        pResponse.status(200).json({
            item: itemResponse
        })
    }catch(pError) {
        console.error(pError)

        pResponse.status(400).json({
            error: true,
            message: pError.response?.data.message || "Bad request",
        })
    }
}

const getItemsbyQuery = async (pRequest = request, pResponse = response) => {
    const { q } = pRequest.query

    try {
        if (!q || q === undefined || q === "") {
            throw ('Bad request')
        }
        const authorName = "Javier";
        const authorLastname = "Gil";
        const { categories, items } = await ItemsService.getItemsDataByQuery(q,authorName, authorLastname);
    
        pResponse.status(200).json({
            categories: categories,
            items: items
        })
    }catch(pError) {
        pResponse.status(400).json({
            error: true,
            message: pError.toString(),
        })
    }
}

module.exports = {
    getItemById,
    getItemsbyQuery
}

