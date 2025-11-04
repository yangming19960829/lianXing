$(window).on("load", function () {
  $(".photo-block-wrp").each(function () {
    const $wrapper = $(this);
    const $bigImageWrapper = $wrapper.find(".big-image-pp");
    const $bigImages = $wrapper.find(".big-image-item");
    const $descImages = $wrapper.find(".cms-image");
    const $mobImages = $wrapper.find(".cms-mob-image");
    const $closeBtn = $wrapper.find(".close-btn");
    const $backdrop = $wrapper.find(".pp-backdrop"); // Backdrop element

    // Set attributes
    $bigImages.each(function (index) {
      $(this).attr("image", index + 1);
    });
    $descImages.each(function (index) {
      $(this).attr("open-image", index + 1);
    });
    $mobImages.each(function (index) {
      $(this).attr("open-image", index + 1);
    });

    // Add click event listener to elements with open-image
    $descImages.add($mobImages).on("click", function () {
      const targetImage = $(this).attr("open-image");

      // Show the bigImageWrapper with animation
      $bigImageWrapper
        .css({
          display: "block",
          opacity: 0,
        })
        .animate({ opacity: 1 }, 300); // Fade in with animation

      // Hide all bigImages
      $bigImages.hide();

      // Show the corresponding bigImage
      const $matchingImage = $wrapper.find(
        `.big-image-item[image="${targetImage}"]`
      );
      if ($matchingImage.length) {
        $matchingImage.show();
      }

      // Disable body scrolling
      $("body").css("overflow", "hidden");
    });

    // Close button functionality
    $closeBtn.on("click", function () {
      $bigImageWrapper.animate({ opacity: 0 }, 300, function () {
        $(this).css("display", "none"); // Hide after fade-out
      });

      // Enable body scrolling
      $("body").css("overflow", "auto");
    });
  });
});
