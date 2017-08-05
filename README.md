
# Resource

*A more convenient way store your state data using a map*

![creating a resource from some data](https://cdn-images-1.medium.com/max/2000/1*Zf8TAYwDcu_qTEg3gwlAJg.png)*creating a resource from some data*

## Installation

The package is available on npm:
[**resource-class**
*A container for resourses that uses a cache to speed-up computation*www.npmjs.com](https://www.npmjs.com/package/resource-class)

You can install by

    npm install resource-class

    import {Resource} from 'resource-class'

    var something = new Resource()

## Motivation

We usually store data information as array in the state. It does not matter if you are using Vue, React or Angular.

You usually do something like:

    state.users = [//array of users]

Imagine now you want to remove a user.

    state.users.splice(state.users.indexOf(user),1) 

You need to walk the entire list to find out the index of the user and then remove it. That is inconvenient.

A better approach is to store the data in a JSON-like form, so with a map.

    state.users = createAMapFrom([//array of users])

Imagine that createAMapFrom creates a map using a specific key, maybe the user_id. Now we can quickly perform CRUD operation by just access the map in constant time

    delete state.users[userToRemove.user_id]

Much better. But a problem emerged, where is the original array? To get it back we need to fetch all the values from the users’ map by doing something like

    Object.keys(state.users).map(key => state.users[key])

or we can use Object.values. But we have a problem: fetching all the values every time even if we do not change the state may be costing.

## Resource

The **Resource** class implements this idea in a more general way. It updates the inner data array only when the map is changed. It keeps an inner cache that will automatically call the listener function every time something change. In our case it updates the data field that is the array with the actual data.

You can see that Resource exposes the classic CRUD methods: update, remove, add and get.

Also you can create and add multiple objects at the same time. For instance, imagine we receive an array of users after an API call.

    var users = new Resource()
    users.fromArray([//array with users that we fetched])
    console.log(users.data) // [//array with users that we fetched]

Super easy!

The default key to store the data into the map is ‘id’, but we can also provide it as second parameter

    var users = new Resource()
    users.fromArray([//array with users that we fetched],'email')

Now the users are stored by email inside the map.

We can always get the original array by calling the data field

    users.data = [//original array]

Remember that the function that pulls each value from the map is called only when we modify!
## API
**Resouse** exposed basic CRUD methods:

### GET

```
resouce.get(id)
```

### ADD

    resource.add(newEl)
    
Resuorce will try to store it using a default key='id', if you want to provide a custom key field:

    resource.add(newEl,<customFieldToStoreIt>)

Example:

```
const user = {id:1, email:"simba@mufasa.kingLion"}

const resource = new Resource()
resource.add(user) // user is stored by id
resource.add(user,'email') // user is store by email

```



### REMOVE
    resouce.remove(id)
    
If you want to remove multiple elements:

    resource.removeMultiple([id1,id2...]) 


### UPDATE
    resource.update(oldElement,{...newFields}) //update only the new fiedls


### DATA
To get the original data in array for just call `.data`

```
resource.data // [//original data]
```

## Example
I have provided an example with Vue + Flue (a state managment library that I wrote) and Resource. You can find it here:
[users wall](https://francescosaveriozuppichini.github.io/resourse-users-wall-example/)

If you open the console you can see the classic redux-logger. If you want to know more about Flue: [https://medium.com/@FrancescoZ/flue-another-flux-library-82ff43f70899](https://medium.com/@FrancescoZ/flue-another-flux-library-82ff43f70899)

The interesting part is there in the code of the UserStore:

[https://francescosaveriozuppichini.github.io/resource-users-wall-example/](https://francescosaveriozuppichini.github.io/resource-users-wall-example/)

You can see how easy is to create a resource from some real world data. We fist dispatch an action:

    axios.get('[https://randomuser.me/api/?results=12')
    .then(data](https://randomuser.me/api/?results=12').then(data) => ctx.dispatchAction('GET_USERS_SUCCESS', data))

And then

    reduce(action) {
        this.reduceMap(action, { GET_USERS_SUCCESS: this.onGetUsersSuccess })
      }

    onGetUsersSuccess({data}) {
        this.state.users.fromArray(data.results, 'email')
      }

Of course this.state.users is a resource instance.
