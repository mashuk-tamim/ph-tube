const videoData = [
    { title: 'Video 1', views: '1000K', release_date: '2023-01-01' },
    { title: 'Video 2', views: '500K', release_date: '2023-02-15' },
    { title: 'Video 3', views: '1500K', release_date: '2023-03-20' },
    // ... add more video objects
  ];
  
  // Define a function to convert views in "K" format to numeric values
//   function convertViews(viewsStr) {
//     // const numStr = viewsStr.replace('K', '');
//     const numStr = parseFloat(viewsStr);
//     // return parseFloat(numStr) * 1000; // Convert "K" to actual thousands
//     return parseFloat(numStr);
//   }
  
  // Sort the array by views in descending order after converting
  videoData.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
  
  // Display the sorted array
  console.log(videoData);
  