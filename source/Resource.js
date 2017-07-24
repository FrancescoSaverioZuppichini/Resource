class Observer {

  constructor(listener) {
    this._state = {}
    this.listener = listener
  }

  add(el, key = 'id') {
    this._state[el[key]] = el
    this.listener()
  }

  override(newState) {
    this._state = newState
    this.listener()
  }

  remove(id) {
    delete this._state[id]
    this.listener()

  }

  get(key) {
    return this._state[key]
  }

  update() {
    this.listener()
  }

}

class Resource {
  constructor() {
    this.cache = new Observer(this.listener.bind(this))
    this.cache.listener()
  }

  listener() {
    this.data = Object.keys(this.cache._state).map(key => this.cache._state[key])
  }

  fromArray(array, key = 'id') {
    array.forEach(el => this.add(el, key))
  }

  fromObject(object) {
    this.cache.override(Object.assign(this.cache._state, object))
  }

  removeMultiple(arrayOfIds) {
    arrayOfIds.forEach(id => this.remove(id))
  }

  update(newEl, key) {
    var oldEl = this.get(key)
    Object.assign(oldEl, newEl)
  }

  remove(id) {
    this.cache.remove(id)
  }

  add(el, key = 'id') {
    // do not override the object pointer
    if (this.get(el[key]))
      this.update(el, el[key])
    else {
      this.cache.add(el, key)
    }
  }

  get(key) {
    return this.cache.get(key)
  }
}

export default Resource
