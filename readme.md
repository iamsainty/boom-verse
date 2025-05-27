# Boom Verse

**Boom Verse** is a dynamic video-sharing platform where creators can upload both short and long videos. Users can purchase premium content, send gifts, and drop comments. Built with a modern tech stack, Boom Verse offers a smooth experience for both content creators and viewers.

---

## Tech Stack

### Frontend
- React  
- Vite  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (Mongoose)  

### Cloud Storage
- AWS S3  

### Authentication
- JWT (JSON Web Tokens)  

---

## .env Configuration

Create a .env file at the root of your backend and include the following variables:

```

MONGO\_URI=your\_mongodb\_connection\_string
JWT\_SECRET=your\_jwt\_secret\_key
AWS\_ACCESS\_KEY\_BOOM=your\_aws\_access\_key
AWS\_SECRET\_ACCESS\_KEY=your\_aws\_secret\_key
AWS\_REGION=your\_aws\_region
AWS\_BUCKET\_NAME=your\_s3\_bucket\_name

````

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/boom-verse.git
cd boom-verse
````

### 2. Set Up the Backend

```bash
cd server
npm install
```

Add your `.env` file in the `server` folder and then run:

```bash
npm run dev
```

This will start your backend on [http://localhost:5000](http://localhost:5000).

### 3. Set Up the Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## API Documentation

### Auth Routes

#### `POST /api/auth/register`

Registers a new user.

**Body:**

```json
{
  "name": "Your Name",
  "username": "yourusername",
  "password": "yourpassword"
}
```

**Returns:** JWT token and success message.

---

#### `POST /api/auth/login`

Logs in an existing user.

**Body:**

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

**Returns:** JWT token and success message.

---

#### `GET /api/auth/profile`

Gets the profile of the logged-in user.
**Requires:** JWT token in headers.

---

### Video Routes

#### `POST /api/videos/upload`

Upload a new video.

**Form Data:**

* `title`
* `description`
* `videoType` (short or long)
* `isPaid` (true or false)
* `price` (if `isPaid` is true)
* `videoUrl` (for long videos)
* `videoFile` (file - required for short videos)
* `thumbnail` (file - required for long videos)

**Requires:** JWT token in headers.

---

#### `GET /api/videos/getvideos/:page`

Get videos by page (pagination).
Each page returns 5 videos sorted by creation time (latest first).

---

#### `POST /api/videos/purchase`

Purchase a paid video.

**Body:**

```json
{
  "videoId": "video_id_here"
}
```

**Requires:** JWT token. Deducts balance and adds video to user’s purchased list.

---

#### `POST /api/videos/comment`

Comment on a video.

**Body:**

```json
{
  "videoId": "video_id_here",
  "comment": "Nice video!"
}
```

**Requires:** JWT token.

---

#### `POST /api/videos/gift`

Send a gift to a video creator.

**Body:**

```json
{
  "videoId": "video_id_here",
  "amount": 100,
  "comment": "You're awesome!"
}
```

**Requires:** JWT token. Deducts amount from user balance and saves as a gift entry.

---

## Features

* Register and login with secure hashed passwords
* Upload short or long videos (with S3 storage)
* Paid videos and balance management
* Comment system on videos
* Send gifts to creators with optional messages
* Pagination for video feeds

---

## Contributing

Feel free to fork the repo, submit PRs, or open issues.
If you have feature ideas or want to collaborate, reach out!

---

## License

This project is for learning and demo purposes. Feel free to build on top of it.

---

```

Let me know if you want this saved as a file or converted into a `README.md`.
```