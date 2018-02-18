const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const dummyTodos = [
    {text: "First test todo"},
    {text: "Second test todo"},
    {text: "Third test todo"}
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos).then(() => done());
    });
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Lorem Ipsum';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text).toBeA('string')
            })
            .end((error, res) => {
                if(error) {
                    done(error);
                } else {
                    Todo.find({text}).then(todos => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch(e => done(e));
                }
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .expect((res) => {
                expect(res.body.text).toNotBeA('string');
            })
            .end((err, res) => {
                if(err) {
                    done(err)
                } else {
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(3)
                        done();
                    }).catch(e => done(e));
                }
            });
    });
}); 

describe('GET /todos', () => {
    it('should print all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(3);
            })
            .end((err, res) => {
                if(err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
});