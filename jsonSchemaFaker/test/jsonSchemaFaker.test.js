const mockdata = require('../jsonSchemaFaker.js');
require("regenerator-runtime/runtime");

describe("Test jsonSchemaFaker.js", () => {
    var property = require('../../platform/api/property/documentation/1.0.0/property.json')
    var domain = require('../../platform/api/domain/documentation/1.0.0/domain.json')

    test('Mockdata with differnt seed and same schemas should not match', async() => {
        for(var i = 0; i<100; i++){
            var seed = Math.random()
            var mockdata1 = await mockdata('domain', seed)
            var mockdata2 = await mockdata('domain', seed + 1)
            expect(mockdata1).not.toEqual(mockdata2)
        }
    })
    test('Mockdata with same seed and same schemas should match', async() => {
        for(var i = 0; i<100; i++){
            var seed = Math.random()
            var mockdata1 = await mockdata('domain', seed)
            var mockdata2 = await mockdata('domain', seed)
            expect(mockdata1).toEqual(mockdata2)
        }
    })
    test('The function should take in a string of a real json and not throw a error', async() => {
        for(var i = 0; i<100; i++){
            function TestString (){
                var seed = Math.random()
                mockdata('domain', seed)
            }
            expect(TestString).not.toThrowError()
        }
    })
    test('The function should take in a array of a real json\'s and not throw a error', async() => {
        for(var i = 0; i<100; i++){
            function TestArray (){
                var seed = Math.random()
                mockdata(['domain', 'property'], seed)
            }
            expect(TestArray).not.toThrowError()
        }
    })
    test('The function should take in a object of a real json and not throw a error', async() => {
        for(var i = 0; i<100; i++){
            function TestObject (){
                var seed = Math.random()
                mockdata(domain, seed)
            }
            expect(TestObject).not.toThrowError()
        }
    })
    test('The function should take in a string of a fake json and throw a error', async() => {
        for(var i = 0; i<100; i++){
            function TestFakeString (){
                var seed = Math.random()
                mockdata('fdsfhks', seed)
            }
            expect(TestFakeString).toThrowError(new Error('The Json Does Not Exist'))
        }
    })
    test('The function should take in a array of a fake json\'s and throw a error', async() => {
        for(var i = 0; i<100; i++){
            function TestFakeArray (){
                var seed = Math.random()
                mockdata(['fdsfhks', 'gkgskh', 'gsgkg'], seed)
            }
            expect(TestFakeArray).toThrowError(new Error('The Json Does Not Exist'))
        }
    })
    test('The function should take in a array of a real json\'s and return a object', async() => {
        for(var i = 0; i<100; i++){
            var mockdata1 = mockdata(['domain', 'property'])
            expect(typeof mockdata1).toBe('object')
        }
    })
    test('The function should take in a array of a real json\'s both oject and string and return a object', async() => {
        for(var i = 0; i<100; i++){
            var mockdata1 = mockdata(['domain', property])
            expect(typeof mockdata1).toBe('object')
        }
    })
})

