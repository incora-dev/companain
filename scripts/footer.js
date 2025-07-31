function footerFormHandler() {
  const connectInput = document.querySelector(".footer_connect_input");
  const connectButton = document.querySelector(".footer_connect_button");

  const pagesPath =
    document.currentScript?.src.split("scripts")[0] +
    "pages/ContactUs/ContactUs.html";

  const handleSubmit = () => {
    console.log("click");
    const value = connectInput.value;
    console.log(value);

    localStorage.setItem("CONTACT_EMAIL", value);
    console.log(value);
    window.location.replace(pagesPath);

    connectInput.value = "";
  };

  console.log({
    connectButton,
  });

  connectButton.addEventListener("click", handleSubmit);
  connectInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });
}

footerFormHandler();
