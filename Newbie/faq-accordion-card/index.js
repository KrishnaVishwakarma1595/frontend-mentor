try {
    // get all the details element.
    const details = document.querySelectorAll("details");

    // add onclick event listeners.
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            // closes other details tags.
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });
} catch (error) {
    console.log("Handle error", error);
}