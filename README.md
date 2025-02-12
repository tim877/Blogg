# Blog Application

This project is a simple, interactive blog platform built with Angular, where users can view, like, comment on blog posts, and owners can create new blog posts. The application uses `localStorage` to persist data across sessions, ensuring blog posts and comments are saved even when the page is reloaded. This README provides an overview of the application’s features and how it works.

## Features

### 1. **Home Page**

- The home page displays a list of all blog posts.
- Each post includes:
  - **Title**: The title of the blog post.
  - **Image**: An optional image associated with the post.
  - **Publish Date**: The date when the post was created.
  - **Likes/Dislikes**: A like and dislike button that allows users to express their opinion on the post.
  - **Comments**: The ability to see and add comments on each post.
- Clicking on a post title will redirect the user to the individual blog post detail page.

### 2. **Blog Post Detail Page**

- Displays the full content of an individual blog post.
- **Likes/Dislikes**: Users can increase/decrease the like or dislike count for the post.
- **Comment Section**: Users can add comments to the post, with comments stored in the post's data.

### 3. **Owner View**

- The owner of the blog has a special view where they can create new posts.
- Clicking on a **"Create New Post"** button opens a modal window where the owner can enter:
  - **Title**: Title of the new post.
  - **Content**: Main content of the blog post.
  - **Image**: (Optional) Image associated with the post.
- Once the form is submitted, the new post is saved to `localStorage` and appears on the home page.

### 4. **About Page**

- A simple static page that provides information about the blog or the creator.

### 5. **Comment System**

- Users can post comments on individual blog posts.
- The comments are stored as part of each individual post's data and are saved in `localStorage`.
- Comments persist even after refreshing the page.

### 6. **Modal System for Creating Posts**

- The application uses a modal for creating new posts, allowing the owner to enter the post's title, content, and image.
- The modal visibility is managed using a service (`ModalService`), ensuring the modal is displayed when the owner wants to create a post and hidden after submission.

## Data Flow and Persistence

### Local Storage

- The application stores all blog posts and comments in the browser's `localStorage`, allowing data to persist even after the page is refreshed or closed.
- `localStorage` is used to save:
  - **Blog Posts**: An array of blog post objects, each containing its details (id, title, content, date, likes, dislikes, and comments).
  - **Comments**: Comments are stored as part of each individual post's data. When a comment is added, it's pushed to the post’s `comments` array.

### Managing Post Data

- **Creating a Post**: The owner uses a form inside a modal to create a new post. The form includes:
  - Title, content, and optional image URL.
  - Upon submission, a new post object is created and stored in `localStorage`.
- **Updating a Post**: Posts can be updated in `localStorage`. When a post is edited (e.g., when a like or dislike is clicked), the post is retrieved from `localStorage`, updated, and saved back.
- **Deleting a Post**: Although the current version doesn’t include post deletion, it can be added by removing the post from `localStorage` based on its ID.

### Modal Visibility

- The **ModalService** manages the state of the modal used for creating new posts. It uses an `RxJS BehaviorSubject` to toggle the modal's visibility state.
- When the owner clicks the **Create New Post** button, the service sets the modal's visibility to true, opening the modal.
- Once the post is submitted, the modal is hidden by setting the `BehaviorSubject` to false.

### User Interactions

- **Like/Dislike**: Users can click the like or dislike button to upvote or downvote posts. The count of likes and dislikes is updated in `localStorage` and reflects immediately on the page.
- **Commenting**: Users can type comments into a text area and click **Post Comment**. The new comment is added to the post’s `comments` array in `localStorage`, and the post is re-rendered with the new comment.

## How It Works (Behind the Scenes)

1. **Routing**:

   - The app uses Angular's **lazy-loaded routes** to load the components only when needed. For example:
     - The **home page** component is lazy-loaded at the `/home` route.
     - The **individual blog post detail** is loaded dynamically using the post ID at `/blog/:id`.
     - The **about page** is loaded at `/about`.

2. **ModalService**:

   - A `BehaviorSubject` is used to track the visibility of the modal. When the owner clicks the **Create New Post** button, the service sets the modal's visibility to true, opening the modal.
   - Once the post is submitted, the modal is hidden by setting the `BehaviorSubject` to false.

3. **LocalStorage**:

   - All blog posts, including the title, content, image, likes, dislikes, and comments, are stored in `localStorage`. This allows data to persist across page reloads and sessions.
   - Each post is given a unique ID to differentiate between posts. When a post is created, the ID is generated using the current timestamp and a random number.
   - The comments for each post are stored in an array under the `comments` field of the respective blog post.

4. **Comment Management**:
   - When a user submits a new comment, the comment is added to the post's `comments` array in `localStorage`, and the post is re-rendered with the new comment.

## How to Use the Application

### Navigating the Pages

- **Home Page**: Displays a list of all posts. Click on a post title to view the full content of that post.
- **Blog Post Detail**: Shows the full content of a single post. You can like/dislike the post and add comments.
- **About Page**: Learn more about the app and its creator.

### Owner Features

- **Creating a Post**: The owner can click on **Create New Post** (which opens a modal), fill out the post’s title, content, and image, and then submit it to add a new post.
- **Editing a Post**: Editing a post’s likes/dislikes or comments is possible from the post detail page, and all changes are reflected in `localStorage`.
