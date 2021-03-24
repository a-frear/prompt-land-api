# Prompt Land API

# Summary

Write and share artists prompts.
Discover prompts for various mediums.
Follow other artists.

# API Documentation

This API uses GET and POST requests to communicate and HTTP response codes to indenticate status and errors. All responses come in standard JSON. All requests must include a content-type of application/json and the body must be valid JSON.

For POST requests, tokens are required from client side [Auth0](https://auth0.github.io/auth0.js/index.html) login.

# URL

https://shielded-inlet-60576.herokuapp.com/api

# Method:

GET /prompts

# Sample Call:

> fetch(url + '/prompts', {
> method: "GET",
> headers: {
> "content-type": "application/json",
> },
> })

# Success Response:

> Code: 200
>
> Content: [
> >{
> >"id": 1,
> >"username": "h.filbourn",
> >"prompt": "go outside and do a subtle dance",
> >"modified": (date prompt was created)
> }
> ]

# Method:

GET /followers

Gets a list of all followers and their followees

# Sample Call

> fetch(url + '/followers', {
> method: "GET",
> headers: {
> "content-type": "application/json",
> },
> })

# Success Response:

> Code: 200
>
> Content: [
> {
> "id": 1,
> "username": "h.filbourn",
> "followee": "writer89",
> },
> {
> "id": 2,
> "username": "writer89",
> "followee": "freamy",
> },
>
> > "id": 2,
> > "username": "freamy",
> > "followee": "writer89",
> > },
> > ]

# Method:

GET /followers/follower/:id

Gets a list of all followees of a specific follower(:id)

# Sample Call

> fetch(url + '/followers/follower/:id', {
> method: "GET",
> headers: {
> "content-type": "application/json",
> },
> })

# Success Response:

> Code: 200
>
> Content: [
> {
> "id": 1,
> "username": "h.filbourn",
> "followee": "writer89",
> },
> {
> "id": 2,
> "username": "h.filbourn",
> "followee": "freamy",
> },
>
> > "id": 2,
> > "username": "h.filbourn",
> > "followee": "movie_lover17",
> > },
> > ]

# Method:

GET /:tag_id

Find a tag by id

# Sample Call

> fetch(url + '/tag/:id', {
> method: "GET",
> headers: {
> "content-type": "application/json",
> },
> })

# Success Response:

> Code: 200
>
> Content: [
> >{
> >"id": 1,
> >"tag_title": "poetry"
> >}
> >]

# Method:

GET /:tag_id

Find a tag by id

# Sample Call

> fetch(url + '/tag/:id', {
> method: "GET",
> headers: {
> "content-type": "application/json",
> },
> })

# Success Response:

> Code: 200
>
> Content: [
> >{
> >"id": 1,
> >"tag_title": "poetry"
> >}
> >]

# Method:

POST /followers

Used for following a new followee.

# Sample Call

> const newFollowing = {
> "username": "h_filbourn",
> "followee": "writer89",
> };
>
> fetch(url + '/followers', {
> method: "POST",
> headers: {
> "content-type": "application/json",
> Authorization: `Bearer ${token}`,
> },
> body: JSON.stringify(newFollowing),
> })

# Success Response:

> Code: 201

# Errors:

> Code: 400
>
> Message: 'Missing <key> in request body'

# Method:

POST /tags

Used for assigning a tag to a post.

# Sample Call

> const newFollowing = {
> "tag_id": "1",
> "prompt_id": "1",
> };
>
> fetch(url + '/tags' {
> method: "POST",
> headers: {
> "content-type": "application/json",
> },
> body: JSON.stringify(newFollowing),
> })

# Success Response:

> Code: 200

# Errors:

> Code: 400
>
> Message: 'Missing <key> in request body'

# Method:

DELETE /followers

Used for unfollowing followees

# Sample Call

> fetch(url + './followers', {
> method: "DELETE",
> headers: {
> "content-type": "application/json",
> }
> })

# Success Response:

> Code: 204

# Built with:

Node

Express

PostgreSQL

# Example of use:

https://prompt-land.com

# Client repo:

https://github.com/a-frear/prompt-land
