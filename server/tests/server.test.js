const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const dummyTodos = [
    {
        text: 'First test todo'
    },
    {
        text: 'second todo'
    },
    {
        text: 'third todo'
    }
]

beforeEach((done) => {
    Todo.remove({}).then( () => {
        return Todo.insertMany(dummyTodos);
        done();
    }).then( () => {
        done()
    });
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
