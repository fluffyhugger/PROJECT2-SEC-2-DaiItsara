# DAIITSARA ComputerSpecBuilder Web Application

## Description
The DAIITSARA ComputerSpecBuilder CRUD Web Application is a tool designed to help users build customized computer specifications tailored to their needs. Whether for gaming, content creation, or general use, this application streamlines the process of selecting components for a computer build.

## CRUD
- **Create (Add) Spec:**

**Build PC Spec:**
The "Create" operation allows users to build a new PC specification by selecting various components like CPU, RAM, GPU, etc., from available options. Users can add components to their PC build, specify the quantity, and configure other relevant details such as price and specifications. Upon completing the selection, users can save the newly created PC specification to the database by clicking the "Build" or "Confirm" button. This action triggers the creation of a new record in the database representing the PC build.

- **Read (View) Spec:**

**View Spec Details:**
The "Read" operation enables users to view the details of existing PC specifications stored in the database. Users can navigate to a dedicated page or section where they can browse through a list of available PC builds or search for specific builds based on criteria like price, components, etc. Each PC specification is displayed with its detailed components, prices, and other relevant information, allowing users to assess the specifications before making further actions.

- **Update (Edit) Spec:**

**Edit Spec Details:**
The "Update" operation allows users to modify the details of an existing PC specification. Users can edit various attributes of the PC build, such as changing the components, updating prices, modifying quantities, or adjusting specifications based on their requirements. After making the desired changes, users can save the updated PC specification to the database by triggering the "Update" or "Save" action. This action updates the corresponding record in the database with the new information.

- **Delete Spec:**

**Delete Spec from Database:**
The "Delete" operation enables users to remove a PC specification from the database. Users can select a specific PC build they wish to delete and initiate the deletion process by clicking the "Delete" button or similar UI element. Upon confirmation, the application executes the deletion operation, removing the corresponding record from the database permanently. As a result, the deleted PC build is no longer accessible or visible to users within the application.

## BuildSpec

### Features
- **Dynamic Data Fetching**: The application fetches data from a server in real-time based on what the user selects, without blocking the user interface.
- **Component Interaction**: It uses specific components to display items and manage the cart, ensuring smooth user interaction.
- **Local Storage Integration**: Builder information and cart items are stored locally, allowing users to resume their work or keep their selected items across sessions.
- **User Interface**: Users can easily select different components and filter mainboards by CPU brand, with the UI adapting accordingly.
- **Loading Indicator**: A visual cue informs users when data is being fetched, enhancing user experience.
- **Cart Management**: Users can easily manage their cart, with changes reflected in real-time, improving usability.
- **Data Posting**: Posts the cart data to the server to finalize the PC build process and clears local storage upon successful posting.
    
## AdminManagement
### Features
- **Delete Confirmation Popup**
  - When a user clicks the "Delete" button for a product, a confirmation popup appears.
  - The popup allows the user to confirm or cancel the deletion action.
- **Data Deletion**
  - Handles deletion of product data from the server when confirmed by the user.
  - Upon successful deletion, emits an event to notify parent components about the deleted product.
- **Formatting Functions**
  - Provides functions for formatting dates and prices to ensure consistent display across the UI.
- **Dynamic Rendering of Product List**
  - Dynamically renders a list of products in a table format.
  - Displays product details such as name, builder, build date, and price.
- **Router Integration**
  - Utilizes Vue Router to navigate to the detailed information page of a specific product when clicked on its name.
- **Data:**
  - The component's `data` method initializes two data properties: `username` and `password`.
- **Methods:**
  - The `login` method is responsible for handling the login functionality. It fetches the admin data from the server and compares the entered username and password with the stored admin credentials. If the credentials match, the user is authenticated, and their username is stored in the local storage to maintain the session.
    

 ## PC Ranking
 ### Features
 - **Dynamic Data Fetching**: Retrieves PC build data from a server in real-time, ensuring up-to-date rankings.
- **Sorting Options**: Enables users to sort PC builds by either price or build date, providing flexibility in viewing rankings.
- **Component Integration**: Incorporates separate components for displaying top-ranked PCs (`TopRank`) and the full ranking table (`RankTable`), improving modularity and maintainability.
- **Local Storage Integration**: Utilizes local storage for storing state information, enhancing user experience by preserving settings across sessions.
- **User Interface**: Presents PC rankings in an intuitive layout with sorting options, providing users with a clear and interactive view of the rankings.


## Articles
### Features
- **Dynamic Data Fetching**: The component fetches articles from a JSON server based on the route parameter, which specifies the type of articles to fetch (e.g., sports, technology).
- **Responsive Layout**: The layout is designed using CSS grid, ensuring responsiveness across different screen sizes. Articles are arranged in a grid layout with appropriate spacing.
- **Article Display**: Each article is displayed within a card-like container, showing the article image, title, and date. The images are displayed with overlay text showing the article titles, providing a visual preview.
- **Hover Effects**: When hovering over an article image, an overlay with the article title appears, enhancing user interaction and providing additional context.
- **Article Navigation**: Users can navigate to different articles by clicking on their titles, which redirects them to the full article page.

## Summary
- The DAIITSARA ComputerSpecBuilder CRUD Web Application streamlines the process of creating custom computer specifications, offering functionalities for creating, viewing, updating, and deleting specifications. It provides dynamic data fetching, responsive UI, local storage integration, and efficient cart management. Additionally, features like admin management, PC ranking, and articles enhance user experience and functionality, making it a comprehensive tool for PC enthusiasts and builders.

## Video demo:
[Click Here](https://www.veed.io/view/e9f44592-5f88-4bd2-8890-992752efaafd?panel=share)

## Contributor:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>StudentID</th>
      <th>Github</th>
      <th>Contribute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sirakran Kranjanawilasgul</td>
      <td>65130500079</td>
      <td>Chocolaz</td>
      <td>20%</td>
    </tr>
    <tr>
      <td>Sirapob Wuthithein</td>
      <td>65130500085</td>
      <td>fluffyhugger</td>
      <td>20%</td>
    </tr>
    <tr>
      <td>Aismat Boonmalert</td>
      <td>65130500091</td>
      <td>mattiiee</td>
      <td>20%</td>
    </tr>
    <tr>
      <td>Nisarat Aunrueanngam</td>
      <td>65130500107</td>
      <td>Nisarat-A</td>
      <td>20%</td>
    </tr>
    <tr>
      <td>Threepoom Ngamsirisomsakul</td>
      <td>65130500122</td>
      <td>Threepoom</td>
      <td>20%</td>
    </tr>
  </tbody>
</table>

Note that: Each team member contributes with the lead on specific features. Meanwhile, there is a collaborative effort across the team, where everyone actively supports each other by adding valuable contributions to each other features of the project.
