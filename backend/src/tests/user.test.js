const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'

let TOKEN 
let userId
beforeAll(async () => {

    const user = {
        email: "elgatofelix@gmail.com",
        password: "felix1234"
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)
 
    TOKEN = res.body.token
})

test("GET ALL -> BASE_URL, should return statusCode 200, and res.body.length === 1", async()=> {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("POST -> BASE_URL should return statuscode 201 and res,body.firstName === user.FirstName", async () => {
    const user = {
        firstName: "Sr Pollo",
        lastName: "Luquin",
        email: "anakipollo@gmail.com",
        password: "srpollo1234",
        phone: "1234"
    }

    const res = await request(app)
     .post(BASE_URL)
     .send(user)

     userId = res.body.id

     expect(res.statusCode).toBe(201)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(user.firstName)
})
test("PUT -> BASE_URL/:id, should return status code 200, res.body.lastName === userUpdate.lastName", async () => {
    const userUpdate = {
        lastName:"Chavez"
    }

    const res = await request(app)
     .put(`${BASE_URL}/${userId}`)
     .send(userUpdate)
     .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(userUpdate.lastName)

})
test("POST -> BASE_URL/login, should return statusCode 200, res.body.user.email === user.email and res.body.token to be defined", async () => {
    const user = {
        email: "elgatofelix@gmail.com",
        password: "felix1234"
    }

    const res = await request(app)
     .post(`${BASE_URL}/login`)
     .send(user)

 expect(res.statusCode).toBe(200)
 expect(res.body).toBeDefined()
 expect(res.body.user.email).toBe(user.email)
 expect(res.body.token).toBeDefined()
})
test("POST BASE_URL/login should return statusCode 401", async () => {
    const userInvalid = {
        email: "elgatofelix@gmail.com",
        password: "Invalid Credentials"
    }
    const res = await request(app)
     .post(`${BASE_URL}/login`)
     .send(userInvalid)

    expect(res.statusCode).toBe(401)
})
test("DELETE -> BASE_URL/:id should return statuscOde 204", async () => {
    const res = await request(app)
     .delete(`${BASE_URL}/${userId}`)
     .set('Authorization', `Bearer ${TOKEN}`)

 expect(res.statusCode).toBe(204)
})