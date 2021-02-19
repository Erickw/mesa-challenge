# Mesa Challenge

Simple API with authorization and authentication (firebase based), to add and get users, places add by users and places comments and ratings

## Getting Started

To run the project properly you will need clone it and install the dependencies as describe below

### Prerequisites

- NodeJS (v6.9.0 or higher)

### Installing

On project directory (functions folder), execute `npm install` it will install all necessary dependencies. After it, update your `env file` properly (it already at repository only for evaluation purpose). 

### Running

To run locally `firebase serves -p 5001` (or another port of your choice) and you can access at:
`http://localhost: 5001/challenge table/us-central1/api` the routes described below. Remember to generate
a new Bearer token from sessions endpoint after create a new user, otherwise you can't access the 
auth requiered endpoints.

### Routes

#### Session

`GET` https://us-central1-mesachallenge.cloudfunctions.net/api/sessions

#### Users

`GET` https://us-central1-mesachallenge.cloudfunctions.net/api/users/ </br>
`POST` https://us-central1-mesachallenge.cloudfunctions.net/api/users/ </br>
`PUT` https://us-central1-mesachallenge.cloudfunctions.net/api/users/:id </br>
`DELETE` https://us-central1-mesachallenge.cloudfunctions.net/api/users/:id </br>

Body example for POST request:

```
  {
    "name": "NameTest",
    "email": "mail@mail.com",
    "password": "0934182"
  }
```

#### Profile

`GET` https://us-central1-mesachallenge.cloudfunctions.net/api/profile/:id

#### Places

`GET` https://us-central1-mesachallenge.cloudfunctions.net/api/places/ (List mode) </br>
`POST` https://us-central1-mesachallenge.cloudfunctions.net/api/places/ </br>
`DELETE` https://us-central1-mesachallenge.cloudfunctions.net/api/places/:id </br>

Body example for POST request:

```
  {
    "name": "PlaceExample",
    "userId": "45NCF45ON",
    "references": [{"name": "PlaceD", "distance": 6}, {"name": "PlaceC", "distance": 1}]
  }
```

#### Ratings

`GET` https://us-central1-mesachallenge.cloudfunctions.net/api/ratings/place/:id/ </br>
`POST` https://us-central1-mesachallenge.cloudfunctions.net/api/ratings/place/:id/ </br>
`DELETE` https://us-central1-mesachallenge.cloudfunctions.net/api/ratings/ </br>

Body example for POST request id parameter at URL reference the place id:

```
  {
    "score": "5",
    "userId": "37YX34LS"
  }
```

Body example for delete request:

```
  {
		"placeId": "hiC8is1Y32RTMyECQLB8",
		"ratingId": "71YD70GE3"
  }
```

#### Comments

`GET` https://us-central1-mesachallenge.cloudfunctions.net/api/comments/place/:id </br>
`POST` https://us-central1-mesachallenge.cloudfunctions.net/api/comments/place/:id </br>
`DELETE` https://us-central1-mesachallenge.cloudfunctions.net/api/comments/ </br>

Body example for POST request id parameter at URL reference the place id:

```
  {
    "message": "Example Message!",
    "userId": "08KT08XCT3"
  }
```

Body example for delete request:

```
  {
		"placeId": "hiC8is1Y32RTMyECQLB8",
		"commentId": "71YD70GE3"
  }
```

#### Map Mode View

`GET` https://us-central1-mesachallenge.cloudfunctions.net/api/map/:id

Id is the reference place

### Deployment

The project was built using google's firebase environment, after changes just execute `firebase deploy` and it will be build and deployed.

#### Versioning

We use [Github](http://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/mesa-challenge).

#### Authors

* **[Erick Machado](https://github.com/Erickw)**


#### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


