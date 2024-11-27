import { Router } from "express"

const routes = new Router()


routes.get("/", (req, res) => {
    return res.status(200).json({ message: " Hello Word" })

})

export default  routes