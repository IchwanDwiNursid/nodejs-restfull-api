import supertest from "supertest";
import { createManyTestContacts, createTestContact, createTestUser , getTestContact, removeAllTestContacts, removeTestUser } from "./test-util.js"
import { web } from "../src/application/web.js"

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should can create new contact', async () => {
        const result = await supertest(web)
        .post("/api/contacts")
        .set("Authorization","test")
        .send({
            first_name : "test",
            last_name : "test",
            email : "test@pzn.com",
            phone : "089000000"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@pzn.com");
        expect(result.body.data.phone).toBe("089000000");
    })

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
        .post("/api/contacts")
        .set("Authorization","test")
        .send({
            first_name : "",
            last_name : "test",
            email : "test",
            phone : "089000000245948357230915720594252252059"
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts/:contactId',function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .get("/api/contacts/" + testContact.id)
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe(testContact.first_name)
        expect(result.body.data.last_name).toBe(testContact.last_name)
        expect(result.body.data.email).toBe(testContact.email)
        expect(result.body.data.phone).toBe(testContact.phone)
    })

    it('should return 404 if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .get("/api/contacts/" + (testContact.id + 1))
        .set('Authorization','test')

        expect(result.status).toBe(404)
    })
})

describe('PUT /api/contacts/:contactId',() => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it('should can update exiting contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .put('/api/contacts/' + testContact.id)
        .set('Authorization','test')
        .send({
            first_name : 'Ichwan',
            last_name : 'dwi',
            email : 'ichwan@pzn.com',
            phone : '085612345'
        })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe("Ichwan")
        expect(result.body.data.last_name).toBe("dwi")
        expect(result.body.data.email).toBe("ichwan@pzn.com")
        expect(result.body.data.phone).toBe("085612345")
    })

    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .put('/api/contacts/' + testContact.id)
        .set('Authorization','test')
        .send({
            first_name : '',
            last_name : '',
            email : 'ichwan',
            phone : ''
        })

        expect(result.status).toBe(400)
    })

    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .put('/api/contacts/' + (testContact.id + 1))
        .set('Authorization','test')
        .send({
            first_name : 'Ichwan',
            last_name : 'dwi',
            email : 'ichwan@pzn.com',
            phone : '085612345'
        })

        expect(result.status).toBe(404)
    })
})

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })  
    
    
    it('should can delete contact', async () =>{
        let testContact = await getTestContact();
        const result = await supertest(web)
        .delete('/api/contacts/' + testContact.id)
        .set('Authorization','test')


        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        testContact = await getTestContact()
        expect(testContact).toBeNull()
    })
})

describe('GET /api/contacts',  () => {
    beforeEach(async () => {
        await createTestUser()
        await createManyTestContacts()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })  

    it('should cann search without parameter', async () => {
        const result = await supertest(web)
        .get('/api/contacts')
        .set('Authorization','test');

        
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })
})