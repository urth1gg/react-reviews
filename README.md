## Using the Reviews Component

To use the `Reviews` component in your project:

1. Import the `Reviews` component:
   ```tsx
   import { Reviews } from './components/Reviews';
   ```

2. Provide the required props:
   - `reviews`: An array of review objects. Each object should include properties like `id`, `author`, `rating`, `comment`, `date`, and optionally `productName` and `images`.
   - Optional props:
     - `pathToIcon`: A custom path to the star icon used for ratings.
     - `onSubmit`: A callback function to handle new review submissions.
     - `classNameReview`: Custom CSS class for individual review components.
     - `classNameContainer`: Custom CSS class for the main container.
     - `classNameReviewsContainer`: Custom CSS class for the reviews list container.
     - `noReviewsText`: Text to display when there are no reviews.
     - `sectionTitleText`: Title text for the reviews section.
     - `addReviewButtonText`: Text for the "Add Review" button.
     - `commentText`, `ratingText`, `authorText`, `imagesText`, `submitText`: Custom labels for the review form fields.
     - `onReadMoreClick`: A callback function triggered when the "Read More" button is clicked for long comments.

3. Example usage:
   ```tsx
   import React from 'react';
   import { Reviews } from './components/Reviews';

   const App = () => {
       const reviews = [
           {
               id: 1,
               author: 'John Doe',
               rating: 5,
               comment: 'Excellent product!',
               date: '2023-10-01',
               productName: 'Product A',
               images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
           },
           {
               id: 2,
               author: 'Jane Smith',
               rating: 4,
               comment: 'Very good, but could be improved.',
               date: '2023-10-02',
           },
       ];

       const handleReviewSubmit = (review) => {
           console.log('New review submitted:', review);
       };

       return (
           <div>
               <h1>Product Reviews</h1>
               <Reviews
                   reviews={reviews}
                   pathToIcon="/assets/custom-star.svg"
                   onSubmit={handleReviewSubmit}
                   classNameContainer="custom-container"
                   classNameReview="custom-review"
                   noReviewsText="Be the first to leave a review!"
                   sectionTitleText="Customer Feedback"
                   addReviewButtonText="Write a Review"
                   commentText="Your Comment"
                   ratingText="Your Rating"
                   authorText="Your Name"
                   imagesText="Upload Images"
                   submitText="Post Review"
                   onReadMoreClick={(comment) => alert(comment)}
               />
           </div>
       );
   };

   export default App;
   ```

4. Customizing the Review Component:
   - You can override the default review rendering by providing a custom `_ReviewComponent` prop. For example:
     ```tsx
     const CustomReviewComponent = ({ review }) => (
         <div className="custom-review">
             <h3>{review.author}</h3>
             <p>{review.comment}</p>
             <p>Rating: {review.rating}</p>
         </div>
     );

     <Reviews
         reviews={reviews}
         _ReviewComponent={CustomReviewComponent}
     />
     ```

5. Handling Long Comments:
   - Use the `onReadMoreClick` prop to handle "Read More" actions for long comments. For example:
     ```tsx
     <Reviews
         reviews={reviews}
         onReadMoreClick={(comment) => console.log('Full comment:', comment)}
     />
     ```

6. Adding Images to Reviews:
   - The `images` property in each review object can be an array of image URLs or `File` objects. These images will be displayed in the review component.

7. Styling:
   - Use the `classNameContainer`, `classNameReview`, and `classNameReviewsContainer` props to apply custom styles to the component.

8. Responsive Behavior:
   - The `Reviews` component automatically adjusts the number of visible reviews based on the container width. You can customize the behavior further by modifying the component code if needed.