import { web } from "../src/application/web.js"
import supertest from "supertest"
import { createTestUser, getTestUser, removeTestUser} from "./test-util.js"
import { logger } from "../src/application/logging.js"
import bcrypt from "bcrypt"


describe('POST /api/users', () => {

    afterEach(async () => {
        await removeTestUser()
    })
    
    it('should can register new user', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username : 'test',
            password : 'rahasia',
            name : 'test'
        })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()

    })
})

describe('POST /api/users/login', () => {

    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can login' , async () => {
        const result = await supertest(web)
        .post("/api/users/login")
        .send({
            username : 'test',
            password : 'rahasia'
        })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe('test')
    })

    it('should reject login' , async () => {
        const result = await supertest(web)
        .post("/api/users/login")
        .send({
            username : '',
            password : ''
        })

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject login if password is wrong' , async () => {
        const result = await supertest(web)
        .post("/api/users/login")
        .send({
            username : 'test',
            password : 'salah'
        })

        logger.info(result.body) 

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/users/current',() => {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('Should can get current user', async () => {
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization','test');

        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
    })

    it('Should reject token is invalid', async () => {
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization','salah');

        logger.info(result.body)

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined()
    })
})

describe('PATCH /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can update user', async ()=> {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization","test")
        .send({
            name : "ichwan",
            password : "rahasialagi"
        })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("ichwan")

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi",user.password)).toBe(true)
    })

    it('should can update user name', async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "test")
            .send({
                name: "ichwan"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("ichwan");
    });

    it('should can update user password', async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "test")
            .send({
                password: "rahasialagi"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch("/api/users/current")
            .set("Authorization", "salah")
            .send({});

        expect(result.status).toBe(401);
    });
})

describe('DELETE /api/users/logout',function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can logout', async () => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        const user = await getTestUser();
        expect(user.token).toBeNull();
    })

    it('should rejected logout if token is invalid', async () => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization','salah')

        expect(result.status).toBe(401)
    })
})