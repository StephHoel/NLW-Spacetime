# Spacetime

This is a web and mobile application to record memories in a time capsule, where you can revisit as many times as you want to remember the most memorable moments of your life!

### Topics 

🔹 [Technologies used](#technologies-used)

🔹 [Features](#features)

🔹 [Screens WEB](#screens-web)

🔹 [API Doc](#api-doc)

🔹 [Devs](#devs)


## Technologies used
- Back-end: ReactJS, Typescript, Next.js
- DataBase: Prisma, SQLite
- Front-end: ReactJS, Typescript, Tailwindcss
- Mobile: ReactNative, Expo, Typescript

## Features

- [x] [WEB] Login with Github
- [x] [WEB] Record the memory with a date chooser 
- [x] [WEB] File (image or video) upload limit to 5MB (in client and in server)
- [x] [WEB] List memories by date
- [x] [WEB] Display memories details
- [x] [WEB] Possibility to share a public memory (details page)
- [x] [WEB] Edit a memory
- [x] [WEB] Delete a memory

- [x] [MOBILE] Login with Github
- [x] [MOBILE] Record the memory with current date
- [ ] [MOBILE] Record the memory with a date chooser 
- [ ] [MOBILE] File (image or video) upload limit to 5MB (in client and in server)
- [ ] [MOBILE] List memories by date
- [ ] [MOBILE] Display memories details <!-- In details page, include button for edit or delete the memory  -->
- [ ] [MOBILE] Possibility to share a public memory (details page)
- [ ] [MOBILE] Edit a memory
- [ ] [MOBILE] Delete a memory

## Screens WEB

#### Home without Login
<p align="center">
  <img src=".github/home_without_login.png" width="100%">
</p>

#### Home with Login and no memory
<p align="center">
  <img src=".github/home_with_login_and_no_memories.png" width="100%">
</p>

#### Home with Login and memories
<p align="center">
  <img src=".github/home_with_login_and_memories.png" width="100%">
</p>

#### New Memory without Image loaded
<p align="center">
  <img src=".github/new_memory_without_image.png" width="100%">
</p>

#### New Memory with Image loaded
<p align="center">
  <img src=".github/new_memory_with_image.png" width="100%">
</p>

#### Detail Memory without Image 
<p align="center">
  <img src=".github/details_memory_without_image.png" width="100%">
</p>

#### Detail Memory with Image 
<p align="center">
  <img src=".github/details_memory_with_image.png" width="100%">
</p>

#### Edit Memory without Image
<p align="center">
  <img src=".github/edit_memory_without_image.png" width="100%">
</p>

#### Edit Memory with Image
<p align="center">
  <img src=".github/edit_memory_with_image.png" width="100%">
</p>

#### Delete Memory
<p align="center">
  <img src=".github/delete_memory.png" width="100%">
</p>

## API Doc

#### Paths

| Method | Path              | Definition           |
| ------ | ----------------- | -------------------- |
| POST   | `/register`       | Register a user      |
| POST   | `/upload`         | Upload a image/video |
| GET    | `/memories`       | Return all memories  |
| GET    | `/memories/${id}` | Return a memory      |
| POST   | `/memories`       | Create a memory      |
| PUT    | `/memories/${id}` | Update a memory      |
| DELETE | `/memories/${id}` | Delete a memory      |

#### Params

| Param | Type   | Definition            |
| ----- | ------ | --------------------- |
| `id`  | `UUID` | **NEEDED** Memory ID |

#### Schemas

| User      |                    |
| --------- | ------------------ |
| id        | string($uuid)      |
| github    | int                |
| name      | string             |
| login     | string             |
| avatarUrl | string             |
| createdAt | string($date-time) |
| updatedAt | string($date-time) |

| Memory     |                    |
| ---------- | ------------------ |
| id         | string($uuid)      |
| userId     | string($uuid)      |
| coverUrl   | string             |
| content    | string             |
| isPublic   | boolean            |
| dateMemory | string($date-time) |
| createdAt  | string($date-time) |
| updatedAt  | string($date-time) |

## Devs

- [Steph Hoel](https://www.github.com/StephHoel)
