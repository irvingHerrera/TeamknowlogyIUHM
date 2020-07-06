const assert = require('assert');
const mutationController = require('../controllers/mutation');

describe('Controller Mutation', () => {
    describe('function mutation', () => {
        it('shoul have a object', () => {
            assert.equal(typeof mutationController, 'object');
        })

        it('shoul have a mutation Method', () => {
            assert.equal(typeof mutationController.mutation, 'function')
        })

        it('shoul have a mutation stats', () => {
            assert.equal(typeof mutationController.stats, 'function')
        })

        it('shoul have a mutation stats', () => {
            const res = mutationController.stats();
            assert.equal(typeof res, 'object')
        })

        it('shoul have a mutation mutation', () => {
            const res = {
                status: function(){return {json: function() {}}}
            };
            const req = {
                body: {
                    dna:[
                        "ATGCGA",
                        "CAGTGC",
                        "TTATTT",
                        "AGACGG",
                        "GCGTCA",
                        "TCACTG"
                    ]
                }
            }
            const response = mutationController.mutation(req, res);
            console.log('response',response);
            
            assert.equal(typeof response, 'undefined')
        })
    });
});