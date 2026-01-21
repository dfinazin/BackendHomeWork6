const changeListener = () => {
  document
    .querySelector(".requests-conteiner")
    .addEventListener("click", (event) => {
      const currentPage =
        document
          .querySelector('[data-type="current"]')
          ?.textContent.split(" ")[1] || "1";
      const lastPage =
        document.querySelector('[data-type="last"]')?.dataset?.last || "1";
      const searchString = document.querySelector(".search-input").value || "";
      console.log(
        "cur:",
        Number(currentPage),
        "last",
        lastPage,
        "type",
        event.target.dataset.type,
      );
      switch (event.target.dataset.type) {
        case "first":
          getNotes(searchString, 1);
          break;
        case "previous":
          getNotes(searchString, Number(currentPage) - 1);
          break;
        case "last":
          getNotes(searchString, Number(lastPage));
          break;
        case "next":
          getNotes(searchString, Number(currentPage) + 1);
          break;
        case "search":
          getNotes(searchString, 1);
          break;
      }
    });
};

const getNotes = async (search, page) => {
  try {
    const newPage = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: search,
        page: page,
      }),
    });
    if (newPage.ok) {
      document.documentElement.innerHTML = await newPage.text();
      changeListener();
    }
  } catch (error) {
    console.log(error);
  }
};

changeListener();
