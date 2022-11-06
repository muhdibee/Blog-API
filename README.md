# Blog-API
This is an api for a Blog App

---

## Requirements
1. Users should have a first_name, last_name, email, password.
2. A user should be able to sign up and sign in into the blog app.
3. Use JWT as authentication strategy and expire the token after 1 hour.
4. A blog can be in two states; draft and published.
5. Logged in and not logged in users should be able to get a list of published blogs created.
6. Logged in and not logged in users should be able to to get a published blog.
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state.
9. The owner of the blog should be able to update the state of the blog to published.
10. The owner of a blog should be able to edit the blog in draft or published state.
11. The owner of the blog should be able to delete the blog in draft or published state.
12. The owner of the blog should be able to get a list of their blogs. 
  - The endpoint should be paginated.
  - It should be filterable by state.
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
  - default it to 20 blogs per page. 
  - It should also be searchable by author, title and tags.
  - It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.
17. Write tests for all endpoints

---

**Note:**
The owner of the blog/article should be logged in to perform actions.

---

## Base URL
- somehostsite.com

---

## Models

### User

|     Field        | Data_type    | Constraints     |
|------------------|--------------|-----------------|
| email            | String       | Required, unique|
| first_name       | String       | Required        |
| last_name        | String       | Required        |
| password         | String       | Required        |
| user_type        | String       | Required, default: user, enum:['user', 'admin'] |
| timestamp        | Date         | optional        |
| updated_at       | Date         | optional        |

### Article

|     Field        | Data_type    | Constraints          |
|------------------|--------------|----------------------|
| title            | String       | Required, unique     |
| description      | String       | Required, unique     |
| body             | String       | Required             |
| author           | String       | optional             |
| state            | String       | optional, default: draft, enum:['draft', 'published'] |
| read_count       | Number       | optional             |
| reading_time     | Number       | optional             |
| tags             | Array        | optional, default: []|
| timestamp        | Date         | optional, default: Date.now()|
| updated_at       | Date         | optional  default: Date.now()|

---
## APIs

### Home
- Route: /
- Method: GET

- Response:

**success**

```
{
  "status": true,
  "message": "Welcome to Blog-API."
}
```

### Signup User
- Route: /api/signup
- Method: POST
- Body: 
```
{
  "email": "muhammad.gmail.com",
  "first_name": "muhammad",
  "last_name": "ibrahim",
  "password": "muhammad12345",
  "user_type": "admin"
}
```

- Response:

**Success**

```
{
  "status": true,
  "_id": "6365b8b3a11fc33b9421004f",
  "email": "muhammad.gmail.com",
  "first_name": "muhammad",
  "last_name": "ibrahim",
  "user_type": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1YjhiM2ExMWZjMzNiOTQyMTAwNGYiLCJlbWFpbCI6Im11c2EuZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6Im11c2EiLCJsYXN0X25hbWUiOiJpYnJhaGltIiwidXNlcl90eXBlIjoiYWRtaW4iLCJpYXQiOjE2Njc2MTA4MDMsImV4cCI6MTY2NzYxNDQwM30.mCz_l41_vaFUloe_2ZxplPtJ4uVcE-xp2yJfRSxs_SA"
}
```

### Login User
- Route: /api/login
- Method: POST
- Body: 
```
{
  "email": "muhammad@gmail.com",
  "password": "muhammad12345"
}
```

- Response:

**Success**

```
{
  "status": true,
  "_id": "6365b871a11fc33b9421004d",
  "email": "muhammad@gmail.com",
  "user_type": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1Yjg3MWExMWZjMzNiOTQyMTAwNGQiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb2UiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzQ2NTA2LCJleHAiOjE2Njc3NTAxMDZ9.WN9yrM1qA_L-1qk5-RSFNyR7pRoMAT5LMtqbFzvsO80"
}
```

### GET articles
- Route: /api/articles
- Method: GET

- Response:

**success**

```
{
  "status": true,
  "articles": [
    {
      "_id": "636699cdaa3e4ce035c154e1",
      "title": "How Much Math Do You Need to Become a Data Scientist?",
      "description": "Data Science is a large field that requires vast expertise and being at a beginner’s level, that’s a fair question to ask “How much maths is required to become a Data Scientist?”  or “How much do you need to know in Data Science?",
      "body": "The point is when you’ll be working on solving real-life problems, you’ll be required to work on a wide scale and that would certainly need to have clear concepts of Mathematics. The pillar of acing mathematics withholds 4 pillars that can help you to start from scratch and will definitely help you in getting a job in the field of Data Science. These 4 pillars that you’ll be learning need to be applied inside which means you need to also learn how and where to program those mathematics algorithms while working on the system. The very first skill that you need to master in Mathematics is Linear Algebra, following which Statistics, Calculus, etc. come into play. We will be providing you with a structure of Mathematics that you need to learn to become a successful Data Scientist.",
      "author": "john@gmail.com",
      "state": "published",
      "read_count": 3,
      "reading_time": 1,
      "tags": [
        "Tech",
        "data-sceince"
      ],
      "timestamp": "2022-11-05T17:13:49.716Z",
      "updated_at": "2022-11-05T17:13:49.719Z",
      "__v": 0
    },
    {
      "_id": "636790adaa3e4ce035c154ed",
      "title": "How to Get a Job in IT",
      "description": "Everyone knows that mainly after the global pandemic the entire scenario of jobs and businesses across the world has significantly changed?",
      "body": "We’ve seen various unwanted situations like layoffs, lack of job openings, salary-cut, etc. around us. However, the IT industry is one of those few sectors that is still providing numerous career opportunities to individuals and looking very much resilient in terms of growing & generating employment opportunities in the future. And that’s perhaps the reason that a majority of individuals are looking forward to breaking into the IT field. Let’s take a look at the below-mentioned numbers for more clarification:",
      "author": "musa@gmail.com",
      "state": "published",
      "read_count": 15,
      "reading_time": 1,
      "tags": [
        "Tech",
        "Career-Advices"
      ],
      "timestamp": "2022-11-06T10:47:09.538Z",
      "updated_at": "2022-11-06T10:47:09.539Z",
      "__v": 0
    },
    {
      "_id": "63679ccf0ad471de229709f4",
      "title": "How to Start a Successful Blog in 2022.",
      "description": "Learn how to start a blog in less than an hour",
      "body": "Want to create something meaningful? Why not start a blog? Why not become a blogger? Creating this blog is one of the best decisions Ryan and I ever made. After all, our blog is how we earn a living. More important, it’s how we add value to other people’s lives. So you’re thinking about starting a blog, but you don’t have any idea where to start, right? Guess what—neither did we! Before we became “The Minimalists,” we wanted to start a blog to communicate our thoughts and express our feelings, but we were overwhelmed with options. Clueless, confused, and confounded with choices, we had no idea how to start a blog or how to be a blogger. When should we start? How do we register a domain name? What is hosting? Which blogging platform should we use? How do we choose a blog theme? What is a plugin? What should we write about? Heck, we could hardly spell HTML, let alone build a blog! But good news: it turns out that starting a blog is much easier than you think. We’ve learned a ton of lessons during our ascent to millions of readers, and now you can learn from our pain and suffering to avoid much of the tedium involved in setting up a blog.",
      "author": "musa@gmail.com",
      "state": "published",
      "read_count": 5,
      "reading_time": 2,
      "tags": [
        "Blog",
        "Career-Advices"
      ],
      "timestamp": "2022-11-06T11:38:55.271Z",
      "updated_at": "2022-11-06T11:38:55.273Z",
      "__v": 0
    }
  ]
}
```

### GET a single article
- Route: /articles/636790adaa3e4ce035c154ed
- Method: GET

- Response:

**success**

```
{
  "status": true,
  "article": {
    "_id": "636790adaa3e4ce035c154ed",
    "title": "How to Get a Job in IT",
    "description": "Everyone knows that mainly after the global pandemic the entire scenario of jobs and businesses across the world has significantly changed?",
    "body": "We’ve seen various unwanted situations like layoffs, lack of job openings, salary-cut, etc. around us. However, the IT industry is one of those few sectors that is still providing numerous career opportunities to individuals and looking very much resilient in terms of growing & generating employment opportunities in the future. And that’s perhaps the reason that a majority of individuals are looking forward to breaking into the IT field. Let’s take a look at the below-mentioned numbers for more clarification:",
    "author": "musa@gmail.com",
    "state": "published",
    "read_count": 15,
    "reading_time": 1,
    "tags": [
      "Tech",
      "Career-Advices"
    ],
    "timestamp": "2022-11-06T10:47:09.538Z",
    "updated_at": "2022-11-06T10:47:09.539Z",
    "__v": 0
  }
}
```

### GET author's articles
- Route: /articles/user_articles
- Method: GET
- Headers.x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1Yjg3MWExMWZjMzNiOTQyMTAwNGQiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb2UiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzY4MjEzLCJleHAiOjE2Njc3NzE4MTN9.wUhR6ZMWCNhyzFwm87Buhwf5NSx_yFeQPY2NkwKu4V0

- Response:

**success**

```
{
  "status": true,
  "articles": [
    {
      "_id": "636699cdaa3e4ce035c154e1",
      "title": "How Much Math Do You Need to Become a Data Scientist?",
      "description": "Data Science is a large field that requires vast expertise and being at a beginner’s level, that’s a fair question to ask “How much maths is required to become a Data Scientist?”  or “How much do you need to know in Data Science?",
      "body": "The point is when you’ll be working on solving real-life problems, you’ll be required to work on a wide scale and that would certainly need to have clear concepts of Mathematics. The pillar of acing mathematics withholds 4 pillars that can help you to start from scratch and will definitely help you in getting a job in the field of Data Science.",
      "author": "john@gmail.com",
      "state": "published",
      "read_count": 3,
      "reading_time": 1,
      "tags": [
        "Tech",
        "data-sceince"
      ],
      "timestamp": "2022-11-05T17:13:49.716Z",
      "updated_at": "2022-11-05T17:13:49.719Z",
      "__v": 0
    },
    {
      "_id": "63679fbc0ad471de229709f7",
      "title": "6 Steps to Become a Millionaire",
      "description": "You Don’t Need a High-Paying Job or Family Money",
      "body": "You don't need a six-figure job or family money to become a millionaire. Instead, you need to start saving early and be mindful of every dollar you spend. Here are some tips for building that million you need to retire in style or to retire early.  1. Start Saving Early:  The easiest way to build your savings is to start early. Doing so lets you take advantage of the power of compounding. Say you're 20 years old. If you contribute $6,000 to an individual retirement account (IRA) every year ($500 a month) for 40 years, your total investment would be $240,000. But because of the power of compounding, your investment would grow to more than $1.37 million, assuming a 7% return. And you'd be a millionaire by age 57, just by saving $500 a month.  2. Avoid Unnecessary Spending and Debt Stop buying things you don't need. Before you tap your card, ask yourself the following:Is this something I really need? Do I have something similar already? Do I want this more than I want to become a millionaire? Every dollar you spend on something you don't need is one less dollar you can invest. Here's a reality check. If you invest an extra $25 a week for those same 40 years, you would end up with an additional $277,693. Can you cut $25 of unnecessary spending out of your weekly budget? Maybe, maybe not. But if you can, it will go a long way toward helping you reach your goal. 3. Save 15% of Your Income—or More:  The personal savings rate is the percentage of income left over after people spend money and pay taxes. That rate dropped to 7.3% in October 2021, according to data from the Bureau of Economic Analysis (BEA).",
      "author": "john@gmail.com",
      "state": "published",
      "read_count": 4,
      "reading_time": 2,
      "tags": [
        "Blog",
        "Career-Advices"
      ],
      "timestamp": "2022-11-06T11:51:24.315Z",
      "updated_at": "2022-11-06T11:51:24.315Z",
      "__v": 0
    },
    {
      "_id": "6367a02c0ad471de229709f9",
      "title": "6 Steps updated 2",
      "description": "Updated You Don’t Need a High-Paying Job",
      "body": "You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000.",
      "author": "john@gmail.com",
      "read_count": 3,
      "reading_time": 1,
      "tags": [
        "Blog",
        "Career-Advices"
      ],
      "timestamp": "2022-11-06T11:53:16.341Z",
      "updated_at": "2022-11-06T12:11:37.445Z",
      "__v": 0,
      "state": "published"
    }
  ]
}
```

### GET author's articles filtered by state
- Route: /articles/user_articles?state=published
- Method: GET
- Headers.x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1Yjg3MWExMWZjMzNiOTQyMTAwNGQiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb2UiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzY4MjEzLCJleHAiOjE2Njc3NzE4MTN9.wUhR6ZMWCNhyzFwm87Buhwf5NSx_yFeQPY2NkwKu4V0

- Response:

**success**

```
{
  "status": true,
  "articles": [
    {
      "_id": "636699cdaa3e4ce035c154e1",
      "title": "How Much Math Do You Need to Become a Data Scientist?",
      "description": "Data Science is a large field that requires vast expertise and being at a beginner’s level, that’s a fair question to ask “How much maths is required to become a Data Scientist?”  or “How much do you need to know in Data Science?",
      "body": "The point is when you’ll be working on solving real-life problems, you’ll be required to work on a wide scale and that would certainly need to have clear concepts of Mathematics. The pillar of acing mathematics withholds 4 pillars that can help you to start from scratch and will definitely help you in getting a job in the field of Data Science. These 4 pillars that you’ll be learning need to be applied inside which means you need to also learn how and where to program those mathematics algorithms while working on the system. The very first skill that you need to master in Mathematics is Linear Algebra, following which Statistics, Calculus, etc. come into play. We will be providing you with a structure of Mathematics that you need to learn to become a successful Data Scientist.",
      "author": "john@gmail.com",
      "state": "published",
      "read_count": 3,
      "reading_time": 1,
      "tags": [
        "Tech",
        "data-sceince"
      ],
      "timestamp": "2022-11-05T17:13:49.716Z",
      "updated_at": "2022-11-05T17:13:49.719Z",
      "__v": 0
    }
    {
      "_id": "6367a02c0ad471de229709f9",
      "title": "6 Steps updated 2",
      "description": "Updated You Don’t Need a High-Paying Job",
      "body": "You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000.",
      "author": "john@gmail.com",
      "read_count": 3,
      "reading_time": 1,
      "tags": [
        "Blog",
        "Career-Advices"
      ],
      "timestamp": "2022-11-06T11:53:16.341Z",
      "updated_at": "2022-11-06T12:11:37.445Z",
      "__v": 0,
      "state": "published"
    }
  ]
}
```

### Upload an article
- Route: /articles
- Method: POST
- Headers.x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1Yjg3MWExMWZjMzNiOTQyMTAwNGQiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb2UiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzY4MjEzLCJleHAiOjE2Njc3NzE4MTN9.wUhR6ZMWCNhyzFwm87Buhwf5NSx_yFeQPY2NkwKu4V0


- Body: 

```
{
  "title": "6 Steps to become rich",
  "description": "You Don’t Need a High-Paying Job",
  "body": "You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000. "
  "tags": [
    "Blog",
    "Career-Advices"
  ]
}
```

- Response:

**success**

```
{
  "status": true,
  "article": {
    "state": "draft",
    "_id": "6367a02c0ad471de229709f9",
    "title": "6 Steps to become rich",
    "description": "You Don’t Need a High-Paying Job",
    "body": "You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000.",
    "author": "john@gmail.com",
    "read_count": 0,
    "reading_time": 1,
    "tags": [
      "Blog",
      "Career-Advices"
    ],
    "timestamp": "2022-11-06T11:53:16.341Z",
    "updated_at": "2022-11-06T12:11:37.445Z",
    "__v": 0
  }
}
```

### Update an article
- Route: /articles/6367a02c0ad471de229709f9
- Method: PUT
- Headers.x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1Yjg3MWExMWZjMzNiOTQyMTAwNGQiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb2UiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzY4MjEzLCJleHAiOjE2Njc3NzE4MTN9.wUhR6ZMWCNhyzFwm87Buhwf5NSx_yFeQPY2NkwKu4V0

- Body:

```
{
  "title": "6 Steps to become rich updated",
  "description": "Updated: You Don’t Need a High-Paying Job",
  "body": "updated: You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000. ",
  "state": "published",
  "tags": [
    "Blog",
    "Career-Advices"
  ]
}

```
- Response:

**success**

```
{
  "status": true,
  "article": {
    "state": "published",
    "_id": "6367a02c0ad471de229709f9",
    "title": "6 Steps to become rich updated",
    "description": "Updated: You Don’t Need a High-Paying Job",
    "body": "updated: You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000.",
    "author": "john@gmail.com",
    "read_count": 4,
    "reading_time": 1,
    "tags": [
      "Blog",
      "Career-Advices"
    ],
    "timestamp": "2022-11-06T11:53:16.341Z",
    "updated_at": "2022-11-06T12:11:37.445Z",
    "__v": 0
  }
}
```

### Change the state of an article 
- Route: /articles/6367a02c0ad471de229709f9
- Method: PATCH
- Headers.x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1Yjg3MWExMWZjMzNiOTQyMTAwNGQiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb2UiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzY4MjEzLCJleHAiOjE2Njc3NzE4MTN9.wUhR6ZMWCNhyzFwm87Buhwf5NSx_yFeQPY2NkwKu4V0

- Body:

```
{
  "state": "published"
 }
```

- Response: 

**success**

```
{
  "status": true,
  "article": {
    "_id": "6367a02c0ad471de229709f9",
    "title": "6 Steps updated 2",
    "description": "Updated You Don’t Need a High-Paying Job",
    "body": "You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000.",
    "author": "john@gmail.com",
    "read_count": 4,
    "reading_time": 1,
    "tags": [
      "Blog",
      "Career-Advices"
    ],
    "timestamp": "2022-11-06T11:53:16.341Z",
    "updated_at": "2022-11-06T12:11:37.445Z",
    "__v": 0,
    "state": "published"
  }
}
```

### Delete an article 
- Route: /articles/6367a02c0ad471de229709f9
- Method: DELETE
- Headers.x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY1Yjg3MWExMWZjMzNiOTQyMTAwNGQiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImpvaG4iLCJsYXN0X25hbWUiOiJkb2UiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzY4MjEzLCJleHAiOjE2Njc3NzE4MTN9.wUhR6ZMWCNhyzFwm87Buhwf5NSx_yFeQPY2NkwKu4V0

- Response: 

**success**

```
{
  "status": true,
  "article_deleted": {
    "_id": "6367a02c0ad471de229709f9",
    "title": "6 Steps updated 2",
    "description": "Updated You Don’t Need a High-Paying Job",
    "body": "You don't need a six-figure job or family money to become a millionaire. Instead,  years, your total investment would be $240,000.",
    "author": "john@gmail.com",
    "read_count": 4,
    "reading_time": 1,
    "tags": [
      "Blog",
      "Career-Advices"
    ],
    "timestamp": "2022-11-06T11:53:16.341Z",
    "updated_at": "2022-11-06T12:11:37.445Z",
    "__v": 0,
    "state": "published"
  }
}
``

