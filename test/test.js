import {Resource} from '../source/index.js'

var assert = require('assert');
var data = [
  {
    'id': 0
  }, {
    'id': 1
  }, {
    'id': 2
  }
]

describe('Resource', () => {
  describe("create", () => {
    it("should create a new resource with empty data", () => {
      var resource = new Resource()
      assert.equal(resource.data.length, 0)
    })
  })
  describe("fromArray", () => {
    it("should populate the cache with the data in the array", () => {
      var resource = new Resource()
      resource.fromArray(data)
      assert.equal(resource.data.length, data.length)
    })
  })
  describe("fromObject", () => {
    it("should populate the cache with the data in the object", () => {
      var resource = new Resource()
      resource.fromObject(data[0])
      assert.equal(resource.data.length, 1)
    })
  })
  describe("add", () => {
    it("should add new element", () => {
      var resource = new Resource()
      resource.add({'id': 3})
      assert.equal(resource.data.length, 1)
    })
    it("should replace an existing element if has the same key", () => {
      var resource = new Resource()
      resource.add({'id': 3, "foo": "foo"})
      assert.equal(resource.data.length, 1)
      assert.ok(resource.data[0].foo == "foo")
    })
  })
  describe("get", () => {
    it("should get an element", () => {
      var resource = new Resource()
      resource.add({'id': 3,'foo':'foo'})
      assert.equal(resource.get(3).foo, 'foo')
    })
  })
  describe("update", () => {
    it("should get an element", () => {
      var resource = new Resource()
      resource.add({'id': 3,'foo':'foo'})
      resource.update({'foo':'foo2'},3)
      assert.equal(resource.get(3).foo, 'foo2')
    })
  })
  describe("remove", () => {
    it("should remove an element", () => {
      var resource = new Resource()
      resource.add({'id': 3})
      resource.remove(3)
      assert.equal(resource.data.length, 0)
    })
    it("should not do anything is the element does not exist", () => {
      var resource = new Resource()
      resource.add({'id': 3})
      resource.remove(1)
      assert.equal(resource.data.length, 1)
    })
  })
  describe("removeMultiple", () => {
    it("should remove more than one element at the same time", () => {
      var resource = new Resource()
      resource.fromArray(data)
      resource.removeMultiple([0, 1, 2])
      assert.equal(resource.data.length, 0)
    })
  })
})
