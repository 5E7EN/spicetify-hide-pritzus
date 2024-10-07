function removePlaylists() {
    const elementsForRemoval = [];

    //* Israel Region
    // Stay Tuned
    elementsForRemoval.push(document.querySelectorAll('[aria-label="תשארו מעודכנים"]'));

    //* America Region
    // Episodes for you
    // elementsForRemoval.push(document.querySelectorAll('[aria-label="Episodes for you"]'));

    // Popular * (e.g. Popular Albums, Popular Playlists)
    // elementsForRemoval.push(document.querySelectorAll('[aria-label^="Popular"]'));

    // Featured * (e.g. Featured Charts)
    // elementsForRemoval.push(document.querySelectorAll('[aria-label^="Featured"]'));

    // Spotify * (e.g. Spotify Playlists)
    // elementsForRemoval.push(document.querySelectorAll('[aria-label^="Spotify"]'));

    // Remove elements
    for (const element of elementsForRemoval) {
        element.forEach((item) => item.remove());
    }
}

function replaceImagesWithGrey() {
    // Hide all <img> tags
    const allImages = document.querySelectorAll('img');

    allImages.forEach((img) => {
        // Replace the image source with the grey image
        img.src = '';
        // Clear any srcset attributes
        img.srcset = '';
        // Ensure the greyed image fits in nicely
        img.style.objectFit = 'cover';
    });

    // Hide CSS background images
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
        const bgImage = window.getComputedStyle(element).backgroundImage;

        // Check if the element has a background image
        if (bgImage !== 'none') {
            // Check if the image is a URL
            if (bgImage.includes('url')) {
                // Remove only the url() part of the string
                const url = bgImage.replace(/url\(['"]?(.*?)['"]?\)/, 'url()');

                // Replace the background image with the grey image
                element.style.backgroundImage = url;
            }
        }
    });
}

(async function extension() {
    // Waits for platform to load before running
    const UserAPI = Spicetify?.Platform?.UserAPI;
    if (!UserAPI) {
        setTimeout(extension, 500);
        return;
    }

    // const user = await Spicetify.Platform.UserAPI.getUser();
    Spicetify.showNotification('Shmiras Einayim ACTIVATED!');

    const rpId = setInterval(removePlaylists, 2000);
    const riwgId = setInterval(replaceImagesWithGrey, 100);

    console.log(`SE-RP: ${rpId}`);
    console.log(`SE-RIWG: ${riwgId}`);
})();
