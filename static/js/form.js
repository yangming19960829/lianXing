$(window).on("load", function () {
  $("select").each(function () {
    $(this).find("option:first").attr("disabled", "disabled");
  });

  $("[data-form]").removeClass("hide");
  $("[data-form]").addClass("hide");
  $("[data-form=screen-1]").removeClass("hide");

  const gotoFirstWindow = () => {
    $("[user-tab=2]").removeClass("active");
    $("[user-tab=1]").addClass("active");
    $("[data-form]").addClass("hide");
    $("[data-form=screen-1]").removeClass("hide");

    $(".tab-pane-wrp").animate(
      {
        scrollLeft: 0,
      },
      500
    );
    $(".form-scroll-anchor")[0].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const gotoSecondWindow = () => {
    $("[user-tab=1]").removeClass("active");
    $("[user-tab=2]").removeClass("disabled").addClass("active");
    $("[data-form]").addClass("hide");
    $("[data-form=screen-2]").removeClass("hide");

    transferData();

    $(".tab-pane-wrp").animate(
      {
        scrollLeft: $(".tab-pane-wrp")[0].scrollWidth,
      },
      500
    );
    $(".form-scroll-anchor")[0].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  $(document).on(
    "change",
    ".consult-form input[type='checkbox'], .consult-form input[type='radio']",
    function () {
      const wantToChecked =
        $(".consult-form input[checkbox-group='i-want-to']:checked").length > 0;
      const locationChecked =
        $(".consult-form input[checkbox-group='location']:checked").length > 0;
      const budgetChecked =
        $(".consult-form input[name='Monthly-budget']:checked").length > 0;

      if (wantToChecked && locationChecked && budgetChecked) {
        $("[user-data=form-next]").removeClass("disabled");
        $("[user-tab=2]").removeClass("disabled");
      } else {
        $("[user-data=form-next]").addClass("disabled");
        $("[user-tab=2]").addClass("disabled");
      }
    }
  );

  $("[user-tab=1]").on("click", function () {
    gotoFirstWindow();
  });

  $("[user-tab=2]").on("click", function () {
    gotoSecondWindow();
  });

  $("[user-data=form-next]").on("click", function () {
    gotoSecondWindow();
  });

  function transferData() {
    const wantToValues = $(
      ".consult-form input[checkbox-group='i-want-to']:checked"
    )
      .map(function () {
        return $(this).attr("data-name");
      })
      .get()
      .join(" | ");

    $("[input-transfer=i-want-to]").val(wantToValues);

    const locationValues = $(
      ".consult-form input[checkbox-group='location']:checked"
    )
      .map(function () {
        return $(this).attr("data-name");
      })
      .get()
      .join(" | ");

    $("[input-transfer=location]").val(locationValues);

    // const budgetValue = $(".consult-form input[name='Monthly-budget']:checked")
    //   .map(function () {
    //     return $(this).attr("data-name");
    //   })
    //   .get()
    //   .join(" | ");

    // $("[input-transfer=monthly-budget]").val(budgetValue);
    const budgetValue = $(".consult-form input[name='Monthly-budget']:checked")
      .map(function () {
        const input = $(this);
        const spanText = input.siblings("span").text().trim(); // Get the text of the span
        return `${spanText}`; // Combine span text with data-name
      })
      .get()
      .join(" | ");

    $("[input-transfer=monthly-budget]").val(budgetValue);
  }

  $(".input-wrp input[required]").on("input", function () {
    const wrapper = $(this).closest(".input-wrp"); // Find the closest .input-wrp
    wrapper.removeClass("error"); // Remove the error class
    wrapper.find(".error-text").text(""); // Clear the error message (if any)
  });

  $(".input-wrp select[required]").on("click", function () {
    const wrapper = $(this).closest(".input-wrp"); // Find the closest .input-wrp
    wrapper.removeClass("error"); // Remove the error class
    wrapper.find(".error-text").text(""); // Clear the error message (if any)
  });

  function validateRequiredInputs(form) {
    let isValid = true; // Flag to track if validation passes

    // Loop through each wrapper with required inputs inside the specified form
    form.find(".input-wrp:not([data-input])").each(function () {
      const wrapper = $(this); // Current wrapper
      const input = wrapper.find("input[required]"); // Find the input with the "required" attribute inside the wrapper
      const errorText = wrapper.find(".error-text"); // Find the error text element inside the wrapper

      // Check if the input is empty
      if (input.val().trim() === "") {
        wrapper.addClass("error"); // Add error class to the wrapper
        errorText.text("Enter this field"); // Show the error message
        isValid = false; // Set invalid flag if any required input is empty
      } else {
        // If input is not empty, remove the error class and clear the error text
        wrapper.removeClass("error");
        errorText.text("");
      }
    });

    return isValid; // Return true if all required inputs are valid, false if any are empty
  }

  function validateEmailInput(form) {
    let isValid = true; // Flag to track if validation passes

    const wrapper = form.find('[data-input="email"]'); // Find the closest wrapper in the specified form
    const input = wrapper.find("input"); // Get the input within the wrapper
    const errorText = wrapper.find(".error-text"); // Find the error text element

    // Check if the input value is empty or invalid
    if (input.val().trim() === "") {
      wrapper.addClass("error"); // Add error class to the wrapper
      errorText.text("Enter this field"); // Show error message for empty input
      isValid = false;
    } else if (!validateEmailFormat(input.val().trim())) {
      wrapper.addClass("error"); // Add error class to the wrapper
      errorText.text("Enter a valid email"); // Show error message for invalid email format
      isValid = false;
    } else {
      wrapper.removeClass("error"); // Remove error class if input is valid
      errorText.text(""); // Clear the error message
    }

    return isValid; // Return true if the email input is valid, false otherwise
  }

  function validatePhoneInput(form) {
    let isValid = true;
    const wrapper = form.find('[data-input="phone"]');
    const input = wrapper.find("input");
    const errorText = wrapper.find(".error-text");

    if (input.val().trim() === "") {
      wrapper.addClass("error");
      errorText.text("Enter this field");
      isValid = false;
    } else if (!validatePhoneFormat(input.val().trim())) {
      wrapper.addClass("error");
      errorText.text("Enter a valid phone number");
      isValid = false;
    } else {
      wrapper.removeClass("error");
      errorText.text("");
    }

    return isValid;
  }

  function validateLinkInput(form) {
    let isValid = true; // Flag to track if validation passes

    const wrapper = form.find('[data-input="link"]'); // Find the closest wrapper in the specified form
    const input = wrapper.find("input"); // Get the input within the wrapper
    const errorText = wrapper.find(".error-text"); // Find the error text element

    // Check if the input value is empty or invalid
    if (input.val().trim() === "") {
      wrapper.addClass("error"); // Add error class to the wrapper
      errorText.text("Enter this field"); // Show error message for empty input
      isValid = false;
    } else if (!validateLinkFormat(input.val().trim())) {
      wrapper.addClass("error"); // Add error class to the wrapper
      errorText.text("Enter a valid link"); // Show error message for invalid link format
      isValid = false;
    } else {
      wrapper.removeClass("error"); // Remove error class if input is valid
      errorText.text(""); // Clear the error message
    }

    return isValid; // Return true if the link input is valid, false otherwise
  }

  function validateRequiredSelects(form) {
    let isValid = true; // Flag to track if validation passes

    // Validate required select fields
    form.find("select[required]").each(function () {
      const select = $(this); // Current select element
      const wrapper = select.closest(".input-wrp"); // Find the wrapper around the select (if needed)
      const errorText = wrapper.find(".error-text"); // Find the error text element inside the wrapper

      // Check if the select has no value (e.g., default empty value)
      if (select.val() === "" || select.val() === null) {
        wrapper.addClass("error"); // Add error class to the wrapper
        errorText.text("Select an option"); // Show the error message
        isValid = false; // Set invalid flag
      } else {
        // If a valid option is selected, remove the error class and clear the error text
        wrapper.removeClass("error");
        errorText.text("");
      }
    });

    return isValid; // Return true if all selects are valid, false otherwise
  }

  // Helper function to validate the email format
  function validateEmailFormat(email) {
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); // Returns true if the email matches the pattern
  }

  function validatePhoneFormat(phone) {
    const phonePattern = /^[\+\-\(\)\d\s]*\d[\+\-\(\)\d\s]{5,}$/;
    return phonePattern.test(phone);
  }

  function validateLinkFormat(link) {
    const linkPattern =
      /^(https?:\/\/|www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([\/?#][^\s]*)?$/i;
    return linkPattern.test(link); // Returns true if the link matches the pattern
  }

  $("[user-data-validate=consult]").on("click", function () {
    const form = $(this).closest("form"); // Get the parent form of the clicked button
    const fieldFilled = validateRequiredInputs(form);
    const validEmail = validateEmailInput(form);
    const validPhone = validatePhoneInput(form);
    const validLink = validateLinkInput(form);
    const honeyPot = form.find('input[name="_name"]').val().trim() === "";

    if (fieldFilled && validEmail && validPhone && validLink && honeyPot) {
      form.find("[user-data-submit=consult]").click(); // Trigger submit for the specific form
      $(".tab-pane-wrp").hide(); // Hide tab-pane only in this form
    }
  });

  $("[user-data-validate=get-pdf]").on("click", function () {
    const form = $(this).closest("form"); // Get the parent form of the clicked button
    const fieldFilled = validateRequiredInputs(form);
    const validEmail = validateEmailInput(form);
    const validPhone = validatePhoneInput(form);
    const validLink = validateLinkInput(form);
    const validSelect = validateRequiredSelects(form);
    const honeyPot = form.find('input[name="_name"]').val().trim() === "";

    if (
      fieldFilled &&
      validEmail &&
      validPhone &&
      validLink &&
      honeyPot &&
      validSelect
    ) {
      form.find("[user-data-submit=get-pdf]").click(); // Trigger submit for the specific form
    }
  });
});
