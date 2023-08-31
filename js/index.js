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
    // console.log(data.data);

    let count = 1;
    const videoContainer = document.getElementById('videos-container');
    videoContainer.innerHTML = '';
    data.data?.forEach((video) => {
        console.log(video);
        let seconds = video.others.posted_date;
        hours = parseInt(seconds/3600);
        // console.log(hours);
        let minutes = seconds%3600;
        minutes = parseInt(minutes/60);
        // console.log(minutes);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex flex-col">
        <div class="relative ">
          <img class="w-full h-32 lg:h-56 mb-5 rounded-lg" src="${video.thumbnail}" alt="">
          <p class="absolute bottom-8 right-3 bg-color-btn text-xs text-white px-2 py-1 rounded-md">${hours}hrs ${minutes}mins ago</p>
        </div>
        <div class="flex gap-3">
          <!-- profile thumbnail -->
          <div>
            <img class="w-16 rounded-full" src="${video.authors[0].profile_picture}" alt="">
          </div>
          <div>
            <h3 class="text-base text-color-primary font-bold">${video.title}
            </h3>
            <div class="flex gap-2 items-center my-1">
              <h4 class="text-sm text-color-name">${video.authors[0].profile_name}</h4>
              <img id="verified-${count}" class="w-5 h-5 hidden" src="images/verify.png" alt="">
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
        console.log(`verified-${count}`)
        count++;
    })
}

handleCategory();
handleLoadVideos(1000)