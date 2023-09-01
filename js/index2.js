const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    console.log(data.data);

    const categoryContainer = document.getElementById('category-container');

    data.data.forEach(category => {
        console.log(category.category);
        const div = document.createElement('div');
        div.innerHTML = `
          <button onclick="handleLoadVideos('${category.category_id}')" class="text-sm md:text-base lg:text-xl font-medium bg-color-btn-bg hover:bg-color-primary-accent hover:text-white rounded-lg px-6 py-2 mx-3 border-2">${category.category}</button>
          `
        categoryContainer.appendChild(div);
    });
}

const handleLoadVideos = async (category_id) => {
    console.log(category_id);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    console.log(data.data);

    let originalVideos = data.data; // Store the original videos
    let sortedVideos = originalVideos;


    let count = 0;
    const videoContainer = document.getElementById('videos-container');
    videoContainer.innerHTML = '';
    if (data.data?.length === 0) {
        console.log('zero');
        videoContainer.classList.remove('lg:grid-cols-4', 'grid-cols-2', 'md:grid-cols-3');
        videoContainer.innerHTML = `
      <div class="flex flex-col items-center w-5/12 mx-auto mt-10">
      <img class="w-32 rounded-lg" src="images/fi_5301987.png" alt="">
      <h2 class="text-4xl text-color-primary font-bold text-center">Oops!! Sorry, There is no content here</h2>
      </div>
      `;
    }
    // let viewsArray = [];
    const showVideos = (videosObject = originalVideos) => {
        videosObject?.forEach((video) => {
            console.log(video.others.views);
            // console.log(viewsArray);
            let seconds = video.others.posted_date;
            hours = parseInt(seconds / 3600);
            // console.log(hours);
            let minutes = seconds % 3600;
            minutes = parseInt(minutes / 60);
            // console.log(minutes);

            videoContainer.classList.add('lg:grid-cols-4', 'grid-cols-2', 'md:grid-cols-3');
            const div = document.createElement('div');
            div.innerHTML = `
              <div class="flex flex-col">
              <div class="relative ">
                <img class="w-full h-32 lg:h-48 mb-5 rounded-lg" src="${video.thumbnail}" alt="">
                <p id="postedDate-${count}" class="hidden absolute bottom-8 right-3 bg-color-btn text-xs text-white px-2 py-1 rounded-md">${hours}hrs ${minutes}mins ago</p>
              </div>
              <div class="flex gap-3">
                <!-- profile thumbnail -->
                <div>
                  <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                </div>
                <div>
                  <h3 class="text-base text-color-primary font-bold">${video.title}
                  </h3>
                  <div class="flex gap-2 items-center my-1">
                    <h4 class="text-sm text-color-name">${video.authors[0].profile_name}</h4>
                    <img id="verified-${count}" class="w-5 h-5 hidden" src="images/fi_10629607.png" alt="">
                  </div>
                  <h4 class="text-sm text-color-name">${video.others.views} views</h4>
                </div>
              </div>
            </div>
              `
            videoContainer.appendChild(div);

            const verified = document.getElementById(`verified-${count}`);
            if (video.authors[0].verified) {
                verified.classList.remove('hidden');
            }
            const postedDate = document.getElementById(`postedDate-${count}`);
            if (video.others.posted_date != '') {
                postedDate.classList.remove('hidden');
            }
            // console.log(`verified-${count}`);
            count++;
        })
    }
    showVideos();
    document.getElementById('sort-by-view').addEventListener('click', function () {
        console.log('Clicked');
        // console.log(parseFloat(sortedVideos[1].others.views));
        sortedVideos.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
        console.log('sorted views:', sortedVideos);

        // Clear the video container and render the sorted videos
        videoContainer.innerHTML = '';
        showVideos(sortedVideos);
    });
}

handleCategory();
handleLoadVideos(1000);