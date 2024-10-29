document.addEventListener("DOMContentLoaded", async function () {
  const data = await fetch("course.json").then((response) => response.json());
  const courseContainer = document.querySelector(".course-container");

  // 动态创建课程块
  data.forEach((course) => {
    const semester = `Semester ${course.term}`;
    const courseSection = document.createElement("div");
    courseSection.classList.add("course-section");
    courseSection.setAttribute("data-semester", semester);
    courseSection.innerHTML = `
            <div class="course-header">
              <div class="course-info">
                <img class="course-image" src="${course.image}" alt="Course Image" />
                <h1 class="course-title">${course.code} ${course.name}</h1>
              </div>
              <button class="toggle-button">Show details</button>
            </div>
            <div class="expandable-content">
              <p><strong>Reference Books:</strong><br>${course.references.join("<br>")}</p>
              <p><strong>Further Readings:</strong><br>${course.readings.join("<br>")}</p>
              <p><strong>Tools Needed:</strong><br>${course.tools.join("<br>")}</p>
            </div>
          `;
    courseContainer.appendChild(courseSection);
  });

  // 展开和折叠功能
  document.querySelectorAll(".toggle-button").forEach((button) => {
    button.addEventListener("click", function () {
      const expandableContent = this.parentElement.nextElementSibling;
      expandableContent.classList.toggle("show");

      if (expandableContent.classList.contains("show")) {
        expandableContent.style.maxHeight = expandableContent.scrollHeight + "px";
        this.textContent = "Hide details";
      } else {
        expandableContent.style.maxHeight = null;
        this.textContent = "Show details";
      }
    });
  });

  // 分页功能
  const paginationLinks = document.querySelectorAll(".pagination a");
  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      paginationLinks.forEach((el) => el.classList.remove("active"));
      this.classList.add("active");

      const selectedSemester = this.textContent.trim();
      document.querySelectorAll(".course-section").forEach((section) => {
        section.style.display =
          section.getAttribute("data-semester") === selectedSemester
            ? "block"
            : "none";
      });
    });
  });

  // 默认显示第一个学期
  document.querySelector(".pagination a.active").click();
});
