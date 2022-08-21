const express = require('express')
const app = express()
const uuid = require('uuid')
app.use(express.json())

newOrder = []

const checkId = (request, response, next) => {
    const { id } = request.params

    const numberOrder = newOrder.findIndex(suit => suit.id === id)

    if (numberOrder < 0) {
        return response.status(404).json({ Error: "not found" })
    }

    request.order = numberOrder
    request.orderId = id
    next()
}

const methodAndUrl = (request, response, next) => {
    const method = request.method
    const url = request.url
    
    console.log(`O método é ${method}`)
    console.log(`A url dessa aplicação é ${url}`)
    next()
}

app.get('/newOrder',methodAndUrl, (request, response) => {
    
    return response.json(newOrder)
})

app.post('/newOrder',methodAndUrl, (request, response) => {
    const { order, clientName, price } = request.body

    const newRequest = { id: uuid.v4(), order, clientName, price, status: "Em preparação" }

    newOrder.push(newRequest)

    return response.status(201).json(newRequest)
})

app.put('/newOrder/:id', checkId, methodAndUrl, (request, response) => {
    const numberOrder = request.order
    const id = request.orderId
    const { order, clientName, price } = request.body

    const updateOrder = { id, order, clientName, price, status: "Em preparação" }



    newOrder[numberOrder] = updateOrder

    return response.json(updateOrder)

})

app.delete('/newOrder/:id', checkId,methodAndUrl, (request, response) => {
    const numberOrder = request.order

    newOrder.splice(numberOrder, 1)

    return response.status(204).json()
})

app.get('/newOrder/:id', checkId,methodAndUrl, (request, response) => {
    const id = request.orderId

    const orderTotal = newOrder.find(suit => suit.id === id)

    return response.json(orderTotal)
})

app.patch('/newOrder/:id', checkId,methodAndUrl, (request, response) => {

    const id = request.orderId

    const orderTotal = newOrder.find(suit => suit.id === id)

    orderTotal.status = "Pronto"

    return response.json(orderTotal)
})



app.listen(3000, () => {
    console.log("Vamo botar pra quebrar essa bagaça")
})