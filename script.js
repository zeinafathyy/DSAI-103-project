document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  const items = document.querySelectorAll("#list li");
  const list = document.getElementById("list");

  // 🔍 FILTER + SHOW/HIDE
  search.addEventListener("keyup", function () {
    const value = search.value.toLowerCase();
    let hasMatch = false;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();

      if (text.includes(value) && value !== "") {
        item.style.display = "";
        hasMatch = true;
      } else {
        item.style.display = "none";
      }
    });

    list.style.display = hasMatch ? "block" : "none";
  });

  // ⏎ ENTER → GO TO BEST MATCH
  search.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const value = search.value.toLowerCase();

      let exact = null;
      let partial = null;

      items.forEach(item => {
        const text = item.textContent.toLowerCase();

        if (text === value) {
          exact = item;
        } else if (text.includes(value) && !partial) {
          partial = item;
        }
      });

      const target = exact || partial;

      if (target) {
        const link = target.querySelector("a");
        if (link) {
          window.location.href = link.href;
        }
      }
    }
  });

  // 🖱️ CLICK OUTSIDE → HIDE LIST
  document.addEventListener("click", function (e) {
    if (!search.contains(e.target) && !list.contains(e.target)) {
      list.style.display = "none";
    }
  });
});

