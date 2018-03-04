const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const dummyTodos = [
    {_id: new ObjectID(), text: "First test todo"},
    {_id: new ObjectID(), text: "Second test todo"},
    {_id: new ObjectID(), text: "Third test todo", completed: true, completedAt: 333}
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

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(dummyTodos[0].text);
            })
            .end(done);
    });

    it('should return status of 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/485')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete a todo', (done) => {
        const id = dummyTodos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(id).then(todo => {  
                    expect(todo).toNotExist();
                    done();
                }).catch(e => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        const hexID = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('should return 400 if id is not valid', (done) => {
        request(app)
            .delete('/todos/56645553659')
            .expect(400)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        const hexID = dummyTodos[0]._id.toHexString();
        const body = {
            text: "Updated from server.test.js",
            completed: true
        };

        request(app)
            .patch(`/todos/${hexID}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        const hexID = dummyTodos[2]._id.toHexString();

        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});