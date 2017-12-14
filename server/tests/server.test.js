
const {ObjectID} = require('mongodb');
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const dummyTodos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'second todo'
    },
    {
        _id: new ObjectID(),
        text: 'third todo'
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(dummyTodos);
    }).then(() => done());
  });

describe('POST/todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text: text})
            .expect(200)
            .expect( (response) => {
                expect(response.body.text).toBe(text);
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }

                Todo.find({ text: text }).then( (todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( (error) => done(error) );
            });
    });

    it('Sould not crerate todo with invalid body data', (done) => {
        var text = "";

        request(app)
            .post('/todos')
            .send({text: text})
            .expect(400)
            .end( (error, response) => {
                if  (error) {
                    return done(error);
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch( (error) => {
                    done(error);
                })

            });
    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((response) => {
            expect(response.body.todos.length).toBe(3);
        })
        .end(done);
    })
})



describe('GET /todo/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todo/${dummyTodos[0]._id.toHexString()}`)
        .expect(200)
        .expect((response) => {
            expect(response.body.todo.text).toBe(dummyTodos[0].text);
        })
        .end(done);
    });


    it('Should return a 404 if todo not found', (done) => {
       var hexId = new ObjectID().toHexString();
       
        request(app)
            .get(`/todo/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 non-object ids', (done) => {
        request(app)
            .get('/todo/123')
            .expect(404)
            .end(done);
    })

});


    describe('DELETE /todos/:id', () => {

        it('Should remove a todo', (done) => {
            var hexId = dummyTodos[1]._id.toHexString();
            request(app)
                .delete(`/todo/${hexId}`)
                .expect(200)
                .expect((response) => {
                    expect(response.body.result._id).toBe(hexId);
                })
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    Todo.findById(hexId).then((todo) => {
                        expect(todo).toBeNull();
                        done();
                    }).catch( (error) => {
                        done(error);
                    })

                })
        });

        it('Should return a 404 if todo not found', (done) => {
            request(app)
                .delete(`todo/5a2eff93d1b3a029287553f8`)
                .expect(404)
                .end(() => {
                    done();
                });
        });

        it('Should return 404 if object id is invalid', (done) => {
            request(app)
                .delete(`todo/12345`)
                .expect(404)
                .end( () => {
                    done();
                });
        });
    })